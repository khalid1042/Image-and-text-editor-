"use client";

import React from "react";
import { EditorLayout } from "@/components/editor/EditorLayout";
import { ImageUploader } from "@/components/upload/ImageUploader";
import { useEditorStore } from "@/lib/store/editorStore";

interface ToolPageClientProps {
  title: string;
  description: string;
}

export function ToolPageClient({ title, description }: ToolPageClientProps) {
  const { originalImage } = useEditorStore();

  if (originalImage) {
    return <EditorLayout />;
  }

  return (
    <div style={{ padding: '4rem 2rem', textAlign: 'center', maxWidth: '800px', margin: '0 auto', minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 800 }}>{title}</h1>
      <p style={{ marginBottom: '3rem', fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
        {description}
      </p>
      <ImageUploader redirectPath="" />
    </div>
  );
}
