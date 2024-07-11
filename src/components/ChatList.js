import Image from "next/image";
import Message from "./Message";
import MessageAvatar from "./MessageAvatar";
import { useEffect } from "react";

const ChatList = ({ messages, users }) => {
  const list_container = document.getElementById("list-container");

  useEffect(() => {
    if (list_container) {
      list_container.scrollTo(0, list_container.scrollHeight);
    }
  }, [messages, list_container]);

  return (
    <div id="list-container" className="chat-list-container">
      <div
        className="chat-background z-1"
        style={{ backgroundImage: "url(/images/bg.webp)" }}
      />
      <div className="chat-backdrop z-2" />
      <div className="grid gap-3 h-fit">
        {messages.map((message, index) => (
          <div className="message-container z-3" key={index}>
            {message.user.avatar ? (
              <MessageAvatar image_src={message.user.avatar} />
            ) : (
              <MessageAvatar />
            )}
            <Message
              content={message.body}
              attachment={message.attachment}
              type={message.typeId}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default ChatList;
