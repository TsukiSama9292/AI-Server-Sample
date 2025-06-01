// src/app/page.tsx
"use client";

import React, { useState } from 'react';
import ConversationList from '@components/ConversationList';
import ChatInput from '@components/ChatInput';
import { Message } from '@customTypes/MessageTypes';

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleNewMessage = (newMsg: Message) => {
    setMessages((prev) => {
      const idx = prev.findIndex((msg) => msg.id === newMsg.id);
      if (idx > -1) {
        // 找到相同 id，更新 content 與 isStreaming
        const copy = [...prev];
        copy[idx] = newMsg;
        return copy;
      } else {
        // 這是一條新訊息，直接 append
        return [...prev, newMsg];
      }
    });
  };

  return (
    <div className="flex flex-col min-h-screen p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Chat with AI</h1>

      {/* 聊天內容滾動區域 */}
      <div className="flex-1 overflow-y-auto mb-4">
        <ConversationList messages={messages} />
      </div>

      {/* 輸入框 + 傳送按鈕 */}
      <div className="border-t pt-4">
        <ChatInput onMessage={handleNewMessage} />
      </div>
    </div>
  );
}
