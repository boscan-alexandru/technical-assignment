import { useState, useEffect } from "react";
import io from "socket.io-client";
import { getToken, getUser } from "../utils/auth";
import ChatInput from "./ChatInput";
import ChatList from "./ChatList";
import ChatHeader from "./ChatHeader";
import { useNotifications } from "@/hooks/useNotifications";
import { useFileUpload } from "@/hooks/useFileUpload";

import { useSelector, useDispatch } from "react-redux";
import { addMessage, setMessages } from "../slices/chatSlice";
import {
  selectMessages,
  selectChatInput,
  clearChatInput,
} from "../slices/chatSlice";
import { get } from "http";
import useFetchMessages from "@/hooks/useFetchMessages";

const socket = io(process.env.NEXT_PUBLIC_WS_URL || "http://localhost:3000");

const Room = ({ room, messageReceived, deselectRoom }) => {
  const inputMessage = useSelector(selectChatInput);

  const { messages, loading, error } = useFetchMessages(room.id);

  const dispatch = useDispatch();
  const { notify } = useNotifications();
  const { upload } = useFileUpload();

  useEffect(() => {
    socket.emit("join", room.id);

    socket.on("message", (message) => {
      // add the message to state only if the user that is not the sender
      if (message.userId !== getUser().id) {
        // emit an event to parent component to update the UI
        messageReceived({ id: message.userId, email: message.email });

        // add the message to state
        dispatch(addMessage(message));

        // Send notification
        if (message.typeId === 1) {
          notify(message.body);
        }

        if (message.typeId === 2) {
          notify(`${getUser().email} sent you an image!`);
        }
      }
    });

    return () => {
      socket.off("message");
      socket.emit("leave", room.id);
    };
  }, [room, dispatch, notify, messageReceived]);

  const sendMessage = async (message, attachment) => {
    let chatMessage = {
      body: message,
      typeId: 1, // 1 => text messages, 2 => image messages
      roomId: room.id,
      token: getToken(),
      user: getUser().id,
    };

    if (attachment) {
      const { id, url } = await upload(attachment);
      chatMessage.attachmentId = id;
      chatMessage.attachment = {
        id: id,
        url: url,
      };
      chatMessage.typeId = 2; // 2 => image messages
    }

    socket.emit("message", chatMessage);
    dispatch(addMessage(chatMessage));
    dispatch(clearChatInput());
  };

  return (
    <div className="chat-list">
      <ChatHeader text={room.name} handleBack={deselectRoom} />
      <ChatList messages={messages} users={room.users} />
      <ChatInput onSendMessage={sendMessage} />
    </div>
  );
};

export default Room;
