import type { Metadata } from 'next';
import { GuideLayout } from '@/components/home/GuideLayout';

export const metadata: Metadata = {
  title: 'How to Edit Text in an Image Online (Free AI Tool)',
  description: 'Learn how to easily edit, change, or replace text inside any JPG or PNG image online. Our AI automatically matches the font and restores the background.',
};

export default function GuidePage() {
  return (
    <GuideLayout title="How to Edit Text in an Image (Without Photoshop)">
      <p style={{ marginBottom: '1.5rem' }}>Have you ever finalized a beautiful poster, flyer, or social media graphic, only to realize there is a glaring typo? If you no longer have the original project file, fixing that mistake can feel impossible.</p>
      
      <p style={{ marginBottom: '1.5rem' }}>Trying to paint over the old text usually leaves an ugly, obvious smudge. But you don't need to be a professional graphic designer or own expensive software to fix it. In this guide, you will learn how to easily replace, change, or edit text in any image using AI—while keeping the original background perfectly intact.</p>

      <h2 style={{ fontSize: '2rem', margin: '2rem 0 1rem' }}>The Challenge of Editing Flattened Images</h2>
      <p style={{ marginBottom: '1.5rem' }}>When you save a design as a JPG, PNG, or WebP file, the image becomes "flattened." The text is no longer a separate layer; it becomes baked into the pixels of the background.</p>
      
      <p style={{ marginBottom: '1.5rem' }}>Traditional image editors force you to handle this manually. You have to use a clone stamp tool to painstakingly rebuild the background behind the text, guess the original font, and manually type the new text over the patched area. It is incredibly time-consuming and rarely looks perfect.</p>
      
      <p style={{ marginBottom: '1.5rem' }}>Today, AI-powered tools like photext.ai solve both of these problems simultaneously using two technologies: Optical Character Recognition (OCR) to read the words, and AI Inpainting to magically rebuild the background behind them.</p>

      <h2 style={{ fontSize: '2rem', margin: '2rem 0 1rem' }}>How to Change Text in an Image in 3 Steps</h2>
      <p style={{ marginBottom: '1.5rem' }}>You can edit the text in any photo, screenshot, or graphic directly in your web browser. Here is how to do it for free.</p>

      <h3 style={{ fontSize: '1.5rem', margin: '1.5rem 0 1rem' }}>Step 1: Upload Your Image and Detect Text</h3>
      <p style={{ marginBottom: '1.5rem' }}>Start by dragging and dropping your image into the photext.ai editor. The tool supports standard formats like JPG, PNG, and WebP.</p>
      <p style={{ marginBottom: '1.5rem' }}>Once your image loads, click the <strong>Detect Text with OCR</strong> button in the left toolbar. The AI will instantly scan your image and draw selectable bounding boxes around every readable word or paragraph. You don't need to manually trace the letters.</p>

      <h3 style={{ fontSize: '1.5rem', margin: '1.5rem 0 1rem' }}>Step 2: Select and Replace the Words</h3>
      <p style={{ marginBottom: '1.5rem' }}>Click on the bounding box containing the text you want to change. A properties panel will slide up, showing the original text.</p>
      <p style={{ marginBottom: '1.5rem' }}>Simply delete the old text in the input box and type your new message. Try to keep your replacement text roughly the same length as the original for the most natural-looking result.</p>

      <h3 style={{ fontSize: '1.5rem', margin: '1.5rem 0 1rem' }}>Step 3: Match the Font and Download</h3>
      <p style={{ marginBottom: '1.5rem' }}>When you apply the new text, the AI does the heavy lifting. It seamlessly erases the old letters, reconstructs the background texture (whether it's a solid color, a sky, or a complex pattern), and renders your new text.</p>
      <p style={{ marginBottom: '1.5rem' }}>The editor will attempt to match the original font's weight, color, and style. If it doesn't look quite right, you can use the properties panel to manually tweak the font family, adjust the size, or change the color. Once you are happy with the result, click <strong>Download</strong> to save your newly edited image.</p>

      <h2 style={{ fontSize: '2rem', margin: '2rem 0 1rem' }}>When to Use an AI Text Editor</h2>
      <p style={{ marginBottom: '1.5rem' }}>An AI text editor is the fastest workflow for several common scenarios:</p>
      <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem', lineHeight: '1.8' }}>
        <li><strong>Fixing typos</strong> in completed graphics.</li>
        <li><strong>Updating dates and prices</strong> on promotional flyers or restaurant menus.</li>
        <li><strong>Translating</strong> a sign or advertisement into a different language.</li>
        <li><strong>Editing UI screenshots</strong> for tutorials or mockups.</li>
      </ul>
      <p style={{ marginBottom: '1.5rem', fontStyle: 'italic', color: 'var(--text-secondary)' }}>Note: Always ensure you have the legal right or permission to modify the images, documents, or screenshots you are uploading.</p>
    </GuideLayout>
  );
}
