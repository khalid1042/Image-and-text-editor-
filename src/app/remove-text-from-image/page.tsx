import { EditorLayout } from "@/components/editor/EditorLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Remove Text From Image Online | AI Eraser | TextEdit.ai",
  description: "Seamlessly remove or erase text from images online. Our AI accurately fills the background so it looks like the text was never there.",
};

export default function RemoveTextFromImagePage() {
  // Since we share the EditorLayout, it works as the main app.
  return <EditorLayout />;
}
