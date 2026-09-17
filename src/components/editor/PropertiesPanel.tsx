"use client";

import { useEditorStore } from "@/lib/store/editorStore";
import styles from "./EditorLayout.module.css";
import { useState, useEffect } from "react";
import * as fabric from "fabric";
import { BackgroundPanel } from "./BackgroundPanel";

export function PropertiesPanel() {
  const { selectedObjectId, detectedTexts, canvas, activeTool } = useEditorStore();
  const [replacementText, setReplacementText] = useState("");
  
  const [fontFamily, setFontFamily] = useState("Inter");
  const [fillColor, setFillColor] = useState("#0f172a");
  const [fontSize, setFontSize] = useState(24);

  // Check if it's an OCR bounding box
  const isBBox = selectedObjectId?.startsWith("bbox-");
  const textId = selectedObjectId?.replace("bbox-", "");
  const detectedText = detectedTexts.find((t) => t.id === textId);
  const isTextLayer = selectedObjectId?.startsWith("text-layer-");

  useEffect(() => {
    if (isTextLayer && canvas) {
      const activeObj = canvas.getActiveObject() as fabric.IText;
      if (activeObj) {
        setFontFamily(activeObj.fontFamily || "Inter");
        setFillColor(activeObj.fill as string || "#0f172a");
        setFontSize(activeObj.fontSize || 24);
      }
    }
  }, [selectedObjectId, isTextLayer, canvas]);

  const handleTextPropChange = (prop: string, value: any) => {
    if (!canvas) return;
    const activeObj = canvas.getActiveObject() as fabric.IText;
    if (activeObj) {
      activeObj.set(prop, value);
      canvas.renderAll();
      
      if (prop === 'fontFamily') setFontFamily(value);
      if (prop === 'fill') setFillColor(value);
      if (prop === 'fontSize') setFontSize(Number(value));
    }
  };

  const handleApplyReplacement = () => {
    if (!canvas || !detectedText) return;

    const bboxObj = canvas.getObjects().find((o: any) => o.id === selectedObjectId);
    if (!bboxObj) return;

    const finalString = replacementText || detectedText.text;

    // 1. Create Mock Background Restoration (a blurred/solid rect over the original text)
    const inpaintRect = new fabric.Rect({
      left: bboxObj.left,
      top: bboxObj.top,
      width: bboxObj.width,
      height: bboxObj.height,
      fill: '#f0f0f0', // Mock inpaint color (ideally average surrounding pixels)
      selectable: false,
      evented: false,
      id: `inpaint-${detectedText.id}`
    } as any);

    // 2. Create the editable text layer
    const textLayer = new fabric.IText(finalString, {
      left: bboxObj.left,
      top: bboxObj.top,
      fontFamily: 'Inter', // Default PRD font
      fontSize: bboxObj.height! * 0.8,
      fill: '#0f172a', // Default dark text
      id: `text-layer-${detectedText.id}`
    } as any);

    // Add to canvas
    canvas.add(inpaintRect);
    canvas.add(textLayer);
    
    // Remove the OCR bounding box
    canvas.remove(bboxObj);
    
    // Set active
    canvas.setActiveObject(textLayer);
    canvas.renderAll();
  };

  if (!selectedObjectId && activeTool !== 'background') {
    return <p className={styles.emptyState}>Select an object or tool to edit properties</p>;
  }

  return (
    <div className={styles.propertiesContent} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
      
      {activeTool === 'background' && (
        <BackgroundPanel />
      )}
      
      {isBBox && detectedText && (
        <div className={styles.propertyGroup}>
          <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Detected Text</label>
          <div style={{ padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: '4px', fontSize: '0.875rem', border: '1px solid var(--border-color)', marginTop: '0.5rem' }}>
            {detectedText.text}
          </div>
          
          <div style={{ marginTop: '1.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Replacement Text</label>
            <input 
              type="text" 
              value={replacementText}
              onChange={(e) => setReplacementText(e.target.value)}
              placeholder={detectedText.text}
              style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
            />
          </div>

          <button 
            style={{ width: '100%', padding: '0.75rem', marginTop: '1rem', background: 'var(--accent-primary)', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 600, cursor: 'pointer' }}
            onClick={handleApplyReplacement}
          >
            Apply Replacement
          </button>
        </div>
      )}

      {isTextLayer && (
        <div className={styles.propertyGroup}>
          <h4 style={{ fontSize: '0.875rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Text Properties</h4>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Double-click the text on canvas to edit it directly.</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Font Family</label>
              <select 
                value={fontFamily}
                onChange={(e) => handleTextPropChange('fontFamily', e.target.value)}
                style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
              >
                <option value="Inter">Inter</option>
                <option value="Roboto">Roboto</option>
                <option value="Outfit">Outfit</option>
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Courier New">Courier New</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Font Size</label>
              <input 
                type="number" 
                value={fontSize}
                onChange={(e) => handleTextPropChange('fontSize', e.target.value)}
                style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Color</label>
              <input 
                type="color" 
                value={fillColor}
                onChange={(e) => handleTextPropChange('fill', e.target.value)}
                style={{ width: '100%', height: '40px', padding: '0.25rem', marginTop: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', cursor: 'pointer' }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
