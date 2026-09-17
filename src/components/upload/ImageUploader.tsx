"use client";

import { useRef } from "react";
import { useEditorStore } from "@/lib/store/editorStore";
import { useRouter } from "next/navigation";
import styles from "./ImageUploader.module.css";
import { UploadCloud } from "lucide-react";

export function ImageUploader() {
  const router = useRouter();
  const setOriginalImage = useEditorStore((state) => state.setOriginalImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file (JPG, PNG, WEBP)");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert("File is too large. Max 10MB allowed.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setOriginalImage(e.target.result as string);
        router.push("/edit-text-in-image"); // PRD SEO route
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div 
      className={`glass-panel ${styles.dropzone}`}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onClick={() => fileInputRef.current?.click()}
    >
      <div className={styles.dropzoneContent}>
        <UploadCloud className={styles.uploadIcon} size={48} />
        <h3>Drop your image here</h3>
        <p>or</p>
        <button className={styles.uploadBtn}>Upload Image</button>
        <p className={styles.formats}>JPG, PNG, WEBP (Max 10MB)</p>
      </div>
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/jpeg, image/png, image/webp" 
        className={styles.hiddenInput}
      />
    </div>
  );
}
