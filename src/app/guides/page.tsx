import type { Metadata } from 'next';
import Link from 'next/link';
import { GuideLayout } from '@/components/home/GuideLayout';

export const metadata: Metadata = {
  title: 'Image Editing Guides & Tutorials | photext.ai',
  description: 'Learn how to edit text, remove text, extract words, and modify images with our comprehensive guides.',
};

export default function GuidesIndex() {
  return (
    <GuideLayout title="Image Editing Guides">
      <p style={{ marginBottom: '2rem' }}>Check out our tutorials below to learn how to get the most out of our AI-powered image text editor.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
        
        <div style={{ border: '1px solid var(--border-color)', padding: '1.5rem', borderRadius: '8px' }}>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>
            <Link href="/guides/how-to-edit-text-in-an-image" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>How to Edit Text in an Image</Link>
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>Learn how to easily edit, change, or replace text inside any image using AI.</p>
        </div>
        
        <div style={{ border: '1px solid var(--border-color)', padding: '1.5rem', borderRadius: '8px' }}>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>
            <Link href="/guides/how-to-change-text-in-a-photo" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>How to Change Text in a Photo</Link>
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>Step-by-step guide to changing words, signs, and labels embedded inside real photographs.</p>
        </div>
        
        <div style={{ border: '1px solid var(--border-color)', padding: '1.5rem', borderRadius: '8px' }}>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>
            <Link href="/guides/how-to-edit-text-in-a-screenshot" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>How to Edit Text in a Screenshot</Link>
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>A quick guide to modifying text, fixing typos, or updating messages in screenshots.</p>
        </div>
        
        <div style={{ border: '1px solid var(--border-color)', padding: '1.5rem', borderRadius: '8px' }}>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>
            <Link href="/guides/how-to-remove-text-from-an-image" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>How to Remove Text from an Image</Link>
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>Learn how to magically erase unwanted text, dates, or labels from your images.</p>
        </div>
        
        <div style={{ border: '1px solid var(--border-color)', padding: '1.5rem', borderRadius: '8px' }}>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>
            <Link href="/guides/how-to-extract-text-from-an-image" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>How to Extract Text from an Image</Link>
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>Discover how to use OCR to copy and paste text out of any image or document.</p>
        </div>
        
        <div style={{ border: '1px solid var(--border-color)', padding: '1.5rem', borderRadius: '8px' }}>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>
            <Link href="/guides/how-to-identify-a-font-from-an-image" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>How to Identify a Font from an Image</Link>
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>Find out exactly what font was used in a photo or graphic so you can use it in your designs.</p>
        </div>
        
      </div>
    </GuideLayout>
  );
}
