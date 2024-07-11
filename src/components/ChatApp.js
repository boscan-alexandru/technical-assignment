import {
  selectMessages,
  selectRoomList,
  selectCurrentRoom,
  setCurrentRoom,
} from "@/slices/chatSlice";
import AccountDetails from "./AccountDetails";
import Room from "./Room";
import UserSearch from "./UserSearch";
import RoomList from "./room/List";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { getToken, getUser, setUser } from "@/utils/auth";
import io from "socket.io-client";
import { selectTheme } from "@/slices/globalSettingsSlice";

const socket = io(process.env.NEXT_PUBLIC_WS_URL || "http://localhost:3000");

const ChatApp = ({ user, loggedOut }) => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [availableRooms, setAvailableRooms] = useState(user.rooms);
  const [hasAnyRoomSelected, setHasAnyRoomSelected] = useState(false);

  const theme = useSelector(selectTheme);

  const chat_display_classes = hasAnyRoomSelected ? "mobile-room-opened" : "";

  const selectARoom = async (room) => {
    setSelectedRoom(room);
    setHasAnyRoomSelected(true);
  };
  const deselectRoom = async () => {
    setSelectedRoom(null);
    setHasAnyRoomSelected(false);
  };

  const getAvailableRooms = useCallback(async () => {
    const token = getToken();
    const res = await fetch(`/api/rooms/userRooms?userId=${user.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const rooms = await res.json();
    // update user rooms
    setUser({ ...user, rooms: rooms });
    return rooms;
  }, [user]);

  const createOrJoinPrivateRoom = async (user_details) => {
    const token = getToken();
    const us = getUser();
    const them = user_details;

    const res = await fetch("/api/rooms/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId1: us.id, userId2: them.id }),
    });
    const room = await res.json();
    setSelectedRoom({ ...room });

    setSelectedRoom(room);
    setAvailableRooms(await getAvailableRooms());
    setHasAnyRoomSelected(true);
  };

  useEffect(() => {
    getAvailableRooms().then((rooms) => {
      rooms.forEach((room) => {
        socket.emit("join", room.id);
        socket.on("message", async (message) => {
          // add the message to state only if the user that is not the sender
          if (message.userId !== getUser().id) {
            setAvailableRooms(await getAvailableRooms());
          }
        });
      });
    });
  }, [getAvailableRooms, setAvailableRooms]);

  return (
    <div className="container">
      <aside
        className={`grid h-full gap-3 room-container-background${theme} ${chat_display_classes}`}
      >
        <div className="h-fit">
          <AccountDetails
            email={user.email}
            avatar={user.avatar}
            onLogout={loggedOut}
          />
          <UserSearch joinPrivateRoom={createOrJoinPrivateRoom} />
        </div>
        <RoomList rooms={availableRooms} onSelectRoom={selectARoom} />
      </aside>
      {hasAnyRoomSelected && (
        <Room
          room={selectedRoom}
          messageReceived={createOrJoinPrivateRoom}
          deselectRoom={deselectRoom}
        />
      )}
    </div>
  );
};

export default ChatApp;
