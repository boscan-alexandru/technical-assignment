import { useState, useEffect } from "react";
import MessageAvatar from "../MessageAvatar";
import Individual from "./Individual";

const List = ({ rooms, onSelectRoom }) => {
  const [roomList, setRoomList] = useState(rooms);

  const selectedRoom = (roomId) => {
    onSelectRoom(rooms.find((room) => room.id === roomId));
  };

  useEffect(() => {
    setRoomList(rooms);
  }, [rooms]);

  return (
    <div className="room-list-container">
      <ul>
        {roomList.map((room) => (
          <Individual
            key={room.id}
            roomId={room.id}
            roomName={room.name}
            roomImage={room.avatar}
            roomLastMessage={room.last_message.body}
            onSelected={selectedRoom}
          />
        ))}
      </ul>
      <style jsx>{`
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
      `}</style>
    </div>
  );
};

export default List;
