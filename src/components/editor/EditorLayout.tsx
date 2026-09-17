"use client";

import React, { useEffect } from "react";
import * as fabric from "fabric";
import { useEditorStore } from "@/lib/store/editorStore";
import { useRouter } from "next/navigation";
import styles from "./EditorLayout.module.css";
import { Download, Undo, Redo, LayoutPanelLeft, Loader2 } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { EditorCanvas } from "@/components/canvas/EditorCanvas";
import { defaultOCRProvider } from "@/lib/services/ocr/tesseractProvider";
import { PropertiesPanel } from "@/components/editor/PropertiesPanel";
import { removeImageBackground } from "@/lib/services/background/bgRemoval";
import { AIEditModal } from "@/components/editor/AIEditModal";

export function EditorLayout() {
  const router = useRouter();
  const { 
    originalImage, setOriginalImage, 
    setDetectedTexts, isDetecting, setIsDetecting, 
    isRemovingBg, setIsRemovingBg,
    activeTool, setActiveTool,
    canvas,
    undo, redo, history, historyIndex,
    panelsVisible, setPanelsVisible
  } = useEditorStore();

  const [isAIModalOpen, setIsAIModalOpen] = React.useState(false);
  const [aiOriginalText, setAiOriginalText] = React.useState("");

  const handleOCR = async () => {
    if (!originalImage) return;
    try {
      setIsDetecting(true);
      const texts = await defaultOCRProvider.detectText(originalImage);
      if (texts.length === 0) {
        alert("No text could be detected in this image. Make sure the text is clear and readable!");
      }
      setDetectedTexts(texts);
    } catch (err) {
      console.error(err);
      alert("OCR failed to detect text.");
    } finally {
      setIsDetecting(false);
    }
  };

  const handleAddText = () => {
    if (!canvas) return;
    setActiveTool('text');
    const textLayer = new fabric.IText("New Text", {
      left: (canvas.getWidth() / 2) - 50,
      top: (canvas.getHeight() / 2) - 20,
      fontFamily: 'Inter',
      fontSize: 40,
      fill: '#0f172a',
      id: `text-layer-${Date.now()}`
    } as any);
    canvas.add(textLayer);
    canvas.setActiveObject(textLayer);
    canvas.renderAll();
  };

  const handleRemoveText = () => {
    const { selectedObjectId, detectedTexts } = useEditorStore.getState();
    if (!canvas) return;
    
    if (selectedObjectId && selectedObjectId.startsWith("bbox-")) {
      const textId = selectedObjectId.replace("bbox-", "");
      const detectedText = detectedTexts.find((t) => t.id === textId);
      const bboxObj = canvas.getObjects().find((o: any) => o.id === selectedObjectId);
      
      if (bboxObj && detectedText) {
        const inpaintRect = new fabric.Rect({
          left: bboxObj.left,
          top: bboxObj.top,
          width: bboxObj.width,
          height: bboxObj.height,
          fill: '#f0f0f0',
          selectable: false,
          evented: false,
          id: `inpaint-${detectedText.id}`
        } as any);
        
        canvas.add(inpaintRect);
        canvas.remove(bboxObj);
        canvas.discardActiveObject();
        canvas.renderAll();
      }
    } else {
      const activeObj = canvas.getActiveObject() as any;
      if (activeObj && activeObj.id !== 'background-image') {
        canvas.remove(activeObj);
        canvas.discardActiveObject();
        canvas.renderAll();
      } else {
        alert("Please select a text box to remove.");
      }
    }
  };

  const handleReplaceText = () => {
    setActiveTool('text');
    const { selectedObjectId } = useEditorStore.getState();
    if (!selectedObjectId || !selectedObjectId.startsWith("bbox-")) {
      alert("Please select a detected text box on the image first, then use the Properties Panel to replace it.");
    } else {
      alert("Use the Properties Panel on the right to enter your replacement text.");
    }
  };

  const handleAIEdit = () => {
    if (!canvas) return;
    const activeObj = canvas.getActiveObject() as any;
    
    // Check if the selected object is a Fabric.js IText or Text object
    if (activeObj && (activeObj.type === 'i-text' || activeObj.type === 'text' || activeObj.type === 'textbox')) {
      setAiOriginalText(activeObj.text || "");
      setIsAIModalOpen(true);
    } else {
      alert("Please select a text layer on the canvas first.");
    }
  };

  const handleAIApply = (newText: string) => {
    if (!canvas) return;
    const activeObj = canvas.getActiveObject() as any;
    if (activeObj && (activeObj.type === 'i-text' || activeObj.type === 'text' || activeObj.type === 'textbox')) {
      activeObj.set({ text: newText });
      canvas.renderAll();
      useEditorStore.getState().saveHistoryState();
    }
  };

  const handleRemoveBackground = async () => {
    if (!originalImage) return;
    try {
      setIsRemovingBg(true);
      const transparentUrl = await removeImageBackground(originalImage);
      // Update original image with the new transparent one
      setOriginalImage(transparentUrl);
      setActiveTool('background');
      
      // Give the canvas a moment to asynchronously load and render the new image URL
      setTimeout(() => {
        useEditorStore.getState().downloadImage();
      }, 800);
    } catch (err) {
      console.error(err);
      alert("Failed to remove background.");
    } finally {
      setIsRemovingBg(false);
    }
  };

  const handleAddBackground = () => {
    if (!canvas) return;
    canvas.discardActiveObject();
    canvas.renderAll();
    setActiveTool('background');
  };

  const handleDownload = () => {
    useEditorStore.getState().downloadImage();
  };

  // The parent page is now responsible for conditionally rendering EditorLayout vs the Landing State
  // so we don't need to force a redirect to "/" here.

  if (!originalImage) {
    return <div className={styles.loading}>Loading editor...</div>;
  }

  return (
    <div className={styles.editorContainer}>
      {/* Top Bar */}
      <header className={styles.topbar}>
        <div className={styles.logo} onClick={() => router.push("/")}>
          <span>photext.ai</span>
        </div>
        
        <div className={styles.topActions}>
          <button 
            className={styles.iconBtn} 
            title="Undo" 
            onClick={undo}
            disabled={historyIndex <= 0}
            style={{ opacity: historyIndex <= 0 ? 0.5 : 1, cursor: historyIndex <= 0 ? 'not-allowed' : 'pointer' }}
          >
            <Undo size={20} />
          </button>
          <button 
            className={styles.iconBtn} 
            title="Redo" 
            onClick={redo}
            disabled={historyIndex >= history.length - 1 || history.length === 0}
            style={{ opacity: (historyIndex >= history.length - 1 || history.length === 0) ? 0.5 : 1, cursor: (historyIndex >= history.length - 1 || history.length === 0) ? 'not-allowed' : 'pointer' }}
          >
            <Redo size={20} />
          </button>
          <div className={styles.divider}></div>
          <button 
            className={styles.iconBtn} 
            title="Toggle Panels"
            onClick={() => setPanelsVisible(!panelsVisible)}
            style={{ backgroundColor: panelsVisible ? 'var(--bg-tertiary)' : 'transparent' }}
          >
            <LayoutPanelLeft size={20} />
          </button>
        </div>
        
        <div className={styles.topActions} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <ThemeToggle />
          <button className={styles.downloadBtn} onClick={handleDownload}>
            <Download size={18} />
            <span>Download</span>
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className={styles.workspace}>
        
        {/* Left Panel - Tools */}
        {panelsVisible && (
          <aside className={styles.leftPanel}>
            <h3 className={styles.panelTitle}>Tools</h3>
          <div className={styles.toolList}>
            <button className={`${styles.toolBtn} ${styles.active}`}>Select</button>
            <button className={styles.toolBtn} onClick={handleReplaceText}>Replace Text</button>
            <button className={styles.toolBtn} onClick={handleRemoveText}>Remove Text</button>
            <button className={styles.toolBtn} onClick={handleAddText}>Add Text</button>
            <button className={styles.toolBtn} onClick={handleAIEdit}>AI Edit</button>
            <button 
              className={styles.toolBtn} 
              onClick={handleOCR}
              disabled={isDetecting}
            >
              {isDetecting ? <><Loader2 size={16} className={styles.spinner} /> Detecting...</> : "Detect Text with OCR"}
            </button>
          </div>
          
          <h3 className={styles.panelTitle} style={{ marginTop: '1rem' }}>Background</h3>
          <div className={styles.toolList}>
            <button 
              className={styles.toolBtn} 
              onClick={handleRemoveBackground}
              disabled={isRemovingBg}
            >
              {isRemovingBg ? <><Loader2 size={16} className={styles.spinner} /> Processing...</> : "Remove BG"}
            </button>
            <button className={styles.toolBtn} onClick={handleAddBackground}>Change BG</button>
          </div>
        </aside>
        )}

        {/* Center - Canvas */}
        <main className={styles.canvasArea}>
          <div className={styles.canvasWrapper}>
            <EditorCanvas />
          </div>
          
          <div className={styles.zoomControls}>
            <button>-</button>
            <span>100%</span>
            <button>+</button>
          </div>
        </main>

        {/* Right Panel - Properties */}
        {panelsVisible && (
          <aside className={styles.rightPanel}>
            <h3 className={styles.panelTitle}>Properties</h3>
            <PropertiesPanel />
          </aside>
        )}
        
        <AIEditModal 
          isOpen={isAIModalOpen}
          onClose={() => setIsAIModalOpen(false)}
          originalText={aiOriginalText}
          onApply={handleAIApply}
        />
      </div>
    </div>
  );
}
