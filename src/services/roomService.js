import prisma from "../utils/prismaClient";

class RoomService {
  async findOrCreateRoom(userId1, userId2) {
    const existingRoom = await this.findExistingRoom(userId1, userId2);
    if (existingRoom) {
      return existingRoom;
    }
    return this.createRoom(userId1, userId2);
  }

  async findExistingRoom(userId1, userId2) {
    return prisma.room.findFirst({
      where: {
        AND: [
          {
            users: {
              some: {
                OR: [
                  { userId: parseInt(userId1) },
                  { userId: parseInt(userId2) },
                ],
              },
            },
          },
          {
            users: {
              every: {
                OR: [
                  { userId: parseInt(userId1) },
                  { userId: parseInt(userId2) },
                ],
              },
            },
          },
          {
            messages: {
              some: {},
            },
          },
        ],
      },
      include: {
        users: true,
        messages: {
          include: {
            user: true,
            type: true,
          },
        },
      },
    });
  }

  async createRoom(userId1, userId2) {
    return prisma.room.create({
      data: {
        name: `Room with ${userId1} and ${userId2}`,
        users: {
          create: [
            { userId: parseInt(userId1) },
            { userId: parseInt(userId2) },
          ],
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            user: true,
            type: true,
          },
        },
      },
    });
  }

  async getUserRooms(userId) {
    const rooms = await prisma.room.findMany({
      where: {
        users: { some: { userId: parseInt(userId) } },
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

    return rooms.map((room) => {
      const room_type = room.users.length === 2 ? "dm" : "group";
      const room_name =
        room_type === "dm"
          ? room.users.find((user) => user.userId !== userId).user.avatar
          : null;
      const room_avatar =
        room_type === "dm"
          ? room.users.find((user) => user.userId !== userId).user.avatar
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
  }

  async joinRoom(roomId, userId) {
    return prisma.roomUser.create({
      data: {
        roomId,
        userId,
      },
    });
  }

  async getMessages(roomId) {
    return prisma.message.findMany({
      where: { roomId: Number(roomId) },
      include: { user: true, type: true, attachment: true },
    });
  }
}

const roomService = new RoomService();

export default roomService;
