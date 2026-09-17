import type { Metadata } from 'next';
import { ToolPageClient } from '@/components/home/ToolPageClient';

export const metadata: Metadata = {
  title: 'Edit Text in Image Online Free with AI | photext.ai',
  description: 'Upload your image below to seamlessly change, replace, or remove text without Photoshop.',
};

export default function Page() {
  return (
    <ToolPageClient 
      title="Edit Text in Image Online Free with AI" 
      description="Upload your image below to seamlessly change, replace, or remove text without Photoshop." 
    />
  );
}
