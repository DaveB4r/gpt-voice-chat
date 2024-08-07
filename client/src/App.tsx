import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import io from "socket.io-client";
import ConnectedUsers from "./components/ConnectedUsers/ConnectedUsers";
import Messages from "./components/Messages/Messages";
import UsernameForm from "./components/UsernameForm";

interface Users {
  id: string;
  username: string;
}

interface Message {
  sendMessage: string;
  username: string;
  time: string;
  voice_message: boolean;
  file?: File | null;
  src?: string | undefined;
}

const App = () => {
  const [messages, setMessages] = useState([] as Message[]);
  const [message, setMessage] = useState("");
  const [connectedUsers, setConnectedUsers] = useState([] as Users[]);
  const [username, setUsername] = useState("");
  const [connected, setConnected] = useState(false);

  const socketClient = useRef<SocketIOClient.Socket>();
  useEffect(() => {
    socketClient.current = io.connect("http://localhost:3000");
    if (socketClient.current) {
      socketClient.current.on("username-submitted-successfully", () => {
        setConnected(true);
      });
      socketClient.current.on("username-taken", () => {
        toast.error("username is taken");
      });
      socketClient.current.on(
        "get-connected-users",
        (connectedUsers: Users[]) => {
          setConnectedUsers(
            connectedUsers.filter((user) => user.username !== username)
          );
        }
      );
      socketClient.current.on("receive-message", (message: Message) => {
        setMessages((prev) => [...prev, message]);
      });
    }
    return () => {
      socketClient.current?.disconnect();
      socketClient.current = undefined;
    };
  }, [username]);

  const handleConnection = () => {
    if (socketClient.current) {
      socketClient.current.emit("handle-connection", username);
    }
  };

  const handleSendMessage = (blob?: Blob) => {
    if (socketClient.current) {
      const now = new Date().toLocaleDateString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const sendMessage = blob ? "" : message;
      const time = now.toString();
      const voice_message = blob ? true : false;
      const file = blob ? new File([blob], "audio.mp3", {type: "audio/mp3"}) : null;
      const src = blob ? URL.createObjectURL(blob) : '';
      const messageToSend: Message = { sendMessage, username, time, voice_message, file, src };
      if(!blob) setMessages((prev) => [...prev, messageToSend]);
      socketClient.current.emit("message", messageToSend);
      setMessage("");
    }
  };
  const leaveChat = () => {
    if (socketClient.current) {
      socketClient.current.emit("leaveChat");
      setConnected(false);
    }
  };
  // audio recorder
  const addAudioElement = (blob: Blob) => {
    handleSendMessage(blob);
  };
  return (
    <main>
      {!connected ? (
        <div className="sign-div">
          <div className="sign-logo">
            <img src="/assets/logo.png" alt="logo" />
          </div>
          <UsernameForm
            username={username}
            setUsername={setUsername}
            handleConnection={handleConnection}
          />
        </div>
      ) : (
        <div className="chat-main">
          {/* <ConnectedUsers Users={connectedUsers} leaveChat={leaveChat} /> */}
          <Messages
            message={message}
            messages={messages}
            handleSendMessage={handleSendMessage}
            addAudioElement={addAudioElement}
            setMessage={setMessage}
            username={username}
          />
        </div>
      )}
      <ToastContainer position="bottom-right" />
    </main>
  );
};

export default App;
