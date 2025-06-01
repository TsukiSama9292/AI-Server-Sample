"use client";

import React, { useEffect, useState } from 'react';
import ConversationList from '@components/ConversationList';
import { Message } from '@customTypes/MessageTypes';
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const initialMsg: Message[] = [
      {
        id: uuidv4(),
        role: 'user',
        content: '你好，請問今天有什麼推薦？'
      },
      {
        id: uuidv4(),
        role: 'agent',
        content: '我正在為您查詢推薦資訊……',
        isStreaming: true
      }
    ];
    setMessages(initialMsg);

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.role === 'agent'
            ? { ...msg, content: '您好，我為您推薦今日特價活動：XX產品 7 折優惠。', isStreaming: false }
            : msg
        )
      );
    }, 2000);
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: '16px 0' }}>聊天範例</h1>
      <ConversationList messages={messages} />
    </div>
  );
}
