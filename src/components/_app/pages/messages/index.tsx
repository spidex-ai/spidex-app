import { useScrollAnchor } from '@/hooks/useScrollAnchor';
import React, { useEffect } from 'react'

interface Props {
  messages: any[]; 
  messageClassName?: string;
}

const ChatMessages: React.FC<Props> = ({ messages }) => {
  const { scrollRef, messagesRef, scrollToBottom } = useScrollAnchor();
  useEffect(() => {
    scrollToBottom();
}, [messages, scrollToBottom]);

  return (
    <div className="flex-1 h-0 flex flex-col w-full overflow-y-auto max-w-full no-scrollbar" ref={scrollRef}>
            <div className="messages-container" ref={messagesRef}>
                
            </div>
        </div>
  )
}

export default ChatMessages



export const Message = () => {
    return null;
}
