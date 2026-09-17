import { createWorker } from 'tesseract.js';
import { DetectedText, OCRProvider } from './types';

export class TesseractOCRProvider implements OCRProvider {
  name = 'Tesseract.js';

  async detectText(imageUrl: string): Promise<DetectedText[]> {
    try {
      // In a real production scenario, we'd load specific language data efficiently
      const worker = await createWorker('eng');
      
      const ret = await worker.recognize(imageUrl, {}, { blocks: true });
      await worker.terminate();

      // Transform Tesseract boxes into our unified DetectedText interface
      const detectedTexts: DetectedText[] = [];
      
      const blocks = (ret.data as any).blocks || [];
      blocks.forEach((block: any) => {
        block.paragraphs?.forEach((para: any) => {
          para.lines?.forEach((line: any, index: number) => {
            // Only keep lines with decent confidence (lowered to 10 to catch stylized text)
            if (line.confidence > 10 && line.text.trim().length > 0) {
              detectedTexts.push({
                id: `text-${Date.now()}-${detectedTexts.length}-${index}`,
                text: line.text.trim(),
                bbox: {
                  x: line.bbox.x0,
                  y: line.bbox.y0,
                  width: line.bbox.x1 - line.bbox.x0,
                  height: line.bbox.y1 - line.bbox.y0,
                },
                confidence: line.confidence,
              });
            }
          });
        });
      });

      return detectedTexts;
    } catch (error) {
      console.error('OCR Error:', error);
      throw new Error('Failed to detect text in image');
    }
  }
}

// Export a default instance
export const defaultOCRProvider = new TesseractOCRProvider();
