"use client";

import React, { useState, useRef } from "react";
import { useEditorStore } from "@/lib/store/editorStore";
import styles from "./EditorLayout.module.css";
import * as fabric from "fabric";

const PRESET_COLORS = [
  "#FFFFFF", "#000000", "#FF0000", "#00FF00", "#0000FF",
  "#FFFF00", "#FF00FF", "#00FFFF", "#888888", "#FFA500"
];

const PRESET_IMAGES = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&q=80", // Beach
  "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=300&q=80", // Abstract gradient
  "https://images.unsplash.com/photo-1600607686527-6fb886090705?w=300&q=80", // Modern office
  "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=300&q=80", // Abstract tech
];

export function BackgroundPanel() {
  const { canvas } = useEditorStore();
  const [activeTab, setActiveTab] = useState<'library' | 'upload' | 'color' | 'ai'>('color');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const applyColorBackground = (color: string) => {
    if (!canvas) return;
    
    // Remove existing image backgrounds if any
    const existingBgImg = canvas.getObjects().find((o: any) => o.id === "custom-background-image");
    if (existingBgImg) canvas.remove(existingBgImg);

    let bgRect = canvas.getObjects().find((o: any) => o.id === "custom-background-rect");
    
    if (!bgRect) {
      bgRect = new fabric.Rect({
        left: 0,
        top: 0,
        width: canvas.getWidth() / canvas.getZoom(),
        height: canvas.getHeight() / canvas.getZoom(),
        fill: color,
        selectable: true,
        evented: true,
        id: "custom-background-rect"
      } as any);
      canvas.add(bgRect);
    } else {
      bgRect.set({
        fill: color
      });
    }
    
    canvas.sendObjectToBack(bgRect);
    canvas.renderAll();

    // Automatically download after applying
    setTimeout(() => {
      useEditorStore.getState().downloadImage();
    }, 100);
  };

  const applyImageBackground = (url: string) => {
    if (!canvas) return;
    
    // Remove existing color background if any
    const existingBgRect = canvas.getObjects().find((o: any) => o.id === "custom-background-rect");
    if (existingBgRect) canvas.remove(existingBgRect);

    fabric.Image.fromURL(url, { crossOrigin: 'anonymous' }).then((img) => {
      const existingBgImg = canvas.getObjects().find((o: any) => o.id === "custom-background-image");
      if (existingBgImg) canvas.remove(existingBgImg);

      // Scale to cover canvas (using original unzoomed canvas size to match internal coordinates)
      const internalWidth = canvas.getWidth() / canvas.getZoom();
      const internalHeight = canvas.getHeight() / canvas.getZoom();
      
      const canvasRatio = internalWidth / internalHeight;
      const imgRatio = img.width! / img.height!;
      let scale = 1;

      if (canvasRatio > imgRatio) {
        scale = internalWidth / img.width!;
      } else {
        scale = internalHeight / img.height!;
      }

      img.scale(scale);
      canvas.centerObject(img);

      img.set({
        selectable: true,
        evented: true,
        id: "custom-background-image"
      } as any);

      canvas.add(img);
      canvas.sendObjectToBack(img);
      canvas.renderAll();

      // Automatically download after applying
      setTimeout(() => {
        useEditorStore.getState().downloadImage();
      }, 100);
    }).catch(err => {
      console.error("Failed to load background image:", err);
    });
  };

  const handleFileUpload = (file: File) => {
    if (!file || !file.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    applyImageBackground(url);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
      
      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {(['library', 'upload', 'color', 'ai'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '0.25rem 0.5rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'capitalize',
              borderRadius: '4px',
              border: 'none',
              background: activeTab === tab ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
              color: activeTab === tab ? 'white' : 'var(--text-secondary)',
              cursor: 'pointer'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '8px' }}>
        
        {activeTab === 'color' && (
          <div>
            <h4 style={{ fontSize: '0.875rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Solid Colors</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.5rem' }}>
              {PRESET_COLORS.map(color => (
                <div 
                  key={color} 
                  onClick={() => applyColorBackground(color)}
                  style={{
                    width: '100%',
                    aspectRatio: '1/1',
                    background: color,
                    borderRadius: '4px',
                    cursor: 'pointer',
                    border: '1px solid var(--border-color)'
                  }}
                  title={color}
                />
              ))}
            </div>
            
            <div style={{ marginTop: '1.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Custom Hex</label>
              <input 
                type="color" 
                onChange={(e) => applyColorBackground(e.target.value)}
                style={{ width: '100%', height: '40px', padding: '0.25rem', marginTop: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', cursor: 'pointer' }}
              />
            </div>
          </div>
        )}

        {activeTab === 'library' && (
          <div>
            <h4 style={{ fontSize: '0.875rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Preset Backgrounds</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              {PRESET_IMAGES.map((url, i) => (
                <img 
                  key={i} 
                  src={url} 
                  alt="preset" 
                  onClick={() => applyImageBackground(url)}
                  style={{
                    width: '100%',
                    aspectRatio: '4/3',
                    objectFit: 'cover',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    border: '1px solid var(--border-color)'
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'upload' && (
          <div>
            <h4 style={{ fontSize: '0.875rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Upload Background</h4>
            <div 
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              style={{
                width: '100%',
                padding: '2rem 1rem',
                border: `2px dashed ${dragActive ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                borderRadius: '8px',
                textAlign: 'center',
                cursor: 'pointer',
                background: dragActive ? 'rgba(99, 102, 241, 0.05)' : 'var(--bg-primary)',
                transition: 'all 0.2s ease'
              }}
            >
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Drag & drop image here</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>or click to browse</p>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                accept="image/*" 
                style={{ display: 'none' }} 
              />
            </div>
          </div>
        )}

        {activeTab === 'ai' && (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <h4 style={{ fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Generate with AI</h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Describe a background and AI will create it for you.</p>
            <button 
              disabled
              style={{ width: '100%', padding: '0.75rem', marginTop: '1rem', background: 'var(--bg-primary)', color: 'var(--text-tertiary)', border: '1px solid var(--border-color)', borderRadius: '4px', fontWeight: 600, cursor: 'not-allowed' }}
            >
              Coming Soon
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
