import Image from "next/image";

const MessageAvatar = ({
  image_src = "/images/avatar.png",
  style = "round",
  size = 30,
  alt_text = "avatar",
}) => {
  return (
    <Image
      className={`message-avatar ${style}`}
      src={image_src}
      width={size}
      height={size}
      alt={alt_text}
    />
  );
};
export default MessageAvatar;
