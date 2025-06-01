// components/AgentMessage.tsx
import React, { useEffect, useState } from 'react';
import styles from '@styles/chat.module.css';
import { Message } from '@customTypes/MessageTypes';

interface AgentMessageProps {
  message: Message;
}

const AgentMessage: React.FC<AgentMessageProps> = ({ message }) => {
  const [displayedText, setDisplayedText] = useState<string>('');
  const { content, isStreaming } = message;

  useEffect(() => {
    // 如果不是流式生成，直接顯示完整內容
    if (!isStreaming) {
      setDisplayedText(content);
      return;
    }

    // 若是流式，逐字顯示
    let index = 0;
    setDisplayedText('');
    const interval = setInterval(() => {
      if (index < content.length) {
        setDisplayedText((prev) => prev + content.charAt(index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50); // 每 50ms 顯示一個字符，可依照需求調整速度

    return () => clearInterval(interval);
  }, [content, isStreaming]);

  return (
    <div className={styles.agentContainer}>
      <div className={styles.agentBubble}>
        <p>{displayedText}</p>
        {isStreaming && <span className={styles.streamingCursor}>▌</span>}
      </div>
    </div>
  );
};

export default AgentMessage;
