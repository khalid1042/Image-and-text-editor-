import type { Metadata } from 'next';
import { ToolPageClient } from '@/components/home/ToolPageClient';

export const metadata: Metadata = {
  title: 'Remove Text from Image | photext.ai',
  description: 'Erase unwanted words, captions, or dates from your images and let our AI reconstruct the background.',
};

export default function Page() {
  return (
    <ToolPageClient 
      title="Remove Text from Image" 
      description="Erase unwanted words, captions, or dates from your images and let our AI reconstruct the background." 
    />
  );
}
