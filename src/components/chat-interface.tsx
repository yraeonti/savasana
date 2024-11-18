"use client";
import { useEffect, useState } from "react";
import PromptInput from "./prompt-input";
import useChat from "@/hooks/use-chat";
import { cn } from "@/lib/utils";
import TextInput from "./text-input";
import { editChat } from "@/actions";
import { IChat } from "@/types/database.dto";

interface Props {
  data: IChat[][];
}

enum ToggleType {
  forward = "forward",
  backward = "backward",
  last = "last",
}

export default function ChatInterface({ data }: Props) {
  const { chat, setChat } = useChat(data);

  return (
    <>
      <section className="w-11/12 sm:w-3/5 mx-auto">
        {chat.map((ch, i) => {
          return (
            <div key={i}>
              <ChatUI chat={ch} setChat={setChat} index={i} />
            </div>
          );
        })}
      </section>

      <PromptInput chat={chat} setChat={setChat} />
    </>
  );
}

const ChatUI = ({
  chat,
  setChat,
  index,
}: {
  chat: any[];
  setChat: (chat: any) => void;
  index: number;
}) => {
  const max = chat.length;

  const realMax = chat.length - 1;

  const [cur, setCur] = useState(0);

  const [toggleEditInput, setToggleEditInput] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [prompt, setPrompt] = useState("");
  const [expandArea, setExpandArea] = useState(false);

  const handleTogglePrompt = (max: number, type: ToggleType) => {
    const computedMax = max - 1;
    setCur((prev) => {
      console.log(prev);

      const value =
        type == "forward"
          ? prev + 1
          : type == "backward"
          ? prev - 1
          : computedMax;

      const newValue =
        value > computedMax ? computedMax : value < 0 ? 0 : value;

      return newValue;
    });
  };

  const handleEditChat = async (prompt: string, editpromptid: number) => {
    setIsEditing(true);
    const editedChat = (await editChat(prompt, editpromptid)) as IChat | null;

    setPrompt("");

    if (editedChat) {
      setChat((prev: IChat[][]) => {
        const copy = [...prev];
        copy[index] = [...copy[index], editedChat];
        return copy;
      });
      setToggleEditInput(false);
      handleTogglePrompt(max + 1, ToggleType.last);
    }

    setIsEditing(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className={cn("self-end", toggleEditInput && "w-full")}>
        <div className="flex items-center mr-0 gap-x-3 group">
          {!toggleEditInput && (
            <div
              className={cn(
                "invisible cursor-pointer rounded-full group-hover:visible hover:bg-[#323232D5] size-8 flex justify-center items-center"
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={cn("size-4")}
                onClick={() => {
                  setPrompt(chat[cur].prompt);
                  setToggleEditInput(true);
                }}
              >
                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
              </svg>
            </div>
          )}

          {toggleEditInput ? (
            <div className="flex flex-col gap-3 rounded-xl bg-[#323232D5] py-4 px-5 w-full">
              <TextInput
                prompt={prompt}
                expandArea={expandArea}
                setPrompt={setPrompt}
                setExpandArea={setExpandArea}
              />

              <div className="flex items-center justify-end gap-4">
                <button
                  className="bg-black/70 rounded-e-full rounded-s-full py-2 px-3 text-sm"
                  onClick={() => {
                    setToggleEditInput(false);
                  }}
                >
                  Cancel
                </button>

                <button
                  className="bg-white rounded-e-full rounded-s-full text-black py-2 px-3 text-sm"
                  disabled={isEditing}
                  onClick={() => {
                    handleEditChat(prompt, chat[0]["id"]);
                  }}
                >
                  Send
                </button>
              </div>
            </div>
          ) : (
            <div
              className="bg-[#323232D5] py-2 px-5 whitespace-normal 
                          font-medium text-base rounded-e-2xl 
                          rounded-s-2xl max-w-[90%] 
                          min-w-56"
            >
              <p>{chat[cur].prompt}</p>
            </div>
          )}
        </div>

        {realMax > 0 && (
          <div className="flex items-center gap-x-1 float-right mt-2 mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={cn(
                "size-4 cursor-pointer",
                cur == 0 && "opacity-35 cursor-default"
              )}
              onClick={() => handleTogglePrompt(max, ToggleType.backward)}
            >
              <path
                fillRule="evenodd"
                d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
                clipRule="evenodd"
              />
            </svg>

            <p className="text-sm font-medium">
              {cur + 1}/{max}
            </p>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={cn(
                "size-4 cursor-pointer",
                cur == realMax && "opacity-35 cursor-default"
              )}
              onClick={() => handleTogglePrompt(max, ToggleType.forward)}
            >
              <path
                fillRule="evenodd"
                d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>

      <div
        className="px-2 py-9 whitespace-normal
                  font-medium text-base rounded-e-xl rounded-s-xl
                  lg:max-w-[91%] max-w-[97%] border border-black/5 flex gap-2"
      >
        <div className="rounded-full size-10 justify-self-start">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223ZM8.25 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z"
              clipRule="evenodd"
            />
          </svg>
        </div>{" "}
        <p>{chat[cur].response}</p>
      </div>
    </div>
  );
};
