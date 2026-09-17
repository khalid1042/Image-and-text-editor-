const fs = require('fs');
const path = require('path');

const toolPages = [
  {
    dir: 'edit-text-in-image',
    title: 'Edit Text in Image Online Free with AI',
    desc: 'Upload your image below to seamlessly change, replace, or remove text without Photoshop.',
  },
  {
    dir: 'change-text-in-image',
    title: 'Change Text in Image',
    desc: 'Easily change words, correct typos, or update prices in your photos and graphics.',
  },
  {
    dir: 'remove-text-from-image',
    title: 'Remove Text from Image',
    desc: 'Erase unwanted words, captions, or dates from your images and let our AI reconstruct the background.',
  },
  {
    dir: 'image-to-text',
    title: 'Image to Text (OCR)',
    desc: 'Upload an image to automatically detect and extract readable text from it using our advanced OCR.',
  },
  {
    dir: 'edit-text-in-screenshot',
    title: 'Edit Text in Screenshot',
    desc: 'Fix typos, change messages, or edit UI text inside existing screenshots effortlessly.',
  },
  {
    dir: 'change-image-background',
    title: 'Change Image Background',
    desc: 'Remove the existing background from your image and replace it with a new color or design.',
  },
  {
    dir: 'remove-background-from-image',
    title: 'Remove Background from Image',
    desc: 'Instantly strip away the background from any photo or graphic, leaving a clean transparent canvas.',
  },
  {
    dir: 'identify-fonts',
    title: 'Identify Fonts in Image',
    desc: 'Upload an image containing text to match the font style before making your edits.',
  }
];

toolPages.forEach(page => {
  const p = path.join('src/app', page.dir);
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
  
  const content = `import type { Metadata } from 'next';
import { ToolPageClient } from '@/components/home/ToolPageClient';

export const metadata: Metadata = {
  title: '${page.title} | photext.ai',
  description: '${page.desc}',
};

export default function Page() {
  return (
    <ToolPageClient 
      title="${page.title}" 
      description="${page.desc}" 
    />
  );
}
`;
  fs.writeFileSync(path.join(p, 'page.tsx'), content);
});
