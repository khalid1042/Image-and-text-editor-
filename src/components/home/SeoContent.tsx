import React from "react";
import styles from "@/app/page.module.css";
import Link from "next/link";

export function SeoContent() {
  return (
    <>
      <section className={styles.content} style={{ marginTop: '4rem', maxWidth: '800px', margin: '4rem auto', padding: '0 1rem' }}>
        <h2 className={styles.h2} style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '2rem' }}>Edit Text in an Image in Seconds</h2>
        <p style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>
          Editing text in a finished image can be difficult when you no longer have the original design file. Our AI image text editor helps you work directly with JPG, PNG, and WebP images.
        </p>
        <p style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>
          Upload your image and let the tool detect the visible text. Select the words you want to change, enter the replacement text, and generate your edited image.
        </p>
        <p style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>
          The surrounding background can be reconstructed so the new text fits naturally into the image.
        </p>
        <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>Use it to:</p>
        <ul style={{ paddingLeft: '1.5rem', marginBottom: '2.5rem', lineHeight: 1.8 }}>
          <li>Change text in a photo</li>
          <li>Replace words in an image</li>
          <li>Fix a typo in a screenshot</li>
          <li>Update a price on a product image</li>
          <li>Change a date on a poster</li>
          <li>Edit text on a graphic</li>
          <li>Update labels and headings</li>
          <li>Remove unwanted text</li>
          <li>Prepare images for different languages</li>
        </ul>

        <h2 className={styles.h2} style={{ marginTop: '2.5rem', marginBottom: '1rem', fontSize: '1.75rem' }}>How to Edit Text in an Image</h2>
        
        <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1.25rem' }}>1. Upload your image</h3>
        <p style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>Upload a JPG, PNG, or WebP image. You can use a photo, screenshot, poster, advertisement, product image, or other graphic.</p>
        
        <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1.25rem' }}>2. Detect the text</h3>
        <p style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>The tool analyzes the image and identifies visible text areas. Select the text you want to change.</p>
        
        <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1.25rem' }}>3. Enter your new text</h3>
        <p style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>Replace the original words with your new text. Keep the wording short and clear for the best result.</p>
        
        <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1.25rem' }}>4. Match the original style</h3>
        <p style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>The editor can use the existing visual style as a reference, including font appearance, size, color, spacing, and position.</p>
        
        <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1.25rem' }}>5. Download your edited image</h3>
        <p style={{ marginBottom: '2.5rem', lineHeight: 1.6 }}>Review the result and download the finished image when you are satisfied with the edit.</p>

        <h2 className={styles.h2} style={{ marginTop: '2.5rem', marginBottom: '1rem', fontSize: '1.75rem' }}>Change Text in Photos</h2>
        <p style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>Sometimes the text you need to change is already part of a photo.</p>
        <p style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>You may want to update a visible label, correct a spelling mistake, change a short message, or replace text on a promotional image.</p>
        
        <div style={{ margin: '2rem 0', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
          <img src="/images/edit_text_before_after.png" alt="Before and after comparison of editing text in an image" style={{ width: '100%', height: 'auto', display: 'block' }} />
        </div>

        <p style={{ marginBottom: '2.5rem', lineHeight: 1.6 }}>Instead of recreating the entire image, use the image text editor to focus on the specific text that needs to change.</p>

        <h2 className={styles.h2} style={{ marginTop: '2.5rem', marginBottom: '1rem', fontSize: '1.75rem' }}>Edit Text in Screenshots</h2>
        <p style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>Screenshots often contain text that is difficult to edit because the words are already flattened into the image.</p>
        <p style={{ marginBottom: '0.5rem', lineHeight: 1.6 }}>You can use the tool to work with text in:</p>
        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', lineHeight: 1.8 }}>
          <li>Website screenshots</li>
          <li>App screenshots</li>
          <li>UI mockups</li>
          <li>Chat screenshots</li>
          <li>Tutorials</li>
          <li>Social media screenshots</li>
          <li>Software interfaces</li>
        </ul>
        <p style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>Upload the screenshot, select the text area, make your change, and review the result.</p>
        <p style={{ marginBottom: '2.5rem', lineHeight: 1.6, fontStyle: 'italic', color: 'var(--text-secondary)' }}>Only edit screenshots and images that you own or have permission to modify.</p>

        <h2 className={styles.h2} style={{ marginTop: '2.5rem', marginBottom: '1rem', fontSize: '1.75rem' }}>Replace Text in an Image</h2>
        <p style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>Need to change an existing word or phrase?</p>
        <p style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>The replace-text workflow lets you identify the original text and provide replacement text.</p>
        <p style={{ marginBottom: '0.5rem', lineHeight: 1.6 }}>For example:</p>
        <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', fontFamily: 'monospace' }}>
          <strong>Original:</strong><br />
          SUMMER SALE<br /><br />
          <strong>New:</strong><br />
          WINTER SALE
        </div>
        <p style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>The goal is to change the wording while keeping the surrounding image intact.</p>
        <p style={{ marginBottom: '2.5rem', lineHeight: 1.6 }}>This can be useful for posters, product graphics, menus, advertisements, thumbnails, and social media designs.</p>

        <h2 className={styles.h2} style={{ marginTop: '2.5rem', marginBottom: '1rem', fontSize: '1.75rem' }}>Remove Text from an Image</h2>
        <p style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>You can also remove unwanted text from an image.</p>
        <p style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>Select the text area you want to remove and let the editor reconstruct the area behind it.</p>
        
        <div style={{ margin: '2rem 0', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
          <img src="/images/remove_text_before_after.png" alt="Before and after of removing text from an image using AI" style={{ width: '100%', height: 'auto', display: 'block' }} />
        </div>

        <p style={{ marginBottom: '0.5rem', lineHeight: 1.6 }}>This can help clean up:</p>
        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', lineHeight: 1.8 }}>
          <li>Captions</li>
          <li>Labels</li>
          <li>Dates</li>
          <li>Prices</li>
          <li>Headings</li>
          <li>Decorative text</li>
          <li>Unwanted words</li>
        </ul>
        <p style={{ marginBottom: '2.5rem', lineHeight: 1.6, fontStyle: 'italic', color: 'var(--text-secondary)' }}>For copyrighted watermarks or other ownership markings, only remove them when you have the appropriate rights or permission.</p>

        <h2 className={styles.h2} style={{ marginTop: '2.5rem', marginBottom: '1rem', fontSize: '1.75rem' }}>AI Text Detection for Images</h2>
        <p style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>The editor uses text detection to identify words inside an uploaded image.</p>
        <p style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>This makes it easier to find the text you want to edit instead of manually drawing around every letter.</p>
        
        <div style={{ margin: '2rem 0', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
          <img src="/images/extract_text_ocr.png" alt="Visual representation of OCR text extraction from a document" style={{ width: '100%', height: 'auto', display: 'block' }} />
        </div>

        <p style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>Text detection can be useful for photos, screenshots, posters, advertisements, product graphics, and other images containing readable text.</p>
        <p style={{ marginBottom: '2.5rem', lineHeight: 1.6 }}>For difficult images, recognition may be less accurate when text is extremely small, blurry, distorted, handwritten, or heavily blended into the background.</p>

        <h2 className={styles.h2} style={{ marginTop: '2.5rem', marginBottom: '1rem', fontSize: '1.75rem' }}>Match Text Style in Your Image</h2>
        <p style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>Replacing words is not only about changing the letters. The replacement also needs to fit the surrounding design.</p>
        <p style={{ marginBottom: '0.5rem', lineHeight: 1.6 }}>Our editor is designed to help match characteristics such as:</p>
        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', lineHeight: 1.8 }}>
          <li>Font appearance</li>
          <li>Text size</li>
          <li>Text color</li>
          <li>Weight</li>
          <li>Spacing</li>
          <li>Alignment</li>
          <li>Position</li>
          <li>Rotation</li>
          <li>Background appearance</li>
        </ul>
        <p style={{ marginBottom: '2.5rem', lineHeight: 1.6 }}>This helps the replacement text look more consistent with the original image.</p>

        <h2 className={styles.h2} style={{ marginTop: '2.5rem', marginBottom: '1rem', fontSize: '1.75rem' }}>What Can You Use the Image Text Editor For?</h2>
        
        <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1.25rem' }}>Posters and Flyers</h3>
        <p style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>Update dates, event names, headlines, or short promotional messages without recreating the complete poster.</p>
        
        <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1.25rem' }}>Product Images</h3>
        <p style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>Change labels, prices, or short promotional text on product graphics.</p>
        
        <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1.25rem' }}>Social Media Graphics</h3>
        <p style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>Correct typos or update short text on existing social media images.</p>
        
        <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1.25rem' }}>Screenshots</h3>
        <p style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>Fix visible wording in screenshots and UI images that you are authorized to edit.</p>
        
        <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1.25rem' }}>Menus</h3>
        <p style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>Update selected menu prices or item names when you have permission to modify the design.</p>
        
        <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1.25rem' }}>Advertisements</h3>
        <p style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>Change short promotional messages, dates, or offers in existing advertising graphics.</p>
        
        <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1.25rem' }}>Presentations</h3>
        <p style={{ marginBottom: '2.5rem', lineHeight: 1.6 }}>Update text contained in exported presentation images when the original editable file is unavailable.</p>

        <h2 className={styles.h2} style={{ marginTop: '2.5rem', marginBottom: '1rem', fontSize: '1.75rem' }}>Why Use an AI Image Text Editor?</h2>
        <p style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>Traditional image editors are powerful, but changing text that has already been flattened into a JPG or PNG can require several manual steps.</p>
        <p style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>An AI image text editor is designed specifically for this situation.</p>
        <p style={{ marginBottom: '0.5rem', lineHeight: 1.6 }}>You can:</p>
        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', lineHeight: 1.8 }}>
          <li>Upload an existing image</li>
          <li>Detect text automatically</li>
          <li>Select the text</li>
          <li>Replace or remove it</li>
          <li>Reconstruct the background</li>
          <li>Adjust the result</li>
          <li>Download the finished image</li>
        </ul>
        <p style={{ marginBottom: '2.5rem', lineHeight: 1.6 }}>This makes small image-text changes much faster than rebuilding an entire design.</p>

        <h2 className={styles.h2} style={{ marginTop: '2.5rem', marginBottom: '1rem', fontSize: '1.75rem' }}>Edit Text in JPG, PNG, and WebP Images</h2>
        <p style={{ marginBottom: '0.5rem', lineHeight: 1.6 }}>The tool supports common image formats including:</p>
        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', lineHeight: 1.8 }}>
          <li>JPG</li>
          <li>JPEG</li>
          <li>PNG</li>
          <li>WebP</li>
        </ul>
        <p style={{ marginBottom: '2.5rem', lineHeight: 1.6 }}>You can use the editor for photos, screenshots, posters, graphics, product images, and other supported image files.</p>

        <h2 className={styles.h2} style={{ marginTop: '2.5rem', marginBottom: '1rem', fontSize: '1.75rem' }}>Frequently Asked Questions</h2>
        
        <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1.15rem' }}>Can I edit text in an image online?</h3>
        <p style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>Yes. Upload a supported image, detect or select the text you want to change, enter your replacement text, and generate the edited image directly in your browser.</p>
        
        <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1.15rem' }}>Can I change text in a photo?</h3>
        <p style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>Yes. You can use the tool to change selected text that is already part of a photo, provided the image is suitable for editing.</p>
        
        <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1.15rem' }}>Can I edit text in a screenshot?</h3>
        <p style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>Yes. The tool is designed to work with text contained in screenshots, including website, application, and interface screenshots.</p>
        
        <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1.15rem' }}>Can I replace text in an image without Photoshop?</h3>
        <p style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>Yes. An online AI image text editor can handle many common text replacement tasks directly in your browser without requiring Photoshop or another desktop design application.</p>
        
        <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1.15rem' }}>Can I remove text from an image?</h3>
        <p style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>Yes. Select the text area you want to remove and use the text-removal or background-reconstruction workflow.</p>
        
        <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1.15rem' }}>Does the tool detect text automatically?</h3>
        <p style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>The editor can detect text regions in supported images, making it easier to select the words you want to edit.</p>
        
        <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1.15rem' }}>Can I change the font of text in an image?</h3>
        <p style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>The editor can use the original text appearance as a reference when creating replacement text. Results can vary depending on image quality, font complexity, and background.</p>
        
        <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1.15rem' }}>What images can I edit?</h3>
        <p style={{ marginBottom: '3.5rem', lineHeight: 1.6 }}>You can edit supported JPG, PNG, and WebP images, including photos, screenshots, posters, graphics, and product images.</p>
      </section>

      {/* Explore More Image Editing Tools */}
      <section style={{ maxWidth: '800px', margin: '0 auto 4rem auto', padding: '2rem', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
        <h2 className={styles.h2} style={{ marginBottom: '2rem', fontSize: '1.75rem', textAlign: 'center' }}>Explore More Image Editing Tools</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ background: 'var(--bg-primary)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>
              <Link href="/remove-text-from-image" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>Remove Text from Image</Link>
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>Remove unwanted text from photos, screenshots, and graphics.</p>
          </div>
          
          <div style={{ background: 'var(--bg-primary)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>
              <Link href="/image-to-text" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>Image to Text</Link>
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>Extract readable text from an image using OCR.</p>
          </div>
          
          <div style={{ background: 'var(--bg-primary)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>
              <Link href="/change-image-background" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>Change Image Background</Link>
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>Remove the existing background and replace it with a new one.</p>
          </div>
          
          <div style={{ background: 'var(--bg-primary)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>
              <Link href="/remove-background-from-image" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>Remove Background</Link>
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>Automatically remove the background from an image.</p>
          </div>
          
          <div style={{ background: 'var(--bg-primary)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>
              <Link href="/identify-fonts" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>Identify Fonts</Link>
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>Find or identify a font used in an image.</p>
          </div>
          
          <div style={{ background: 'var(--bg-primary)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>
              <Link href="/edit-text-in-screenshot" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>Edit Text in Screenshot</Link>
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>Change text in an existing screenshot.</p>
          </div>
        </div>
      </section>
    </>
  );
}
