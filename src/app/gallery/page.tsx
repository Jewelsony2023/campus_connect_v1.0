"use client";
import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function GalleryPage() {
  const [images, setImages] = useState<string[]>([]);

  // Load all images from Cloudinary on mount
  useEffect(() => {
    fetch("/api/gallery")
      .then((r) => r.json())
      .then(setImages);
  }, []);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) setImages((prev) => [...prev, data.url]);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { "image/*": [] } });

  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-50 via-neutral-100 to-neutral-200 text-neutral-900 px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-semibold tracking-tight mb-8">Gallery</h1>

        <div {...getRootProps()} className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition ${isDragActive ? "bg-indigo-50 border-indigo-400" : "border-neutral-300"}`}>
          <input {...getInputProps()} />
          {isDragActive ? <p>Drop images here...</p> : <p>Drag & drop images, or click to select</p>}
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {images.map((url) => (
            <img key={url} src={url} alt="Gallery" className="rounded-2xl shadow-lg" />
          ))}
        </div>
      </div>
    </main>
  );
}