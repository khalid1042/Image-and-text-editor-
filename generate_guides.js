const fs = require('fs');
const path = require('path');

// 1. Create a GuideLayout component first
const guideLayoutCode = `"use client";

import React from "react";
import Link from "next/link";
import styles from "@/app/page.module.css";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { MoreDropdown } from "@/components/ui/MoreDropdown";

export function GuideLayout({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link href="/" className={styles.logoText} style={{ textDecoration: 'none' }}>photext.ai</Link>
        </div>
        <nav className={styles.nav}>
          <Link href="/edit-text-in-image">Edit Text</Link>
          <Link href="/remove-text-from-image">Remove Text</Link>
          <Link href="/remove-background-from-image">Remove BG</Link>
          <Link href="/guides">Guides</Link>
          <MoreDropdown />
          <ThemeToggle />
        </nav>
      </header>

      <main style={{ maxWidth: '800px', margin: '4rem auto', padding: '0 2rem', minHeight: '70vh' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '2rem', lineHeight: 1.2 }}>{title}</h1>
        <article style={{ fontSize: '1.15rem', lineHeight: 1.8, color: 'var(--text-primary)' }}>
          {children}
        </article>
        
        <div style={{ marginTop: '4rem', padding: '2rem', background: 'var(--bg-secondary)', borderRadius: '12px', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '1rem' }}>Ready to try it out?</h2>
          <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>Upload your image to our free AI tool and start editing instantly.</p>
          <Link href="/" style={{ display: 'inline-block', padding: '12px 24px', background: 'var(--accent-primary)', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>Open the Editor</Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2026 photext.ai. All rights reserved.</p>
      </footer>
    </div>
  );
}
`;

const componentsPath = path.join('src', 'components', 'home');
if (!fs.existsSync(componentsPath)) {
    fs.mkdirSync(componentsPath, { recursive: true });
}
fs.writeFileSync(path.join(componentsPath, 'GuideLayout.tsx'), guideLayoutCode);

// 2. Define content for the 6 guides
const guides = [
  {
    slug: 'how-to-edit-text-in-an-image',
    title: 'How to Edit Text in an Image',
    desc: 'Learn how to easily edit, change, or replace text inside any image using AI.',
    content: `
      <p style={{ marginBottom: '1.5rem' }}>Editing text in a flattened image like a JPG or PNG used to require complex Photoshop skills, painstakingly cloning the background and matching the font. With AI-powered tools, this process takes seconds.</p>
      <h2 style={{ fontSize: '2rem', margin: '2rem 0 1rem' }}>Step 1: Upload Your Image</h2>
      <p style={{ marginBottom: '1.5rem' }}>Start by opening the <strong>photext.ai</strong> editor and dragging in your file. We support JPG, PNG, and WebP formats. Whether it's a poster, a product label, or a simple graphic, the tool will load it instantly.</p>
      <h2 style={{ fontSize: '2rem', margin: '2rem 0 1rem' }}>Step 2: Let AI Detect the Text</h2>
      <p style={{ marginBottom: '1.5rem' }}>Once uploaded, our OCR engine automatically scans the image and highlights all visible text with bounding boxes. You don't need to manually trace anything.</p>
      <h2 style={{ fontSize: '2rem', margin: '2rem 0 1rem' }}>Step 3: Select and Replace</h2>
      <p style={{ marginBottom: '1.5rem' }}>Click on the text box you want to change. In the properties panel, type your new text. The AI will immediately reconstruct the background behind the old text and render your new words, matching the original font style, color, and alignment!</p>
    `
  },
  {
    slug: 'how-to-change-text-in-a-photo',
    title: 'How to Change Text in a Photo',
    desc: 'Step-by-step guide to changing words, signs, and labels embedded inside real photographs.',
    content: `
      <p style={{ marginBottom: '1.5rem' }}>Changing text in a real photograph—like a street sign, a t-shirt, or a storefront—is much harder than editing a digital graphic because of lighting, noise, and complex backgrounds. Here is how to do it seamlessly.</p>
      <h2 style={{ fontSize: '2rem', margin: '2rem 0 1rem' }}>Challenges with Photos</h2>
      <p style={{ marginBottom: '1.5rem' }}>Unlike flat vectors, photos have natural textures. When you erase text, the editor must intelligently "inpaint" the missing texture so it doesn't look like a blurry smudge.</p>
      <h2 style={{ fontSize: '2rem', margin: '2rem 0 1rem' }}>The Process</h2>
      <p style={{ marginBottom: '1.5rem' }}>1. <strong>Upload</strong> your photo to the photext.ai editor.</p>
      <p style={{ marginBottom: '1.5rem' }}>2. <strong>Run OCR</strong> to automatically detect the text. If the text is skewed, the bounding box will capture it.</p>
      <p style={{ marginBottom: '1.5rem' }}>3. <strong>Replace</strong> the text. Our AI will sample the surrounding pixels (whether it's brick, fabric, or sky) and seamlessly rebuild the background before applying your new text.</p>
    `
  },
  {
    slug: 'how-to-edit-text-in-a-screenshot',
    title: 'How to Edit Text in a Screenshot',
    desc: 'A quick guide to modifying text, fixing typos, or updating messages in screenshots.',
    content: `
      <p style={{ marginBottom: '1.5rem' }}>Screenshots are the most common images people need to edit. Whether you are creating a tutorial, updating a UI mockup, or fixing a typo in a chat log, editing a screenshot needs to look pixel-perfect.</p>
      <h2 style={{ fontSize: '2rem', margin: '2rem 0 1rem' }}>Why use an AI Editor?</h2>
      <p style={{ marginBottom: '1.5rem' }}>Standard editors will leave mismatched fonts and obvious background patches. Our tool automatically detects the system fonts used in the screenshot.</p>
      <h2 style={{ fontSize: '2rem', margin: '2rem 0 1rem' }}>Editing the Screenshot</h2>
      <p style={{ marginBottom: '1.5rem' }}>Just upload your screenshot and click on the text you want to change. Type your new message, and the tool will match the exact size, weight, and color of the original UI element. It's the fastest way to generate perfect mockups.</p>
    `
  },
  {
    slug: 'how-to-remove-text-from-an-image',
    title: 'How to Remove Text from an Image',
    desc: 'Learn how to magically erase unwanted text, dates, or labels from your images.',
    content: `
      <p style={{ marginBottom: '1.5rem' }}>Sometimes you don't want to replace text—you just want it gone. Whether it's an outdated date on a poster or a distracting label, removing it cleanly is essential.</p>
      <h2 style={{ fontSize: '2rem', margin: '2rem 0 1rem' }}>The Magic of Inpainting</h2>
      <p style={{ marginBottom: '1.5rem' }}>When you select text and click "Remove Text" in our editor, it triggers an AI inpainting algorithm. It analyzes the colors and patterns surrounding the text and fills in the gap as if the text was never there.</p>
      <h2 style={{ fontSize: '2rem', margin: '2rem 0 1rem' }}>Best Practices</h2>
      <p style={{ marginBottom: '1.5rem' }}>For the best results, ensure the bounding box tightly surrounds the text you want to remove. If the text is very large or covering a highly detailed subject, the AI will do its best to hallucinate the missing details, but clean backgrounds always yield perfect results.</p>
    `
  },
  {
    slug: 'how-to-extract-text-from-an-image',
    title: 'How to Extract Text from an Image',
    desc: 'Discover how to use OCR to copy and paste text out of any image or document.',
    content: `
      <p style={{ marginBottom: '1.5rem' }}>Need to digitize a scanned document, pull an address from a photo, or copy code from a screenshot? Optical Character Recognition (OCR) is the tool you need.</p>
      <h2 style={{ fontSize: '2rem', margin: '2rem 0 1rem' }}>How OCR Works</h2>
      <p style={{ marginBottom: '1.5rem' }}>Our platform uses advanced neural networks to identify character shapes in images, even if they are slightly blurry or stylized.</p>
      <h2 style={{ fontSize: '2rem', margin: '2rem 0 1rem' }}>Extracting the Text</h2>
      <p style={{ marginBottom: '1.5rem' }}>Simply upload your image and hit the <strong>Detect Text with OCR</strong> button. Every block of text will become selectable. You can then copy the text directly to your clipboard, saving you from having to type it all out manually.</p>
    `
  },
  {
    slug: 'how-to-identify-a-font-from-an-image',
    title: 'How to Identify a Font from an Image',
    desc: 'Find out exactly what font was used in a photo or graphic so you can use it in your designs.',
    content: `
      <p style={{ marginBottom: '1.5rem' }}>Have you ever seen a beautiful poster and wondered, "What font is that?" Identifying fonts from flattened images is a common hurdle for designers.</p>
      <h2 style={{ fontSize: '2rem', margin: '2rem 0 1rem' }}>AI Font Matching</h2>
      <p style={{ marginBottom: '1.5rem' }}>When you use photext.ai to edit text, our AI doesn't just replace the words—it analyzes the visual characteristics of the original text (serifs, weight, curvature) and attempts to match it with the closest available web font.</p>
      <h2 style={{ fontSize: '2rem', margin: '2rem 0 1rem' }}>Tips for Accuracy</h2>
      <p style={{ marginBottom: '1.5rem' }}>Font identification works best on high-resolution images where the text has high contrast against the background. If the text is heavily distorted or custom-drawn, the tool will fall back to the closest visual match.</p>
    `
  }
];

guides.forEach(g => {
  const p = path.join('src/app/guides', g.slug);
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
  
  const content = `import type { Metadata } from 'next';
import { GuideLayout } from '@/components/home/GuideLayout';

export const metadata: Metadata = {
  title: '${g.title} | photext.ai',
  description: '${g.desc}',
};

export default function GuidePage() {
  return (
    <GuideLayout title="${g.title}">
      ${g.content}
    </GuideLayout>
  );
}
`;
  fs.writeFileSync(path.join(p, 'page.tsx'), content);
});

// Also create the main /guides/page.tsx listing
const guidesIndexContent = `import type { Metadata } from 'next';
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
        ${guides.map(g => `
        <div style={{ border: '1px solid var(--border-color)', padding: '1.5rem', borderRadius: '8px' }}>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>
            <Link href="/guides/${g.slug}" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>${g.title}</Link>
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>${g.desc}</p>
        </div>
        `).join('')}
      </div>
    </GuideLayout>
  );
}
`;
fs.writeFileSync(path.join('src/app/guides', 'page.tsx'), guidesIndexContent);
