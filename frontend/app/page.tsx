"use client";

import { useState } from "react";
import axios from "axios";

export default function Translator() {
  const [text, setText] = useState("");
  const [translation, setTranslation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    setLoading(true);
    setTranslation("");
    try {
      const response = await axios.post("http://localhost:8000/translate", {
        text,
      });
      setTranslation(response.data.translation);
    } catch (err) {
      setTranslation("Error translating text.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // prevent newline
      handleTranslate();  // trigger translation
    }
    // Shift+Enter naturally goes to next line (no need to handle it)
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center gap-6 bg-gray-100">
      <div className="max-w-xl w-full p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold">Hausa ↔ English Translator</h2>
        <textarea
          className="mt-4 w-full h-32 p-2 border rounded"
          placeholder="Enter text to translate..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <p className="text-sm text-gray-500 mt-1">
          Press <kbd className="px-1 py-0.5 border rounded bg-gray-200">Enter</kbd> to translate, or <kbd className="px-1 py-0.5 border rounded bg-gray-200">Shift + Enter</kbd> for a new line.
        </p>
        <button
          className={`mt-4 px-4 py-2 bg-blue-600 text-white rounded transition hover:bg-blue-700 hover:cursor-pointer ${
            loading ? "opacity-50 pointer-events-none" : ""
          }`}
          onClick={handleTranslate}
          disabled={loading}
        >
          {loading ? "Translating..." : "Translate"}
        </button>
      </div>

      {translation && (
        <div className="max-w-xl w-full p-4 bg-white rounded-lg shadow">
          <h3 className="text-md font-semibold">Translation:</h3>
          <p className="mt-2">{translation}</p>
        </div>
      )}
    </div>
  );
}
