"use server";
import { createClient } from "@/lib/supabase/server";
import { createChatRpc, editChatRpc } from "@/lib/utils";

export const createChat = async (prompt: string) => {
  const supabase = await createClient();

  const response = `This is a response to the create prompt: ${prompt}`;

  const { data, error } = await supabase.rpc(createChatRpc, {
    prompt_input: prompt,
    response_input: response,
  });

  if (error) {
    console.log("error", error);
  }

  return data;
};

export const editChat = async (prompt: string, editpromptid: number) => {
  const supabase = await createClient();

  const response = `This is a response to the edit prompt: ${prompt}`;

  const { data, error } = await supabase.rpc(editChatRpc, {
    prompt_input: prompt,
    response_input: response,
    promt_id_input: editpromptid,
  });

  if (error) {
    console.log("error", error);
  }

  return data;
};
