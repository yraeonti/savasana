import ChatInterface from "@/components/chat-interface";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("chat")
    .select(
      "id, prompt, response, createdat, editpromptid, chat(id, prompt, response, createdat, editpromptid)"
    )
    .is("editpromptid", null)
    .order("createdat", { ascending: true });

  const computedData =
    (data &&
      data.map((ch) => {
        const innerChats = ch.chat;

        return [ch, ...innerChats];
      })) ||
    [];

  return (
    <div className="flex flex-col items-center pt-10 w-full min-h-full px-2 pb-11">
      <ChatInterface data={computedData} />
    </div>
  );
}
