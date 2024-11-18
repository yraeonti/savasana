import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createChatRpc = "create_and_return_chat";
export const editChatRpc = "edit_and_return_chat";
