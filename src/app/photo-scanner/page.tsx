"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { MoreDropdown } from '@/components/ui/MoreDropdown';
import { ImageUploader } from '@/components/upload/ImageUploader';
import { useEditorStore } from '@/lib/store/editorStore';
import { Download, Trash2, Settings2 } from 'lucide-react';
import styles from '@/app/page.module.css';

export default function PhotoScannerPage() {
  const { originalImage, setOriginalImage } = useEditorStore();
  const [contrast, setContrast] = useState(150);
  const [brightness, setBrightness] = useState(110);
  const [grayscale, setGrayscale] = useState(100);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (originalImage && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = new window.Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.filter = `grayscale(${grayscale}%) contrast(${contrast}%) brightness(${brightness}%)`;
        ctx.drawImage(img, 0, 0, img.width, img.height);
      };
      img.src = originalImage;
    }
  }, [originalImage, contrast, brightness, grayscale]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL('image/jpeg', 0.9);
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `scanned-document-${Date.now()}.jpg`;
    a.click();
  };

  return (
    <div className={styles.container} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link href="/"><span className={styles.logoText}>photext.ai</span></Link>
        </div>
        <nav className={styles.nav}>
          <Link href="/change-image-background">Background Changer</Link>
          <Link href="/guides">Guides</Link>
          <Link href="/identify-fonts">Identify Fonts</Link>
          <MoreDropdown />
          <ThemeToggle />
        </nav>
      </header>

      <main style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 className={styles.h1} style={{ marginBottom: '0.5rem' }}>Photo Scanner</h1>
        <p className={styles.subtitle} style={{ marginBottom: '2rem' }}>Turn a photo of a document into a clean, flat scan.</p>

        {!originalImage ? (
          <div style={{ width: '100%', maxWidth: '800px', marginTop: '2rem' }}>
            <ImageUploader redirectPath="/photo-scanner" />
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '2rem', width: '100%', maxWidth: '1200px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 600px', background: 'var(--bg-secondary)', borderRadius: '12px', padding: '1rem', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <canvas 
                ref={canvasRef} 
                style={{ maxWidth: '100%', maxHeight: '600px', objectFit: 'contain', boxShadow: 'var(--shadow-md)' }}
              />
            </div>

            <div style={{ flex: '1 1 350px', display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'var(--bg-primary)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Settings2 size={20} /> Adjustments
              </h2>
              
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Contrast</label>
                  <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{contrast}%</span>
                </div>
                <input 
                  type="range" min="100" max="300" value={contrast} onChange={(e) => setContrast(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Brightness</label>
                  <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{brightness}%</span>
                </div>
                <input 
                  type="range" min="50" max="200" value={brightness} onChange={(e) => setBrightness(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Grayscale</label>
                  <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{grayscale}%</span>
                </div>
                <input 
                  type="range" min="0" max="100" value={grayscale} onChange={(e) => setGrayscale(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button 
                  onClick={handleDownload}
                  style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', padding: '0.75rem', background: 'var(--accent-primary)', color: 'white', borderRadius: '8px', fontWeight: 600, border: 'none', cursor: 'pointer' }}
                >
                  <Download size={18} /> Download
                </button>
                <button 
                  onClick={() => setOriginalImage(null)}
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0.75rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: '8px', cursor: 'pointer' }}
                  title="Upload different image"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
