// stores/useChatStore.ts
"use client";
import { create } from "zustand";

interface Message {
  sender: "me" | "driver";
  text: string;
  time: string;
}

interface Chat {
  driverId: string;
  driverName: string;
  driverAvatar: string;
  messages: Message[];
}

interface ChatStore {
  chats: Chat[];
  openChat: (driverId: string, driverName: string, driverAvatar: string) => void;
  sendMessage: (driverId: string, message: Message) => void;
  getChat: (driverId: string) => Chat | undefined;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  chats: [],
  openChat: (driverId, driverName, driverAvatar) => {
    const { chats } = get();
    const exists = chats.find((c) => c.driverId === driverId);
    if (!exists) {
      set({
        chats: [
          ...chats,
          { driverId, driverName, driverAvatar, messages: [] },
        ],
      });
    }
  },
  sendMessage: (driverId, message) => {
    set((state) => ({
      chats: state.chats.map((c) =>
        c.driverId === driverId
          ? { ...c, messages: [...c.messages, message] }
          : c
      ),
    }));
  },
  getChat: (driverId) => get().chats.find((c) => c.driverId === driverId),
}));
