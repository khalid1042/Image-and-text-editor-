import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { ImageUploader } from "@/components/upload/ImageUploader";
import { SampleImages } from "@/components/upload/SampleImages";

export default function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoText}>photext.ai</span>
        </div>
        <nav className={styles.nav}>
          <Link href="/edit-text-in-image">Edit Text</Link>
          <Link href="/remove-text-from-image">Remove Text</Link>
          <Link href="/remove-background-from-image">Remove BG</Link>
          <Link href="/change-image-background">Change BG</Link>
          <Link href="/guides">Guides</Link>
        </nav>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.h1}>Edit Text in Image Online with AI</h1>
          <p className={styles.subtitle}>
            Instantly replace, remove, or change text in any photo, screenshot, or graphic. No design skills required.
          </p>
          
          <div className={styles.uploadArea}>
            <ImageUploader />
            <SampleImages />
          </div>
        </section>

        <section className={styles.content}>
          <h2 className={styles.h2}>Edit Any Text in an Image in Seconds</h2>
          <p>Whether you need to change a price tag, translate a sign, or fix a typo in a screenshot, our AI understands the text and restores the background seamlessly.</p>
          
          <div className={styles.features}>
            <div className={styles.featureCard}>
              <h3>Upload Your Image</h3>
              <p>Drag and drop any JPG, PNG, or WEBP file.</p>
            </div>
            <div className={styles.featureCard}>
              <h3>Select the Text</h3>
              <p>Our AI automatically detects text regions. Just click what you want to edit.</p>
            </div>
            <div className={styles.featureCard}>
              <h3>Change or Replace</h3>
              <p>Type your new text. The AI matches the font and restores the background.</p>
            </div>
            <div className={styles.featureCard}>
              <h3>Download</h3>
              <p>Export your high-quality edited image instantly.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2026 photext.ai. All rights reserved.</p>
      </footer>
    </div>
  );
}
