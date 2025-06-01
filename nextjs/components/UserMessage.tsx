import React, { useEffect, useState } from 'react';
import styles from '@styles/chat.module.css';
import { Message } from '@customTypes/MessageTypes';

interface UserMessageProps {
  message: Message;
}

const UserMessage: React.FC<UserMessageProps> = ({ message }) => {
  const [displayedText, setDisplayedText] = useState<string>('');
  const { content, isStreaming } = message;

  useEffect(() => {
    if (!isStreaming) {
      setDisplayedText(content);
      return;
    }
    let index = 0;
    setDisplayedText('');
    const interval = setInterval(() => {
      if (index < content.length) {
        setDisplayedText((prev) => prev + content.charAt(index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [content, isStreaming]);

  return (
    <div className={styles.userContainer}>
      <div className={styles.userBubble}>
        <p>{displayedText}</p>
        {isStreaming && <span className={styles.streamingCursor}></span>}
      </div>
    </div>
  );
};

export default UserMessage;
