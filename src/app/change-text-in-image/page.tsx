import type { Metadata } from 'next';
import { ToolPageClient } from '@/components/home/ToolPageClient';

export const metadata: Metadata = {
  title: 'Change Text in Image | photext.ai',
  description: 'Easily change words, correct typos, or update prices in your photos and graphics.',
};

export default function Page() {
  return (
    <ToolPageClient 
      title="Change Text in Image" 
      description="Easily change words, correct typos, or update prices in your photos and graphics." 
    />
  );
}
