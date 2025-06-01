// src/components/AgentMessage.tsx
import React from 'react';
import styles from '@styles/chat.module.css';
import { Message } from '@customTypes/MessageTypes';

interface AgentMessageProps {
  message: Message;
}

const AgentMessage: React.FC<AgentMessageProps> = ({ message }) => {
  return (
    <div className={styles.agentContainer}>
      <div className={styles.agentBubble}>
        <p>
          {message.content}
          {message.isStreaming && <span className={styles.streamingCursor}>▌</span>}
        </p>
      </div>
    </div>
  );
};

export default AgentMessage;
