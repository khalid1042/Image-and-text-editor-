"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { MoreDropdown } from '@/components/ui/MoreDropdown';
import { ImageUploader } from '@/components/upload/ImageUploader';
import { useEditorStore } from '@/lib/store/editorStore';
import { ScanSearch, Trash2 } from 'lucide-react';
import styles from '@/app/page.module.css';

export default function IdentifyFontsPage() {
  const { originalImage, setOriginalImage } = useEditorStore();
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<{name: string, match: number}[] | null>(null);

  const handleScan = () => {
    setIsScanning(true);
    // Simulate API call for font identification
    setTimeout(() => {
      setResults([
        { name: "Inter", match: 94 },
        { name: "Roboto", match: 88 },
        { name: "Open Sans", match: 82 },
        { name: "Helvetica Neue", match: 75 }
      ]);
      setIsScanning(false);
    }, 2500);
  };

  const handleReset = () => {
    setOriginalImage(null);
    setResults(null);
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
        <h1 className={styles.h1} style={{ marginBottom: '0.5rem' }}>Identify Fonts</h1>
        <p className={styles.subtitle} style={{ marginBottom: '2rem' }}>Upload an image with text to find out what font it uses.</p>

        {!originalImage ? (
          <div style={{ width: '100%', maxWidth: '800px', marginTop: '2rem' }}>
            <ImageUploader redirectPath="/identify-fonts" />
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '2rem', width: '100%', maxWidth: '1200px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 500px', background: 'var(--bg-secondary)', borderRadius: '12px', padding: '1rem', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ position: 'relative', width: '100%', height: '400px' }}>
                <Image 
                  src={originalImage} 
                  alt="Original image" 
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', width: '100%' }}>
                <button 
                  onClick={handleScan}
                  disabled={isScanning || results !== null}
                  style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', padding: '0.75rem', background: 'var(--accent-primary)', color: 'white', borderRadius: '8px', fontWeight: 600, border: 'none', cursor: (isScanning || results) ? 'not-allowed' : 'pointer', opacity: (isScanning || results) ? 0.7 : 1 }}
                >
                  <ScanSearch size={18} /> {isScanning ? 'Scanning...' : 'Identify Font'}
                </button>
                <button 
                  onClick={handleReset}
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0.75rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: '8px', cursor: 'pointer' }}
                  title="Upload different image"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'var(--bg-primary)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Results</h2>
              
              {!results && !isScanning && (
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                  Click "Identify Font" to scan the image.
                </div>
              )}

              {isScanning && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                  <ScanSearch size={32} style={{ color: 'var(--accent-primary)', animation: 'pulse 1.5s infinite' }} />
                  <p>Analyzing typography...</p>
                  <style>{`@keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.1); } }`}</style>
                </div>
              )}

              {results && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>We found these closely matching fonts:</p>
                  {results.map((result, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{result.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Google Fonts</div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--accent-primary)' }}>{result.match}%</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Match</div>
                      </div>
                    </div>
                  ))}
                  <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '8px', border: '1px solid rgba(99, 102, 241, 0.2)', fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                    <strong>Note:</strong> Font identification is currently running in simulation mode as an external API key is required for full production usage.
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
