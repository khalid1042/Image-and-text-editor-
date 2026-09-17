"use client";

import { useEditorStore } from "@/lib/store/editorStore";
import { useRouter } from "next/navigation";
import styles from "@/app/page.module.css";
import Image from "next/image";

const SAMPLES = [
  { id: 1, src: "/samples/sample1.png", alt: "Sign text sample" },
  { id: 2, src: "/samples/sample2.png", alt: "Screenshot text sample" },
  { id: 3, src: "/samples/sample3.png", alt: "Poster text sample" },
];

export function SampleImages() {
  const router = useRouter();
  const setOriginalImage = useEditorStore((state) => state.setOriginalImage);

  const loadSample = async (src: string) => {
    // In a real app, you might fetch the image and convert to DataURL, 
    // or just set the originalImage to the path if the canvas supports it.
    // FabricJS supports loading from a URL directly.
    setOriginalImage(src);
    router.push("/edit-text-in-image");
  };

  return (
    <div className={styles.samples}>
      <p>Try a Sample:</p>
      <div className={styles.sampleImages}>
        {SAMPLES.map((sample) => (
          <div 
            key={sample.id} 
            className={styles.sampleBox} 
            onClick={() => loadSample(sample.src)}
            style={{ cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", background: "#e2e8f0", padding: "1rem", borderRadius: "8px" }}
          >
            Sample {sample.id}
          </div>
        ))}
      </div>
    </div>
  );
}
