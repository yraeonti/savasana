"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { createChat } from "@/actions";
import TextInput from "./text-input";

interface Props {
  chat: any[];
  setChat: (chat: any) => void;
}

export default function PromptInput({ chat, setChat }: Props) {
  const [prompt, setPrompt] = useState("");
  const [expandArea, setExpandArea] = useState(false);

  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = async (prompt: string) => {
    setIsCreating(true);
    const newChat = await createChat(prompt);
    setIsCreating(false);
    setPrompt("");

    setChat([...chat, [newChat]]);
  };
  return (
    <div
      className={cn(
        "sticky w-11/12 sm:w-3/5 rounded-e-full rounded-s-full overflow-hidden flex items-center mx-auto bg-[#323232D5] gap-x-2 px-3",
        chat.length < 1 ? "my-auto" : "bottom-10"
      )}
    >
      <TextInput
        prompt={prompt}
        expandArea={expandArea}
        setPrompt={setPrompt}
        setExpandArea={setExpandArea}
      />

      <div
        className={cn(
          "p-2 size-9 bg-white cursor-pointer",
          !prompt && "opacity-35 cursor-default"
        )}
        style={{
          borderRadius: "50%",
        }}
        onClick={() => (!prompt || isCreating ? {} : handleCreate(prompt))}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill=""
          className={cn("size-5 fill-primary")}
        >
          <path
            fillRule="evenodd"
            d="M11.47 2.47a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06l-6.22-6.22V21a.75.75 0 0 1-1.5 0V4.81l-6.22 6.22a.75.75 0 1 1-1.06-1.06l7.5-7.5Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}
