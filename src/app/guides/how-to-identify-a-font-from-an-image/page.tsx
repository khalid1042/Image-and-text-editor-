import type { Metadata } from 'next';
import { GuideLayout } from '@/components/home/GuideLayout';

export const metadata: Metadata = {
  title: 'How to Identify a Font from an Image | photext.ai',
  description: 'Find out exactly what font was used in a photo or graphic so you can use it in your designs.',
};

export default function GuidePage() {
  return (
    <GuideLayout title="How to Identify a Font from an Image">
      
      <p style={{ marginBottom: '1.5rem' }}>Have you ever seen a beautiful poster and wondered, "What font is that?" Identifying fonts from flattened images is a common hurdle for designers.</p>
      <h2 style={{ fontSize: '2rem', margin: '2rem 0 1rem' }}>AI Font Matching</h2>
      <p style={{ marginBottom: '1.5rem' }}>When you use photext.ai to edit text, our AI doesn't just replace the words—it analyzes the visual characteristics of the original text (serifs, weight, curvature) and attempts to match it with the closest available web font.</p>
      <h2 style={{ fontSize: '2rem', margin: '2rem 0 1rem' }}>Tips for Accuracy</h2>
      <p style={{ marginBottom: '1.5rem' }}>Font identification works best on high-resolution images where the text has high contrast against the background. If the text is heavily distorted or custom-drawn, the tool will fall back to the closest visual match.</p>
    
    </GuideLayout>
  );
}
