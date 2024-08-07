import { FC } from "react";

interface UsernameProps {
  username?: string;
  setUsername: Function;
  handleConnection: Function;
}

const UsernameForm: FC<UsernameProps> = ({
  username,
  setUsername,
  handleConnection,
}) => {
  return (
    <form
      className="sign-form"
      onSubmit={(e) => {
        e.preventDefault();
        handleConnection();
      }}
    >
      <input
        type="text"
        value={username}
        placeholder="Enter your username"
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default UsernameForm;
