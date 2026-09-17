import type { Metadata } from 'next';
import { ToolPageClient } from '@/components/home/ToolPageClient';

export const metadata: Metadata = {
  title: 'Remove Background from Image | photext.ai',
  description: 'Instantly strip away the background from any photo or graphic, leaving a clean transparent canvas.',
};

export default function Page() {
  return (
    <ToolPageClient 
      title="Remove Background from Image" 
      description="Instantly strip away the background from any photo or graphic, leaving a clean transparent canvas." 
    />
  );
}
