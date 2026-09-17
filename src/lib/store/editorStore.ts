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

  history: string[];
  historyIndex: number;
  isHistoryUpdating: boolean;
  saveHistoryState: () => void;
  undo: () => void;
  redo: () => void;
  
  panelsVisible: boolean;
  setPanelsVisible: (visible: boolean) => void;
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
    link.click();
    document.body.removeChild(link);
  },

  history: [],
  historyIndex: -1,
  isHistoryUpdating: false,
  
  panelsVisible: true,
  setPanelsVisible: (visible) => set({ panelsVisible: visible }),

  saveHistoryState: () => {
    clearTimeout((window as any).historyTimeout);
    (window as any).historyTimeout = setTimeout(() => {
      const { canvas, history, historyIndex, isHistoryUpdating } = get();
      if (!canvas || isHistoryUpdating) return;
      
      // Save state with custom properties
      const state = JSON.stringify(canvas.toJSON(['id', 'textData', 'selectable', 'evented', 'crossOrigin', 'name']));
      
      // If the state is the same as the current one, ignore
      if (historyIndex >= 0 && history[historyIndex] === state) return;

      // Remove any future history if we are branched off
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(state);
      
      // Limit history to 50 states to prevent memory bloat
      if (newHistory.length > 50) {
        newHistory.shift();
      }
      
      set({
        history: newHistory,
        historyIndex: newHistory.length - 1
      });
    }, 150);
  },

  undo: () => {
    const { canvas, history, historyIndex } = get();
    if (!canvas || historyIndex <= 0) return; // Cannot undo past the first state
    
    const newIndex = historyIndex - 1;
    const state = history[newIndex];
    
    set({ isHistoryUpdating: true });
    
    canvas.loadFromJSON(JSON.parse(state)).then(() => {
      canvas.renderAll();
      set({ historyIndex: newIndex, isHistoryUpdating: false });
    }).catch((err: any) => {
      console.error("Undo failed", err);
      set({ isHistoryUpdating: false });
    });
  },

  redo: () => {
    const { canvas, history, historyIndex } = get();
    if (!canvas || historyIndex >= history.length - 1) return;
    
    const newIndex = historyIndex + 1;
    const state = history[newIndex];
    
    set({ isHistoryUpdating: true });
    
    canvas.loadFromJSON(JSON.parse(state)).then(() => {
      canvas.renderAll();
      set({ historyIndex: newIndex, isHistoryUpdating: false });
    }).catch((err: any) => {
      console.error("Redo failed", err);
      set({ isHistoryUpdating: false });
    });
  }
}));
