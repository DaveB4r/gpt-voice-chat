import { FC } from "react";

interface MessageProps {
  id: string;
  message: string;
  username: string;
  userSend: string;
  time: string;
  voice_message: boolean;
  src?: string | undefined;
}

const Message: FC<MessageProps> = ({
  id,
  message,
  username,
  userSend,
  time,
  voice_message,
  src,
}) => {
  const whoSend = username !== userSend;

  return (
    <li key={id} className={whoSend ? "recieve" : "sended"} title={time}>
      <div>
        <span>{whoSend ? username : "sended"}</span>
      </div>
      {voice_message && (
        <audio src={src} controls autoPlay={username === "ai_user"}></audio>
      )}
      <p>{message}</p>
      <small>{time}</small>
    </li>
  );
};

export default Message;
