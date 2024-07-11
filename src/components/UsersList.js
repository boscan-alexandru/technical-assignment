import { useEffect, useState } from "react";
import MessageAvatar from "./MessageAvatar";

const UsersList = ({ onSelectUser }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={() => onSelectUser(user)}>
            <MessageAvatar image_src={user.avatar} />
            <p>{user.email}</p>
          </li>
        ))}
      </ul>
      <style jsx>{`
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        li {
          padding: 10px;
          cursor: pointer;
          background-color: #f0f0f0;
          margin: 0;
          display: flex;
          gap: 10px;
        }

        li:hover {
          background-color: #d0d0d0;
        }
      `}</style>
    </div>
  );
};

export default UsersList;
