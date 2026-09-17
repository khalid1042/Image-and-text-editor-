import type { Metadata } from 'next';
import { GuideLayout } from '@/components/home/GuideLayout';

export const metadata: Metadata = {
  title: 'How to Extract Text from an Image | photext.ai',
  description: 'Discover how to use OCR to copy and paste text out of any image or document.',
};

export default function GuidePage() {
  return (
    <GuideLayout title="How to Extract Text from an Image">
      
      <p style={{ marginBottom: '1.5rem' }}>Need to digitize a scanned document, pull an address from a photo, or copy code from a screenshot? Optical Character Recognition (OCR) is the tool you need.</p>
      <h2 style={{ fontSize: '2rem', margin: '2rem 0 1rem' }}>How OCR Works</h2>
      <p style={{ marginBottom: '1.5rem' }}>Our platform uses advanced neural networks to identify character shapes in images, even if they are slightly blurry or stylized.</p>
      <h2 style={{ fontSize: '2rem', margin: '2rem 0 1rem' }}>Extracting the Text</h2>
      <p style={{ marginBottom: '1.5rem' }}>Simply upload your image and hit the <strong>Detect Text with OCR</strong> button. Every block of text will become selectable. You can then copy the text directly to your clipboard, saving you from having to type it all out manually.</p>
    
    </GuideLayout>
  );
}
