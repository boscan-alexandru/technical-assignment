import { selectTheme } from "@/slices/globalSettingsSlice";
import { useSelector } from "react-redux";

const ChatHeader = ({ text, handleBack }) => {
  const theme = useSelector(selectTheme);
  return (
    <div className={`chat-header${theme} z-3`}>
      <button className={`back-button ${theme}`} onClick={handleBack}>
        <svg className="icon-sm send-icon">
          <use href="images/icons.svg#back-icon" />
        </svg>
      </button>
      <h2>{text}</h2>
    </div>
  );
};

export default ChatHeader;
