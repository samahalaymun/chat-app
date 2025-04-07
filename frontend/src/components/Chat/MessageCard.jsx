import React, { useEffect, useRef } from "react";
import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";
import { formatMessageTime } from "../../lib/utils";

function MessageCard({ message }) {
  const { selectedUser, messages } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div
      className={`chat  ${
        message.senderId === authUser._id ? "chat-end" : "chat-start"
      }`}
      key={message._id}
      ref={messageEndRef}
    >
      <div className="chat-image avatar">
        <div className="size-10 rounded-full border">
          <img
            alt="profile pic"
            src={
              message.senderId === authUser._id
                ? authUser.profilePic || "/avatar.png"
                : selectedUser.profilePic || "/avatar.png"
            }
          />
        </div>
      </div>

      <div className="chat-header mb-1">
        <time className="text-xs opacity-50 ml-1">
          {formatMessageTime(message.createdAt)}
        </time>
      </div>

      <div
        className={`chat-bubble flex flex-col ${
          message.senderId === authUser._id ? "chat-bubble-primary" : ""
        }`}
      >
        {message.image && (
          <img
            src={message.image}
            alt="Attachment"
            className="sm:max-w-[200px] rounded-md mb-2"
          />
        )}
        {message.text && <p>{message.text}</p>}
      </div>
    </div>
  );
}

export default MessageCard;
