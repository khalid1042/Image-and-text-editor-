import { removeBackground } from '@imgly/background-removal';

/**
 * Removes the background from the given image URL or Blob.
 * Uses @imgly/background-removal for in-browser AI processing.
 * 
 * @param sourceUrl - The original image URL
 * @returns A promise that resolves to the URL of the transparent foreground image
 */
export async function removeImageBackground(sourceUrl: string): Promise<string> {
  try {
    let imageSource: Blob | string = sourceUrl;
    
    // If it's a relative URL or absolute HTTP URL (not a data URI or blob URI), fetch it first
    if (sourceUrl.startsWith('/') || sourceUrl.startsWith('http')) {
      const response = await fetch(sourceUrl);
      if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);
      imageSource = await response.blob();
    }

    // The library returns a Blob containing the image with a transparent background
    const imageBlob = await removeBackground(imageSource);
    
    // Create an object URL from the blob so it can be loaded into an Image element or Canvas
    const url = URL.createObjectURL(imageBlob);
    
    return url;
  } catch (error) {
    console.error("Failed to remove background:", error);
    throw error;
  }
}
