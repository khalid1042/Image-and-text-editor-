import React from 'react';
import Link from 'next/link';
import styles from '../page.module.css';
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export const metadata = {
  title: 'Guides & Tutorials | photext.ai',
  description: 'Learn how to edit text in images, remove backgrounds, and use AI features with our comprehensive guides.',
};

export default function GuidesPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link href="/">photext.ai</Link>
        </div>
        <nav className={styles.nav}>
          <Link href="/edit-text-in-image">Text Editor</Link>
          <Link href="/change-image-background">Background Changer</Link>
          <Link href="/guides" style={{ color: 'var(--accent-primary)' }}>Guides</Link>
          <ThemeToggle />
        </nav>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.title}>Guides & Tutorials</h1>
          <p className={styles.subtitle}>
            Learn how to get the most out of photext.ai with our step-by-step guides.
          </p>
        </section>

        <section style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            <Link 
              href="/guides/how-to-edit-text-in-image" 
              className={styles.guideLink}
            >
              <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--accent-primary)' }}>How to Edit Text in Images</h2>
              <p style={{ color: 'var(--text-secondary)' }}>A comprehensive guide on replacing, modifying, and translating text inside any image using our AI-powered OCR and inpainting tools.</p>
            </Link>
            
            <div style={{ padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: '8px', opacity: 0.6 }}>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Mastering the AI Background Changer (Coming Soon)</h2>
              <p style={{ color: 'var(--text-secondary)' }}>Learn how to perfectly isolate subjects and drop them into new environments seamlessly.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} photext.ai. All rights reserved.</p>
      </footer>
    </div>
  );
}
