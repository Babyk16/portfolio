import { useState } from "react";
import { useDropzone } from "react-dropzone";

const categories = [
  { id: 1, name: "Portrait" },
  { id: 2, name: "Landscape" },
  { id: 3, name: "Abstract" },
];

export default function Admin() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    },
  });

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategoryId("");
    setFile(null);
    setPreview(null);
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/upload`, {
      method: "POST",
      body: formData,
    });

    return res.json();
  };

  const removeImage = () => {
    setFile(null);
    setPreview(null);
  };

  const handleSubmit = async () => {
    if (!file || !title || !categoryId) return;

    setLoading(true);

    try {
      // 1. Upload to backend → Cloudinary
      const uploadResult = await uploadImage(file);
      const imageUrl = uploadResult.url;

      // 2. Save to database
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/artworks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          category_id: Number(categoryId),
          image_url: imageUrl,
        }),
      });

      resetForm();
      alert("Artwork uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-zinc-900 rounded-2xl p-10 border border-zinc-800">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-light text-zinc-100">Artwork Upload</h1>
          <p className="text-zinc-400 mt-1">Review before publishing</p>
        </div>

        <div className="space-y-6">
          {/* Title */}
          <input
            placeholder="Artwork title"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Description */}
          <textarea
            placeholder="Artwork description"
            rows={4}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* Category */}
          <select
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}>
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Image Review Section */}
          {!preview ? (
            <div
              {...getRootProps()}
              className={`rounded-xl border-2 border-dashed px-6 py-10 text-center cursor-pointer transition
                ${
                  isDragActive
                    ? "border-zinc-400 bg-zinc-800"
                    : "border-zinc-700 hover:border-zinc-500"
                }`}>
              <input {...getInputProps()} />
              <p className="text-zinc-400">
                Drag & drop artwork here, or click to browse
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-xl overflow-hidden border border-zinc-700">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full object-cover max-h-[400px]"
                />
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-400">{file?.name}</span>
                <button
                  onClick={removeImage}
                  className="text-zinc-300 hover:text-white underline">
                  Change image
                </button>
              </div>
            </div>
          )}

          {/* Publish */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full rounded-full bg-zinc-100 text-zinc-900 py-3 hover:bg-white transition">
            {loading ? "Uploading..." : "Publish Artwork"}
          </button>
        </div>
      </div>
    </div>
  );
}
