"use client";

import { useEffect, useState } from "react";

interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState("");

  const fetchNotes = async () => {
    const res = await fetch("/api/notes", { cache: "no-store" });
    setNotes(await res.json());
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const saveNote = async () => {
    const url = editId ? `/api/notes/${editId}` : "/api/notes";
    const method = editId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    setTitle("");
    setContent("");
    setEditId(null);
    setShowModal(false);
    fetchNotes();
  };

  const deleteNote = async (id: string) => {
    await fetch(`/api/notes/${id}`, { method: "DELETE" });
    setToast("Note deleted successfully");
    fetchNotes();
    setTimeout(() => setToast(""), 3000);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-black">My Notes</h1>
          <p className="text-gray-500">
            Create, manage, and organize your notes
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-black text-white px-5 py-2 rounded-lg hover:opacity-90"
        >
          + New Note
        </button>
      </div>

      {/* EMPTY STATE */}
      {notes.length === 0 && (
        <div className="bg-white rounded-xl border p-20 text-center text-black">
          <div className="mx-auto w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-4xl mb-4">
            +
          </div>
          <h2 className="text-xl font-semibold text-black">No notes yet</h2>
          <p className="text-gray-500 mb-4">
            Get started by creating your first note
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-black text-white px-6 py-2 rounded-lg"
          >
            + Create Note
          </button>
        </div>
      )}

      {/* NOTES GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <div
            key={note._id}
            className="bg-white p-5 rounded-xl border hover:shadow-md transition"
          >
            <div className="flex justify-between items-start">
              <h2 className="font-semibold text-lg text-black">{note.title}</h2>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setEditId(note._id);
                    setTitle(note.title);
                    setContent(note.content);
                    setShowModal(true);
                  }}
                >
                  ✏️
                </button>
                <button onClick={() => deleteNote(note._id)}>🗑️</button>
              </div>
            </div>

            <p className="text-gray-600 mt-3">{note.content}</p>
            <p className="text-xs text-gray-400 mt-4">
              {new Date(note.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-xl p-6 relative">
            <h2 className="text-xl font-semibold mb-4 text-black">
              {editId ? "Edit Note" : "Create New Note"}
            </h2>

            <label className="text-sm font-medium text-black">Title</label>
            <input
              className="w-full border p-3 rounded-lg mb-4 text-black placeholder-black"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title..."
            />

            <label className="text-sm font-medium text-black">Content</label>
            <textarea
              className="w-full border p-3 rounded-lg mb-6 h-32 text-black placeholder-black"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter note content..."
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg border text-black"
              >
                Cancel
              </button>
              <button
                onClick={saveNote}
                className="px-5 py-2 bg-black text-white rounded-lg"
              >
                {editId ? "Update Note" : "Create Note"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div className="fixed top-6 right-6 bg-white shadow-lg px-5 py-3 rounded-lg border flex items-center gap-2">
          ✅ {toast}
        </div>
      )}
    </main>
  );
}
