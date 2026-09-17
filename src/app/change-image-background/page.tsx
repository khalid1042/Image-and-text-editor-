import { EditorLayout } from "@/components/editor/EditorLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Change Image Background Online | Add New Background | TextEdit.ai",
  description: "Remove the background from your image and add a new solid color or photo background instantly. 100% free online tool.",
};

export default function ChangeBackgroundPage() {
  return <EditorLayout />;
}
