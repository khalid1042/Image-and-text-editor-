"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { MoreDropdown } from '@/components/ui/MoreDropdown';
import { ImageUploader } from '@/components/upload/ImageUploader';
import { useEditorStore } from '@/lib/store/editorStore';
import { defaultOCRProvider } from '@/lib/services/ocr/tesseractProvider';
import { Copy, RefreshCw, Trash2, CheckCircle2 } from 'lucide-react';
import styles from '@/app/page.module.css';

export default function CopyTextFromImagePage() {
  const { originalImage, setOriginalImage } = useEditorStore();
  const [extractedText, setExtractedText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function extractText() {
      if (!originalImage || extractedText) return;
      
      setIsProcessing(true);
      setError("");
      
      try {
        const blocks = await defaultOCRProvider.detectText(originalImage);
        const text = blocks.map(b => b.text).join('\n');
        setExtractedText(text);
      } catch (err) {
        console.error(err);
        setError("Failed to extract text from the image. Please try again.");
      } finally {
        setIsProcessing(false);
      }
    }
    
    extractText();
  }, [originalImage]); // intentionally omitting extractedText to avoid loops

  const handleCopy = () => {
    if (!extractedText) return;
    navigator.clipboard.writeText(extractedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setOriginalImage(null);
    setExtractedText("");
    setError("");
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
        <h1 className={styles.h1} style={{ marginBottom: '0.5rem' }}>Copy Text from Image</h1>
        <p className={styles.subtitle} style={{ marginBottom: '2rem' }}>Instantly extract and copy text from any image or screenshot.</p>

        {!originalImage ? (
          <div style={{ width: '100%', maxWidth: '800px', marginTop: '2rem' }}>
            <ImageUploader redirectPath="/copy-text-from-image" />
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '2rem', width: '100%', maxWidth: '1200px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 500px', background: 'var(--bg-secondary)', borderRadius: '12px', padding: '1rem', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ position: 'relative', width: '100%', height: '400px' }}>
                <Image 
                  src={originalImage} 
                  alt="Uploaded image" 
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <button 
                onClick={handleReset}
                style={{ 
                  marginTop: '1rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  padding: '0.5rem 1rem', 
                  background: 'var(--bg-tertiary)', 
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                  color: 'var(--text-primary)',
                  cursor: 'pointer'
                }}
              >
                <Trash2 size={16} /> Upload Different Image
              </button>
            </div>

            <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Extracted Text</h2>
                <button 
                  onClick={handleCopy}
                  disabled={!extractedText || isProcessing}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem', 
                    padding: '0.5rem 1rem', 
                    background: copied ? 'var(--accent-hover)' : 'var(--accent-primary)', 
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: (!extractedText || isProcessing) ? 'not-allowed' : 'pointer',
                    opacity: (!extractedText || isProcessing) ? 0.6 : 1,
                    transition: 'background 0.2s'
                  }}
                >
                  {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                  {copied ? 'Copied!' : 'Copy to Clipboard'}
                </button>
              </div>

              {isProcessing ? (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                  <RefreshCw size={32} className="animate-spin" style={{ color: 'var(--accent-primary)', marginBottom: '1rem', animation: 'spin 1s linear infinite' }} />
                  <p>Scanning image for text...</p>
                  <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                </div>
              ) : error ? (
                <div style={{ padding: '1rem', color: '#ef4444', background: '#fef2f2', borderRadius: '8px', border: '1px solid #f87171' }}>
                  {error}
                </div>
              ) : (
                <textarea 
                  value={extractedText}
                  onChange={(e) => setExtractedText(e.target.value)}
                  style={{ 
                    flex: 1, 
                    minHeight: '300px',
                    width: '100%', 
                    padding: '1rem', 
                    borderRadius: '12px', 
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    fontFamily: 'inherit',
                    fontSize: '1rem',
                    lineHeight: 1.5,
                    resize: 'vertical'
                  }}
                  placeholder={extractedText ? "" : "No text found in the image."}
                />
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
