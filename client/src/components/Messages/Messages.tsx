import { FC } from "react";
import Message from "./Message";
import AudioRecorderElement from "../AudioRecorder/AudioRecorderElement";
import { IoIosSend } from "react-icons/io";

type MessageType = {
  sendMessage: string;
  username: string;
  time: string;
  voice_message: boolean;
  file?: File | null;
  src?: string | undefined;
};

interface MessagesProps {
  message: string;
  messages: MessageType[];
  handleSendMessage: Function;
  addAudioElement: (blob: Blob) => void;
  setMessage: Function;
  username: string;
}

const Messages: FC<MessagesProps> = ({
  message,
  messages,
  handleSendMessage,
  addAudioElement,
  setMessage,
  username,
}) => {
  return (
    <div className="messages-container">
      <ul>
        {messages && (messages.map((msg, i) => (
          <Message
            id={msg.username + i}
            message={msg.sendMessage}
            username={msg.username}
            userSend={username}
            time={msg.time}
            voice_message={msg.voice_message}
            src={msg.src}
          /> 
        )))}
     
      </ul>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
      >
        <input
          type="text"
          placeholder="Type your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <AudioRecorderElement addAudioElement={addAudioElement} />
        <button type="submit">
          <IoIosSend />
        </button>
      </form>
    </div>
  );
};

export default Messages;
