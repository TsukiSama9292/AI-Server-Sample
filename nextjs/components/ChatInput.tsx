// src/components/ChatInput.tsx
'use client';

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Message } from '@customTypes/MessageTypes';

interface ChatInputProps {
  onMessage: (message: Message) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onMessage }) => {
  const [question, setQuestion] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (!question.trim()) return;

    setIsSending(true);
    const id = uuidv4();
    // 1) 先把使用者的訊息送到上層，role: 'user'
    onMessage({
      id,
      role: 'user',
      content: question,
      isStreaming: false
    });

    let accumulated = '';
    let buffer = '';

    try {
      const response = await fetch('http://localhost:60080/api/chat/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'text/event-stream',
        },
        body: JSON.stringify({ question }),
      });

      if (!response.body) {
        throw new Error('No response body');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunkText = decoder.decode(value, { stream: true });
        buffer += chunkText;

        const parts = buffer.split('\n\n');
        for (let i = 0; i < parts.length - 1; i++) {
          const line = parts[i].trim();
          if (line.startsWith('data:')) {
            const jsonStr = line.slice(5).trim();
            if (jsonStr) {
              let parsed;
              try {
                parsed = JSON.parse(jsonStr);
              } catch {
                continue;
              }
              if (parsed.status === 'streaming') {
                accumulated += parsed.context;
                onMessage({
                  id: id + '-agent', // agent message 用不同 id
                  role: 'agent',
                  content: accumulated,
                  isStreaming: true,
                });
              } else if (parsed.status === 'done') {
                onMessage({
                  id: id + '-agent', // agent message 用不同 id
                  role: 'agent',
                  content: accumulated,
                  isStreaming: false,
                });
              }
            }
          }
        }
        buffer = parts[parts.length - 1];
      }
    } catch (error) {
      console.error('Error in SSE fetch:', error);
    } finally {
      setIsSending(false);
      setQuestion('');
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="輸入您的問題..."
        className="flex-1 border border-gray-300 rounded px-4 py-2"
        disabled={isSending}
      />
      <button
        onClick={handleSend}
        disabled={!question.trim() || isSending}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        傳送
      </button>
    </div>
  );
};

export default ChatInput;
