import type { Metadata } from 'next';
import { GuideLayout } from '@/components/home/GuideLayout';

export const metadata: Metadata = {
  title: 'How to Remove Text from an Image | photext.ai',
  description: 'Learn how to magically erase unwanted text, dates, or labels from your images.',
};

export default function GuidePage() {
  return (
    <GuideLayout title="How to Remove Text from an Image">
      
      <p style={{ marginBottom: '1.5rem' }}>Sometimes you don't want to replace text—you just want it gone. Whether it's an outdated date on a poster or a distracting label, removing it cleanly is essential.</p>
      <h2 style={{ fontSize: '2rem', margin: '2rem 0 1rem' }}>The Magic of Inpainting</h2>
      <p style={{ marginBottom: '1.5rem' }}>When you select text and click "Remove Text" in our editor, it triggers an AI inpainting algorithm. It analyzes the colors and patterns surrounding the text and fills in the gap as if the text was never there.</p>
      <h2 style={{ fontSize: '2rem', margin: '2rem 0 1rem' }}>Best Practices</h2>
      <p style={{ marginBottom: '1.5rem' }}>For the best results, ensure the bounding box tightly surrounds the text you want to remove. If the text is very large or covering a highly detailed subject, the AI will do its best to hallucinate the missing details, but clean backgrounds always yield perfect results.</p>
    
    </GuideLayout>
  );
}
