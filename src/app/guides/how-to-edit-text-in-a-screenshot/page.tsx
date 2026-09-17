import type { Metadata } from 'next';
import { GuideLayout } from '@/components/home/GuideLayout';

export const metadata: Metadata = {
  title: 'How to Edit Text in a Screenshot | photext.ai',
  description: 'A quick guide to modifying text, fixing typos, or updating messages in screenshots.',
};

export default function GuidePage() {
  return (
    <GuideLayout title="How to Edit Text in a Screenshot">
      
      <p style={{ marginBottom: '1.5rem' }}>Screenshots are the most common images people need to edit. Whether you are creating a tutorial, updating a UI mockup, or fixing a typo in a chat log, editing a screenshot needs to look pixel-perfect.</p>
      <h2 style={{ fontSize: '2rem', margin: '2rem 0 1rem' }}>Why use an AI Editor?</h2>
      <p style={{ marginBottom: '1.5rem' }}>Standard editors will leave mismatched fonts and obvious background patches. Our tool automatically detects the system fonts used in the screenshot.</p>
      <h2 style={{ fontSize: '2rem', margin: '2rem 0 1rem' }}>Editing the Screenshot</h2>
      <p style={{ marginBottom: '1.5rem' }}>Just upload your screenshot and click on the text you want to change. Type your new message, and the tool will match the exact size, weight, and color of the original UI element. It's the fastest way to generate perfect mockups.</p>
    
    </GuideLayout>
  );
}
