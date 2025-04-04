"use client";

import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectItem } from "@/components/ui/select";

export default function Translator() {
  const [text, setText] = useState("");
  const [translation, setTranslation] = useState("");
  const [direction, setDirection] = useState("eng2hau");

  const translateText = async () => {
    if (!text) return;
    
    try {
      const response = await axios.post(
        "https://api-inference.huggingface.co/models/Ahmadala/hausa_eng_model",
        { inputs: text },
        {
          headers: {
            Authorization: `Bearer YOUR_HUGGINGFACE_API_KEY`,
          },
        }
      );
      setTranslation(response.data[0]?.translation_text || "Translation failed");
    } catch (error) {
      console.error("Translation error:", error);
      setTranslation("Error in translation");
    }
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-4">
      <div className="w-full max-w-lg p-4 border rounded-lg shadow-md">
        <h2 className="text-lg font-semibold">Translator</h2>

        <label className="block mt-4 text-sm">Input Text</label>
        <Input
          placeholder="Text to translate"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <label className="block mt-4 text-sm">Translation Direction</label>
        <Select value={direction} onValueChange={setDirection}>
          <SelectItem value="eng2hau">English to Hausa</SelectItem>
          <SelectItem value="hau2eng">Hausa to English</SelectItem>
        </Select>

        <div className="flex gap-4 mt-4">
          <Button onClick={() => setText("")} variant="outline">Clear</Button>
          <Button onClick={translateText} className="bg-orange-400">Submit</Button>
        </div>
      </div>

      <div className="w-full max-w-lg p-4 border rounded-lg shadow-md">
        <h3 className="text-sm font-semibold">Translation Result</h3>
        <p className="mt-2 p-2 border rounded bg-gray-100">{translation}</p>
      </div>
    </div>
  );
}
