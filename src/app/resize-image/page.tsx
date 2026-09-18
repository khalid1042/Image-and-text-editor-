"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { MoreDropdown } from '@/components/ui/MoreDropdown';
import { ImageUploader } from '@/components/upload/ImageUploader';
import { useEditorStore } from '@/lib/store/editorStore';
import { Download, Trash2, Link as LinkIcon, Unlink } from 'lucide-react';
import styles from '@/app/page.module.css';

export default function ResizeImagePage() {
  const { originalImage, setOriginalImage } = useEditorStore();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [keepAspect, setKeepAspect] = useState(true);
  const originalSize = useRef({ width: 0, height: 0 });

  useEffect(() => {
    if (originalImage) {
      const img = new window.Image();
      img.onload = () => {
        setWidth(img.width);
        setHeight(img.height);
        originalSize.current = { width: img.width, height: img.height };
      };
      img.src = originalImage;
    }
  }, [originalImage]);

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = parseInt(e.target.value) || 0;
    setWidth(newWidth);
    if (keepAspect && originalSize.current.width > 0) {
      setHeight(Math.round(newWidth * (originalSize.current.height / originalSize.current.width)));
    }
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = parseInt(e.target.value) || 0;
    setHeight(newHeight);
    if (keepAspect && originalSize.current.height > 0) {
      setWidth(Math.round(newHeight * (originalSize.current.width / originalSize.current.height)));
    }
  };

  const handleDownload = () => {
    if (!originalImage || width <= 0 || height <= 0) return;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const img = new window.Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height);
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `resized-${width}x${height}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };
    img.src = originalImage;
  };

  return (
    <div className={styles.container} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', gap: '10px' }}>
            <img src="/logo.svg" alt="icon" style={{ height: '40px', width: 'auto' }} />
            <span className={styles.logoText}>photext.ai</span>
          </Link>
        </div>
        <nav className={styles.nav}>
          <Link href="/change-image-background">Background Changer</Link>
          <Link href="/guides">Guides</Link>
          <Link href="/identify-fonts">Identify Fonts</Link>
          <MoreDropdown />
          <ThemeToggle />
        </nav>
      </header>

      <main className={styles.toolMain}>
        <h1 className={styles.h1} style={{ marginBottom: '0.5rem' }}>Resize Image</h1>
        <p className={styles.subtitle} style={{ marginBottom: '2rem' }}>Change the dimensions of your image quickly and easily.</p>

        {!originalImage ? (
          <div style={{ width: '100%', maxWidth: '800px', marginTop: '2rem' }}>
            <ImageUploader redirectPath="/resize-image" />
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '2rem', width: '100%', maxWidth: '1000px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 400px', background: 'var(--bg-secondary)', borderRadius: '12px', padding: '1rem', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ position: 'relative', width: '100%', height: '400px' }}>
                <Image 
                  src={originalImage} 
                  alt="Original image" 
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Original: {originalSize.current.width} x {originalSize.current.height} px</p>
            </div>

            <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'var(--bg-primary)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Dimensions (px)</h2>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Width</label>
                  <input 
                    type="number" 
                    value={width || ''} 
                    onChange={handleWidthChange}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                  />
                </div>
                
                <button 
                  onClick={() => setKeepAspect(!keepAspect)} 
                  title="Toggle Aspect Ratio Lock"
                  style={{ marginTop: '1.5rem', padding: '0.5rem', background: keepAspect ? 'var(--bg-secondary)' : 'transparent', border: keepAspect ? '1px solid var(--border-color)' : '1px dashed var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)' }}
                >
                  {keepAspect ? <LinkIcon size={20} /> : <Unlink size={20} />}
                </button>

                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Height</label>
                  <input 
                    type="number" 
                    value={height || ''} 
                    onChange={handleHeightChange}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                  />
                </div>
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
