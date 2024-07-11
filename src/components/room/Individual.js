import { useSelector } from "react-redux";
import MessageAvatar from "../MessageAvatar";
import { selectTheme } from "@/slices/globalSettingsSlice";

const Individual = ({
  roomId,
  roomName,
  roomImage,
  roomLastMessage,
  onSelected,
}) => {
  const theme = useSelector(selectTheme);
  return (
    <li
      className={`room-list-item${theme} list-padding`}
      onClick={() => onSelected(roomId)}
    >
      <MessageAvatar image_src={roomImage} alt_text={roomName} size={50} />
      <div className={`room-info ${theme}`}>
        <span className="room-name">{roomName}</span>

        <span className="room-last-message">{roomLastMessage}</span>
      </div>
    </li>
  );
};

export default Individual;
