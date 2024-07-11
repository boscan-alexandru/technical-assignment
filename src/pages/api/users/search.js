import userService from "@/services/userService";
import prisma from "../../../utils/prismaClient";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { query } = req.query;

    try {
      const found = await userService.findManyByEmail(query);

      if (!found) {
        return res.status(404).json({ message: "Users not found" });
      }
      res.status(200).json(found);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Error searching users", error: error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
