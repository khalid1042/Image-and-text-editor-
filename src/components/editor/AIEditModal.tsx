"use client";

import React, { useState } from "react";
import styles from "./AIEditModal.module.css";
import { X, Sparkles, Loader2, ArrowRight } from "lucide-react";

interface AIEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalText: string;
  onApply: (newText: string) => void;
}

const QUICK_PROMPTS = [
  "Fix grammar and spelling",
  "Make it sound more professional",
  "Make it punchier and shorter",
  "Translate to Spanish",
  "Translate to French",
];

export function AIEditModal({ isOpen, onClose, originalText, onApply }: AIEditModalProps) {
  const [prompt, setPrompt] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async (customPrompt?: string) => {
    const promptToUse = customPrompt || prompt;
    if (!promptToUse.trim()) return;

    setIsGenerating(true);
    setError(null);

    try {
      const res = await fetch("/api/ai-edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          originalText,
          prompt: promptToUse,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate text");
      }

      setGeneratedText(data.result);
      if (customPrompt) {
        setPrompt(customPrompt);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApply = () => {
    if (generatedText) {
      onApply(generatedText);
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeBtn} onClick={onClose}>
          <X size={20} />
        </button>

        <div className={styles.header}>
          <Sparkles size={24} className={styles.icon} />
          <h2>AI Text Edit</h2>
        </div>

        <div className={styles.body}>
          <div className={styles.section}>
            <label>Original Text</label>
            <div className={styles.textDisplay}>{originalText}</div>
          </div>

          <div className={styles.section}>
            <label>What would you like the AI to do?</label>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                placeholder="e.g. Translate to Japanese, Make it rhyme..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                className={styles.input}
              />
              <button 
                className={styles.generateBtn} 
                onClick={() => handleGenerate()}
                disabled={isGenerating || !prompt.trim()}
              >
                {isGenerating ? <Loader2 size={18} className={styles.spinner} /> : "Generate"}
              </button>
            </div>
          </div>

          <div className={styles.quickPrompts}>
            {QUICK_PROMPTS.map((qp, idx) => (
              <button 
                key={idx} 
                className={styles.quickPromptBtn}
                onClick={() => handleGenerate(qp)}
                disabled={isGenerating}
              >
                {qp}
              </button>
            ))}
          </div>

          {error && <div className={styles.error}>{error}</div>}

          {generatedText && (
            <div className={styles.resultSection}>
              <div className={styles.arrowContainer}>
                <ArrowRight size={20} className={styles.arrow} />
              </div>
              <div className={styles.section}>
                <label>Generated Result</label>
                <div className={styles.textDisplay} style={{ borderColor: 'var(--accent-primary)', backgroundColor: 'rgba(79, 70, 229, 0.05)' }}>
                  {generatedText}
                </div>
              </div>
              
              <button className={styles.applyBtn} onClick={handleApply}>
                Apply to Canvas
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
