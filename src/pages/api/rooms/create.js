import roomService from "@/services/roomService";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { userId1, userId2 } = req.body;

    try {
      const room = await roomService.findOrCreateRoom(userId1, userId2);
      res.status(200).json(room);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Error creating room", error: error });
    }

    res.status(200).json({ ...room });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
