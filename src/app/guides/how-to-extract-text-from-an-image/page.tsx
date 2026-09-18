import type { Metadata } from 'next';
import { GuideLayout } from '@/components/home/GuideLayout';

import Image from 'next/image';

export const metadata: Metadata = {
  title: 'How to Extract Text from an Image Online (Free OCR)',
  description: 'Learn how to easily copy and extract text from any photo, screenshot, or scanned document using our free AI OCR tool.',
};

export default function GuidePage() {
  return (
    <GuideLayout title="How to Extract Text from an Image (Fast & Free)">
      <p style={{ marginBottom: '1.5rem' }}>We've all experienced the frustration of receiving a photo of a document, a screenshot of an address, or a picture of a Wi-Fi password. You can't just highlight and copy the text; you have to painstakingly retype every single letter manually.</p>
      
      <p style={{ marginBottom: '1.5rem' }}>Fortunately, you don't need to do that anymore. With modern Optical Character Recognition (OCR) technology, you can instantly extract and copy the text from any image directly in your browser. In this guide, we'll show you how to do it in seconds.</p>

      <div style={{ margin: '2rem 0', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
        <Image 
          src="/images/extract_text_ocr.png" 
          alt="Glowing blue bounding boxes identifying and extracting printed text from a paper document using Optical Character Recognition" 
          width={800} 
          height={400} 
          layout="responsive" 
        />
      </div>

      <h2 style={{ fontSize: '2rem', margin: '2rem 0 1rem' }}>What is Image-to-Text Extraction?</h2>
      <p style={{ marginBottom: '1.5rem' }}>Image-to-text extraction relies on a technology called OCR (Optical Character Recognition). When you upload an image, the OCR engine analyzes the pixels, identifies the shapes of letters and numbers, and converts those shapes back into raw, editable digital text.</p>
      
      <p style={{ marginBottom: '1.5rem' }}>This technology used to require expensive, clunky desktop software meant for scanning massive physical archives. Today, AI-powered OCR is built directly into web apps like photext.ai, allowing anyone to extract text from a quick screenshot for free.</p>

      <h2 style={{ fontSize: '2rem', margin: '2rem 0 1rem' }}>How to Copy Text from a Picture</h2>
      <p style={{ marginBottom: '1.5rem' }}>Whether you are using a Mac, Windows PC, or mobile device, extracting text is incredibly simple.</p>

      <h3 style={{ fontSize: '1.5rem', margin: '1.5rem 0 1rem' }}>Step 1: Upload Your Screenshot or Photo</h3>
      <p style={{ marginBottom: '1.5rem' }}>Navigate to the photext.ai editor and upload your image. The clearest results come from high-resolution screenshots, but the AI is smart enough to read text from photographs of physical documents, street signs, and even handwritten notes (if the handwriting is legible).</p>

      <h3 style={{ fontSize: '1.5rem', margin: '1.5rem 0 1rem' }}>Step 2: Run the OCR Detection</h3>
      <p style={{ marginBottom: '1.5rem' }}>Click the <strong>Detect Text with OCR</strong> button in the left panel. The AI will scan the entire image and place editable bounding boxes over every word, sentence, or paragraph it finds.</p>

      <h3 style={{ fontSize: '1.5rem', margin: '1.5rem 0 1rem' }}>Step 3: Copy and Paste</h3>
      <p style={{ marginBottom: '1.5rem' }}>Click on the text box you want to extract. The properties panel will open on the right side of the screen, displaying the raw text. Simply highlight it, press <code>Ctrl+C</code> (or <code>Cmd+C</code> on Mac), and paste it into your notes, email, or Word document!</p>

      <h2 style={{ fontSize: '2rem', margin: '2rem 0 1rem' }}>Common Use Cases for OCR Extraction</h2>
      <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem', lineHeight: '1.8' }}>
        <li><strong>Digitizing Notes:</strong> Take a picture of meeting whiteboard notes and convert them into text for an email summary.</li>
        <li><strong>Copying Unselectable Text:</strong> Sometimes websites or PDFs disable copying. Taking a screenshot and running it through an OCR tool bypasses this restriction.</li>
        <li><strong>Translating Physical Signs:</strong> Take a picture of a foreign menu or street sign, extract the text, and paste it into Google Translate.</li>
        <li><strong>Data Entry:</strong> Quickly pull names, addresses, or serial numbers from photographs of physical forms.</li>
      </ul>
      
      <p style={{ marginBottom: '1.5rem', fontStyle: 'italic', color: 'var(--text-secondary)' }}>Pro Tip: If you need to extract text from multiple images, organize them into a single folder on your desktop so you can quickly drag and drop them one by one into the editor.</p>
    </GuideLayout>
  );
}
