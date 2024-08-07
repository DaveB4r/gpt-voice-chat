import { FC } from 'react'

interface UserProps {
  username: string;
}

const User:FC<UserProps> = ({username}) => {
  const profilePicture = `https://ui-avatars.com/api/?name=${username}&background=random`;
  return (
    <li>
      <img src={profilePicture} alt="Profile Picture" />
      <span>{username}</span>
    </li>
  )
}

export default User