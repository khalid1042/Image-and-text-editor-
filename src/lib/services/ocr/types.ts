export interface DetectedText {
  id: string;
  text: string;
  bbox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  confidence: number;
}

export interface OCRProvider {
  name: string;
  detectText(imageUrl: string): Promise<DetectedText[]>;
}
