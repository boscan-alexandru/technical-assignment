import { selectTheme } from "@/slices/globalSettingsSlice";
import Image from "next/image";
import { useSelector } from "react-redux";

const Message = ({ content, type, attachment }) => {
  const attachment_src = attachment ? attachment.url : "/images/broken.svg";
  const theme = useSelector(selectTheme);
  return (
    <div className={`message${theme} z-2`}>
      {type === 1 && <pre className="text-message-container">{content}</pre>}
      {type === 2 && (
        <div className={`image-message-container${theme}`}>
          <Image
            className="image-message"
            src={attachment_src}
            width={200}
            height={200}
            alt="sent image"
          />
          <pre className="text-message-container">{content}</pre>
        </div>
      )}
      {type === 3 && <pre className="text-message-container">{attachment}</pre>}
    </div>
  );
};
export default Message;
