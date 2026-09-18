"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { MoreDropdown } from '@/components/ui/MoreDropdown';
import { ImageUploader } from '@/components/upload/ImageUploader';
import { useEditorStore } from '@/lib/store/editorStore';
import { Download, Trash2, FileText } from 'lucide-react';
import styles from '@/app/page.module.css';

// Dynamically import jsPDF
import { jsPDF } from "jspdf";

export default function ImageToPdfPage() {
  const { originalImage, setOriginalImage } = useEditorStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDownloadPdf = async () => {
    if (!originalImage) return;
    setIsProcessing(true);
    
    try {
      const img = new window.Image();
      img.src = originalImage;
      
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      // Calculate orientation based on image dimensions
      const orientation = img.width > img.height ? 'landscape' : 'portrait';
      
      const doc = new jsPDF({
        orientation: orientation,
        unit: 'px',
        format: [img.width, img.height]
      });

      // Add image taking up the whole page
      doc.addImage(originalImage, 'PNG', 0, 0, img.width, img.height);
      doc.save(`document-${Date.now()}.pdf`);
    } catch (error) {
      console.error("Failed to generate PDF", error);
      alert("Failed to generate PDF. Please try a different image.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className={styles.container} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
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

      <main style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 className={styles.h1} style={{ marginBottom: '0.5rem' }}>Image to PDF</h1>
        <p className={styles.subtitle} style={{ marginBottom: '2rem' }}>Convert your image into a high-quality PDF document.</p>

        {!originalImage ? (
          <div style={{ width: '100%', maxWidth: '800px', marginTop: '2rem' }}>
            <ImageUploader redirectPath="/image-to-pdf" />
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '2rem', width: '100%', maxWidth: '1000px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 500px', background: 'var(--bg-secondary)', borderRadius: '12px', padding: '1rem', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ position: 'relative', width: '100%', height: '400px' }}>
                <Image 
                  src={originalImage} 
                  alt="Original image" 
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>

            <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'var(--bg-primary)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)', justifyContent: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', textAlign: 'center', marginBottom: '1rem' }}>
                <div style={{ padding: '1.5rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '50%', color: 'var(--accent-primary)' }}>
                  <FileText size={48} />
                </div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Ready to Convert</h2>
                <p style={{ color: 'var(--text-secondary)' }}>Your image will be converted to a PDF document with exact dimensions.</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <button 
                  onClick={handleDownloadPdf}
                  disabled={isProcessing}
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', padding: '1rem', background: 'var(--accent-primary)', color: 'white', borderRadius: '8px', fontWeight: 600, border: 'none', cursor: isProcessing ? 'wait' : 'pointer', opacity: isProcessing ? 0.7 : 1 }}
                >
                  <Download size={20} /> {isProcessing ? 'Generating PDF...' : 'Download PDF'}
                </button>
                <button 
                  onClick={() => setOriginalImage(null)}
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', padding: '1rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: '8px', cursor: 'pointer' }}
                >
                  <Trash2 size={20} /> Choose Another Image
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
