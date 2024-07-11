import prisma from "../../utils/prismaClient";
import { verifyPassword } from "../../utils/hash";
import { generateToken } from "../../utils/jwt";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    const stored_user = await prisma.user.findUnique({
      where: { email },
    });

    if (!stored_user) {
      return res.status(400).json({
        errors: [
          { message: "The user does not appear to exist in our records" },
        ],
      });
    }

    const isPasswordValid = await verifyPassword(
      password,
      stored_user.password
    );

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ errors: [{ message: "Invalid credentials provided" }] });
    }

    const rooms = await prisma.room.findMany({
      where: {
        users: { some: { userId: stored_user.id } },
      },
      include: {
        users: {
          include: {
            user: true,
          },
        },
        messages: {
          include: {
            type: true,
          },
        },
      },
    });

    const formatted_rooms = rooms.map((room) => {
      const room_type = room.users.length === 2 ? "dm" : "group";
      const room_name =
        room_type === "dm"
          ? room.users.find((user) => user.userId !== stored_user.id).user
              .avatar
          : null;
      const room_avatar =
        room_type === "dm"
          ? room.users.find((user) => user.userId !== stored_user.id).user
              .avatar
          : null;
      const formatted_last_message = {
        body: null,
        type: 1,
      };
      const formatted_users = room.users.map((user) => {
        return {
          id: user.userId,
          name: user.user.name,
          avatar: user.user.avatar,
        };
      });

      if (room.messages.length > 0) {
        const last_message = room.messages[room.messages.length - 1];

        formatted_last_message.body = last_message.body;
        formatted_last_message.type = last_message.typeId;
      }

      return {
        id: room.id,
        name: room.name,
        avatar: room_avatar,
        last_message: formatted_last_message,
        type: room_type,
      };
    });

    const token = generateToken({ userId: stored_user.id });
    const user = {
      id: stored_user.id,
      email: stored_user.email,
      avatar: stored_user.avatar,
      rooms: formatted_rooms ? formatted_rooms : rooms,
    };

    res.status(200).json({ token, user });
  } else {
    res.status(405).json({ errors: [{ message: "Method not allowed" }] });
  }
}
