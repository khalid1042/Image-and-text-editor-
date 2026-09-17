"use client";

import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import { useEditorStore } from "@/lib/store/editorStore";

export function EditorCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null);
  const originalImage = useEditorStore((state) => state.originalImage);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    // Initialize Fabric.js Canvas
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: containerRef.current.clientWidth,
      height: containerRef.current.clientHeight,
      preserveObjectStacking: true,
      selection: true,
    });
    setFabricCanvas(canvas);
    useEditorStore.getState().setCanvas(canvas);

    // Resize handling
    const handleResize = () => {
      if (containerRef.current) {
        canvas.setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
        canvas.renderAll();
      }
    };
    window.addEventListener("resize", handleResize);

    const handleSelection = (e: any) => {
      if (e.selected && e.selected.length > 0) {
        useEditorStore.getState().setSelectedObjectId(e.selected[0].id || null);
      } else {
        useEditorStore.getState().setSelectedObjectId(null);
      }
    };

    canvas.on("selection:created", handleSelection);
    canvas.on("selection:updated", handleSelection);
    canvas.on("selection:cleared", handleSelection);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.off("selection:created", handleSelection);
      canvas.off("selection:updated", handleSelection);
      canvas.off("selection:cleared", handleSelection);
      canvas.dispose();
    };
  }, []);

  // Load Image when ready
  useEffect(() => {
    if (!fabricCanvas || !originalImage) return;

    fabric.Image.fromURL(originalImage, { crossOrigin: 'anonymous' }).then((img) => {
      // Remove existing main image if any
      const existingImg = fabricCanvas.getObjects().find(o => (o as any).id === "background-image");
      if (existingImg) {
        fabricCanvas.remove(existingImg);
      }

      const imgWidth = img.width || 800;
      const imgHeight = img.height || 600;

      // Calculate zoom to fit container
      const containerWidth = containerRef.current?.clientWidth || 800;
      const containerHeight = containerRef.current?.clientHeight || 600;
      const scaleX = containerWidth / imgWidth;
      const scaleY = containerHeight / imgHeight;
      const zoom = Math.min(scaleX, scaleY, 0.95); // 0.95 to leave a little padding

      // Set canvas to the exact scaled image dimensions!
      fabricCanvas.setDimensions({
        width: imgWidth * zoom,
        height: imgHeight * zoom,
      });
      fabricCanvas.setZoom(zoom);

      img.set({
        left: 0,
        top: 0,
        scaleX: 1,
        scaleY: 1,
        selectable: true,
        evented: true,
        id: "background-image" // custom property
      } as any);

      fabricCanvas.add(img);
      fabricCanvas.sendObjectToBack(img);
      
      // Update background rect if it exists to match new canvas size
      const bgRect = fabricCanvas.getObjects().find(o => (o as any).id === "custom-background-rect");
      if (bgRect) {
        bgRect.set({ width: imgWidth, height: imgHeight });
        fabricCanvas.sendObjectToBack(bgRect);
      }

      // Update background image if it exists to match new canvas size
      const bgImg = fabricCanvas.getObjects().find(o => (o as any).id === "custom-background-image");
      if (bgImg) {
        // Simple cover logic
        const bgScaleX = imgWidth / (bgImg.width || 1);
        const bgScaleY = imgHeight / (bgImg.height || 1);
        const bgScale = Math.max(bgScaleX, bgScaleY);
        bgImg.set({ scaleX: bgScale, scaleY: bgScale });
        fabricCanvas.centerObject(bgImg);
        fabricCanvas.sendObjectToBack(bgImg);
      }
      
      fabricCanvas.renderAll();
    }).catch(err => {
      console.error("Failed to load image into canvas:", err);
    });
  }, [fabricCanvas, originalImage]);

  // Render OCR Bounding Boxes
  const detectedTexts = useEditorStore((state) => state.detectedTexts);

  useEffect(() => {
    if (!fabricCanvas) return;

    // Remove old bounding boxes
    const objects = fabricCanvas.getObjects();
    objects.forEach(obj => {
      if ((obj as any).id?.startsWith('bbox-')) {
        fabricCanvas.remove(obj);
      }
    });

    // Add new bounding boxes
    detectedTexts.forEach(dt => {
      // Find the image to get scale factor
      const img = fabricCanvas.getObjects().find(o => (o as any).id === "background-image");
      if (!img) return;

      const scaleX = img.scaleX || 1;
      const scaleY = img.scaleY || 1;
      const leftOffset = img.left || 0;
      const topOffset = img.top || 0;

      const rect = new fabric.Rect({
        left: leftOffset + (dt.bbox.x * scaleX),
        top: topOffset + (dt.bbox.y * scaleY),
        width: dt.bbox.width * scaleX,
        height: dt.bbox.height * scaleY,
        fill: 'rgba(99, 102, 241, 0.2)', // Accent primary with opacity
        stroke: 'rgba(99, 102, 241, 1)',
        strokeWidth: 2,
        cornerColor: 'rgba(99, 102, 241, 1)',
        cornerSize: 8,
        transparentCorners: false,
        id: `bbox-${dt.id}`,
        textData: dt, // Store the raw text data inside the object
      } as any);

      fabricCanvas.add(rect);
    });
    
    fabricCanvas.renderAll();
  }, [fabricCanvas, detectedTexts]);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%", position: "relative" }}>
      <canvas ref={canvasRef} />
    </div>
  );
}
