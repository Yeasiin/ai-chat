import { create } from "zustand";
import { persist } from "zustand/middleware";

import { produce } from "immer";

type AddNewMessage = { role: "user" | "model"; prompt: string };

type MessageType = { role: "user" | "model"; parts: { text: string }[] };

type ChatStore = {
   history: MessageType[];
   addMessageToHistory: (arg: AddNewMessage) => void;
};
export const useChatStore = create<ChatStore>()(
   persist(
      (set) => ({
         history: [],
         addMessageToHistory: ({ role, prompt }) =>
            set(
               produce((state: ChatStore) => {
                  state.history.push({ role, parts: [{ text: prompt }] });
               })
            ),
      }),
      { name: "chat-storage" }
   )
);
