import roomService from "@/services/roomService";
import prisma from "../../../utils/prismaClient";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { roomId, userId } = req.body;
      const room = await roomService.findOrCreateRoom(userId1, userId2);

      res.status(200).json(room);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Error joining room", error: error });
    }

    res.status(200).json(roomUser);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
