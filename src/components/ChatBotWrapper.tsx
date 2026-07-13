"use client";

import dynamic from "next/dynamic";

const ChatBotInner = dynamic(() => import("@/components/ChatBot"), {
  ssr: false,
});

export default function ChatBotWrapper() {
  return <ChatBotInner />;
}
