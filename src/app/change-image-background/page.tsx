import type { Metadata } from 'next';
import { ToolPageClient } from '@/components/home/ToolPageClient';

export const metadata: Metadata = {
  title: 'Change Image Background | photext.ai',
  description: 'Remove the existing background from your image and replace it with a new color or design.',
};

export default function Page() {
  return (
    <ToolPageClient 
      title="Change Image Background" 
      description="Remove the existing background from your image and replace it with a new color or design." 
    />
  );
}
