import React from 'react';
import { Message } from '@customTypes/MessageTypes';
import AgentMessage from '@components/AgentMessage';
import UserMessage from '@components/UserMessage';

interface ConversationListProps {
  messages: Message[];
}

const ConversationList: React.FC<ConversationListProps> = ({ messages }) => {
  return (
    <div>
      {messages.map((msg) =>
        msg.role === 'agent' ? (
          <AgentMessage key={msg.id} message={msg} />
        ) : (
          <UserMessage key={msg.id} message={msg} />
        )
      )}
    </div>
  );
};

export default ConversationList;
