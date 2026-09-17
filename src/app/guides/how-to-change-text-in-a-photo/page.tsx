import type { Metadata } from 'next';
import { GuideLayout } from '@/components/home/GuideLayout';

export const metadata: Metadata = {
  title: 'How to Change Text in a Photo | photext.ai',
  description: 'Step-by-step guide to changing words, signs, and labels embedded inside real photographs.',
};

export default function GuidePage() {
  return (
    <GuideLayout title="How to Change Text in a Photo">
      
      <p style={{ marginBottom: '1.5rem' }}>Changing text in a real photograph—like a street sign, a t-shirt, or a storefront—is much harder than editing a digital graphic because of lighting, noise, and complex backgrounds. Here is how to do it seamlessly.</p>
      <h2 style={{ fontSize: '2rem', margin: '2rem 0 1rem' }}>Challenges with Photos</h2>
      <p style={{ marginBottom: '1.5rem' }}>Unlike flat vectors, photos have natural textures. When you erase text, the editor must intelligently "inpaint" the missing texture so it doesn't look like a blurry smudge.</p>
      <h2 style={{ fontSize: '2rem', margin: '2rem 0 1rem' }}>The Process</h2>
      <p style={{ marginBottom: '1.5rem' }}>1. <strong>Upload</strong> your photo to the photext.ai editor.</p>
      <p style={{ marginBottom: '1.5rem' }}>2. <strong>Run OCR</strong> to automatically detect the text. If the text is skewed, the bounding box will capture it.</p>
      <p style={{ marginBottom: '1.5rem' }}>3. <strong>Replace</strong> the text. Our AI will sample the surrounding pixels (whether it's brick, fabric, or sky) and seamlessly rebuild the background before applying your new text.</p>
    
    </GuideLayout>
  );
}
