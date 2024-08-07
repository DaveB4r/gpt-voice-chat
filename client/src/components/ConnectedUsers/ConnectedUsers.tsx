import { FC } from "react";
import User from "./User";

type UserType = {
  id: string;
  username: string;
}

interface ConnectedProps {
  Users: UserType[];
  leaveChat: Function;
}

const ConnectedUsers: FC<ConnectedProps> = ({Users, leaveChat}) => {
  return (
    <div className="users-panel">
      <h2>Connected Users</h2>
      <ul>
        {Users && Users.map((user) => <User key={user.id} username={user.username} />)}
      </ul>
      <button
        onClick={() => {
          leaveChat();
        }}
      >
        Leave Chat
      </button>
    </div>
  )
}

export default ConnectedUsers