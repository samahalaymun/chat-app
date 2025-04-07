import React, { useEffect } from "react";
import { useChatStore } from "../../store/useChatStore";
import MessageSkeleton from "../Skeleton/MessageSkeleton";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageCard from "./MessageCard";

function ChatContainer() {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }
  return (
    <div className="flex-1 flex flex-col overflow-auto h-full">
      <ChatHeader />
      <div className="flex overflow-y-auto p-4 space-y-4 flex-col">
        {messages.map((message) => (
          <MessageCard message={message} />
        ))}
      </div>
      <MessageInput />
    </div>
  );
}

export default ChatContainer;
