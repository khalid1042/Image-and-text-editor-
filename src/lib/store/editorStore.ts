import { create } from 'zustand';
import { DetectedText } from '../services/ocr/types';

export interface EditorState {
  originalImage: string | null;
  setOriginalImage: (image: string | null) => void;
  
  detectedTexts: DetectedText[];
  setDetectedTexts: (texts: DetectedText[]) => void;
  
  isDetecting: boolean;
  setIsDetecting: (isDetecting: boolean) => void;

  selectedObjectId: string | null;
  setSelectedObjectId: (id: string | null) => void;

  canvas: any | null;
  setCanvas: (canvas: any) => void;

  isRemovingBg: boolean;
  setIsRemovingBg: (isRemovingBg: boolean) => void;

  activeTool: 'select' | 'text' | 'background' | 'subject';
  setActiveTool: (tool: 'select' | 'text' | 'background' | 'subject') => void;

  customBackground: string | null;
  setCustomBackground: (bg: string | null) => void;

  backgroundColor: string | null;
  setBackgroundColor: (color: string | null) => void;

  downloadImage: () => void;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  originalImage: null,
  setOriginalImage: (image) => set({ originalImage: image }),
  
  detectedTexts: [],
  setDetectedTexts: (texts) => set({ detectedTexts: texts }),
  
  isDetecting: false,
  setIsDetecting: (isDetecting) => set({ isDetecting }),

  selectedObjectId: null,
  setSelectedObjectId: (id) => set({ selectedObjectId: id }),

  canvas: null,
  setCanvas: (canvas) => set({ canvas }),

  isRemovingBg: false,
  setIsRemovingBg: (isRemovingBg) => set({ isRemovingBg }),

  activeTool: 'select',
  setActiveTool: (tool) => set({ activeTool: tool }),

  customBackground: null,
  setCustomBackground: (bg) => set({ customBackground: bg }),

  backgroundColor: null,
  setBackgroundColor: (color) => set({ backgroundColor: color }),

  downloadImage: () => {
    const { canvas } = get();
    if (!canvas) return;
    
    // Deselect everything so bounding boxes aren't downloaded
    canvas.discardActiveObject();
    canvas.renderAll();

    const zoom = canvas.getZoom() || 1;
    const dataURL = canvas.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 1 / zoom // Export exactly at 1:1 original resolution
    });

    const link = document.createElement('a');
    link.download = `edited-image-${Date.now()}.png`;
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}));
