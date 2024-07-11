import { useState } from "react";
import Image from "next/image";
import FileUpload from "./FileUpload";

import { useSelector, useDispatch } from "react-redux";
import { setChatInput, clearChatInput } from "../slices/chatSlice";
import { selectTheme } from "@/slices/globalSettingsSlice";

const ChatInput = ({ onSendMessage }) => {
  const MAX_ROW = 4;

  const chatInput = useSelector((state) => state.chat.chatInput);

  const dispatch = useDispatch();

  const [attachment, setAttachment] = useState(null);

  const theme = useSelector(selectTheme);

  const handleAttachmentChange = (file) => {
    if (file) {
      setAttachment(file);
    }
  };

  const handleSend = () => {
    onSendMessage(chatInput, attachment);
  };

  const isScrollable = (el) => {
    return el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight;
  };

  const limitRows = (e) => {
    const el = e.target;
    if (isScrollable(el) && MAX_ROW > el.rows) {
      el.rows = el.rows + 1;
    }
    if (!el.value) {
      el.rows = 1;
    }
    el.scrollTo(0, el.scrollHeight);
  };

  return (
    <div className={`chat-input-container${theme} gap-3 z-3`}>
      <FileUpload
        onUploaded={handleAttachmentChange}
        onClear={() => setAttachment(null)}
      />
      <div className="flex items-center w-full">
        <textarea
          className={`chat-input ${theme}`}
          type="text"
          value={chatInput}
          onChange={(e) => dispatch(setChatInput(e.target.value))}
          onInput={(e) => {
            limitRows(e);
          }}
          placeholder="Type a message"
          rows={1}
        />
      </div>
      <button className="send-button" onClick={handleSend}>
        <svg className="icon send-icon">
          <use href="images/icons.svg#send-icon" />
        </svg>
      </button>
    </div>
  );
};
export default ChatInput;
