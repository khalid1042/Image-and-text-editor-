import type { Metadata } from 'next';
import { ToolPageClient } from '@/components/home/ToolPageClient';

export const metadata: Metadata = {
  title: 'Identify Fonts in Image | photext.ai',
  description: 'Upload an image containing text to match the font style before making your edits.',
};

export default function Page() {
  return (
    <ToolPageClient 
      title="Identify Fonts in Image" 
      description="Upload an image containing text to match the font style before making your edits." 
    />
  );
}
