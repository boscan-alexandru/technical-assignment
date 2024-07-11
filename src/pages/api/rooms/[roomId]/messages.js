import roomService from "@/services/roomService";
import prisma from "../../../../utils/prismaClient";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { roomId } = req.query;
      const messages = await roomService.getMessages(roomId);

      res.status(200).json(messages);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Error joining room", error: error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
