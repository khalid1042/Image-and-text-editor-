import { EditorLayout } from "@/components/editor/EditorLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Text in Image Online | TextEdit.ai",
  description: "Use our AI-powered online editor to easily change, remove, or replace text in any image in seconds. No Photoshop needed.",
};

export default function EditTextInImagePage() {
  return (
    <EditorLayout />
  );
}
