"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { MoreDropdown } from '@/components/ui/MoreDropdown';
import { Download, FileUp, RefreshCw } from 'lucide-react';
import styles from '@/app/page.module.css';

// For PDF JS
import * as pdfjsLib from 'pdfjs-dist';
// Need to set workerSrc for pdf.js to work properly
pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

import JSZip from 'jszip';

export default function PdfToImagesPage() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const handleConvert = async () => {
    if (!pdfFile) return;
    setIsProcessing(true);
    setProgress(0);

    try {
      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const numPages = pdf.numPages;
      const zip = new JSZip();

      for (let i = 1; i <= numPages; i++) {
        setProgress(Math.round((i / numPages) * 100));
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2.0 }); // High resolution

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        if (ctx) {
          await page.render({ canvasContext: ctx, viewport } as any).promise;
          const imgData = canvas.toDataURL('image/jpeg', 0.9);
          // Remove data:image/jpeg;base64, from the string
          const base64Data = imgData.split(',')[1];
          zip.file(`page-${i}.jpg`, base64Data, { base64: true });
        }
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(zipBlob);
      a.download = `${pdfFile.name.replace('.pdf', '')}-images.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(a.href);

    } catch (error) {
      console.error("PDF extraction failed", error);
      alert("Failed to extract images from PDF.");
    } finally {
      setIsProcessing(false);
      setProgress(0);
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
        <h1 className={styles.h1} style={{ marginBottom: '0.5rem' }}>PDF to Images</h1>
        <p className={styles.subtitle} style={{ marginBottom: '2rem' }}>Extract all pages from a PDF document into high-quality JPG images.</p>

        {!pdfFile ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            style={{ 
              width: '100%', 
              maxWidth: '800px', 
              marginTop: '2rem',
              padding: '4rem 2rem',
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(12px)',
              border: '2px dashed var(--accent-primary)',
              borderRadius: '16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <FileUp size={48} style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Upload PDF Document</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Click or drag and drop your PDF file here</p>
            <input 
              type="file" 
              accept="application/pdf" 
              ref={fileInputRef} 
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%', maxWidth: '600px', background: 'var(--bg-secondary)', padding: '3rem 2rem', borderRadius: '16px', border: '1px solid var(--border-color)', alignItems: 'center' }}>
            <div style={{ padding: '1.5rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '50%', color: 'var(--accent-primary)' }}>
              <FileUp size={48} />
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.25rem' }}>{pdfFile.name}</h2>
              <p style={{ color: 'var(--text-secondary)' }}>{(pdfFile.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>

            {isProcessing && (
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', fontWeight: 500 }}>
                  <span>Extracting pages...</span>
                  <span>{progress}%</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${progress}%`, height: '100%', background: 'var(--accent-primary)', transition: 'width 0.2s' }} />
                </div>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', marginTop: '1rem' }}>
              <button 
                onClick={handleConvert}
                disabled={isProcessing}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', padding: '1rem', background: 'var(--accent-primary)', color: 'white', borderRadius: '8px', fontWeight: 600, border: 'none', cursor: isProcessing ? 'wait' : 'pointer', opacity: isProcessing ? 0.7 : 1 }}
              >
                {isProcessing ? (
                  <><RefreshCw size={20} className="animate-spin" /> Processing...</>
                ) : (
                  <><Download size={20} /> Convert to Images (ZIP)</>
                )}
              </button>
              
              <button 
                onClick={() => setPdfFile(null)}
                disabled={isProcessing}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: '8px', cursor: isProcessing ? 'not-allowed' : 'pointer' }}
              >
                Upload Different PDF
              </button>
            </div>
          </div>
        )}
      </main>
      <style>{`@keyframes spin { 100% { transform: rotate(360deg); } } .animate-spin { animation: spin 1s linear infinite; }`}</style>
    </div>
  );
}
