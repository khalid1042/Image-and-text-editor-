import type { Metadata } from 'next';
import { GuideLayout } from '@/components/home/GuideLayout';

export const metadata: Metadata = {
  title: 'How to Edit Text in an Image | photext.ai',
  description: 'Learn how to easily edit, change, or replace text inside any image using AI.',
};

export default function GuidePage() {
  return (
    <GuideLayout title="How to Edit Text in an Image">
      
      <p style={{ marginBottom: '1.5rem' }}>Editing text in a flattened image like a JPG or PNG used to require complex Photoshop skills, painstakingly cloning the background and matching the font. With AI-powered tools, this process takes seconds.</p>
      <h2 style={{ fontSize: '2rem', margin: '2rem 0 1rem' }}>Step 1: Upload Your Image</h2>
      <p style={{ marginBottom: '1.5rem' }}>Start by opening the <strong>photext.ai</strong> editor and dragging in your file. We support JPG, PNG, and WebP formats. Whether it's a poster, a product label, or a simple graphic, the tool will load it instantly.</p>
      <h2 style={{ fontSize: '2rem', margin: '2rem 0 1rem' }}>Step 2: Let AI Detect the Text</h2>
      <p style={{ marginBottom: '1.5rem' }}>Once uploaded, our OCR engine automatically scans the image and highlights all visible text with bounding boxes. You don't need to manually trace anything.</p>
      <h2 style={{ fontSize: '2rem', margin: '2rem 0 1rem' }}>Step 3: Select and Replace</h2>
      <p style={{ marginBottom: '1.5rem' }}>Click on the text box you want to change. In the properties panel, type your new text. The AI will immediately reconstruct the background behind the old text and render your new words, matching the original font style, color, and alignment!</p>
    
    </GuideLayout>
  );
}
