import roomService from "@/services/roomService";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const rooms = await roomService.getUserRooms(req.query.userId);

      res.status(200).json(rooms);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Error getting rooms", error: error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
