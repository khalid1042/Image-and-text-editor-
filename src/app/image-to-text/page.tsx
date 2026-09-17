import type { Metadata } from 'next';
import { ToolPageClient } from '@/components/home/ToolPageClient';

export const metadata: Metadata = {
  title: 'Image to Text (OCR) | photext.ai',
  description: 'Upload an image to automatically detect and extract readable text from it using our advanced OCR.',
};

export default function Page() {
  return (
    <ToolPageClient 
      title="Image to Text (OCR)" 
      description="Upload an image to automatically detect and extract readable text from it using our advanced OCR." 
    />
  );
}
