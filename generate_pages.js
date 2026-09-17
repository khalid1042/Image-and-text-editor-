const fs = require('fs');
const path = require('path');

const dirs = [
  'change-text-in-image',
  'image-to-text',
  'edit-text-in-screenshot',
  'guides/how-to-edit-text-in-an-image',
  'guides/how-to-change-text-in-a-photo',
  'guides/how-to-edit-text-in-a-screenshot',
  'guides/how-to-remove-text-from-an-image',
  'guides/how-to-extract-text-from-an-image',
  'guides/how-to-identify-a-font-from-an-image'
];

dirs.forEach(d => {
  const p = path.join('src/app', d);
  fs.mkdirSync(p, { recursive: true });
  
  const title = d.split('/').pop().split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  
  const content = `import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '${title} | photext.ai',
};

export default function Page() {
  return (
    <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
      <h1>${title}</h1>
      <p style={{ marginTop: '2rem' }}>This page is coming soon!</p>
      <Link href="/" style={{ display: 'inline-block', marginTop: '2rem', color: '#4f46e5' }}>Return to Editor</Link>
    </div>
  );
}
`;
  fs.writeFileSync(path.join(p, 'page.tsx'), content);
});
