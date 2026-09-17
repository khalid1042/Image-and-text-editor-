import type { Metadata } from 'next';
import { ToolPageClient } from '@/components/home/ToolPageClient';

export const metadata: Metadata = {
  title: 'Edit Text in Screenshot | photext.ai',
  description: 'Fix typos, change messages, or edit UI text inside existing screenshots effortlessly.',
};

export default function Page() {
  return (
    <ToolPageClient 
      title="Edit Text in Screenshot" 
      description="Fix typos, change messages, or edit UI text inside existing screenshots effortlessly." 
    />
  );
}
