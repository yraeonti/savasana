import { IChat } from "@/types/database.dto";
import { useEffect, useState } from "react";

export default function useChat(data: IChat[][]) {
  const [chat, setChat] = useState<typeof data>(data);

  return {
    chat,
    setChat,
  };
}
