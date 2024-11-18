import { useEffect, useState } from "react";

export default function useChat(data: any[][]) {
  const [chat, setChat] = useState<any[]>(data);

  return {
    chat,
    setChat,
  };
}
