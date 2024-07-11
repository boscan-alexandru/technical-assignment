import prisma from "../../utils/prismaClient";
import { hashPassword } from "../../utils/hash";
import express from "express";
import multer from "multer";

import minioClient from "../../utils/minioClient";
import Minio from "../../providers/upload/minio";
import UploadService from "../../services/uploadService";
import stream from "stream";
import { generateToken } from "@/utils/jwt";

const app = express();
const uploadStrategy = new Minio(minioClient);
const uploadService = new UploadService(uploadStrategy);
const upload = multer({ storage: multer.memoryStorage() });

app.post("/api/register", upload.single("file"), async (req, res) => {
  const { email, password } = req.body;

  try {
    const [existingUser, hashedPassword, avatarUrl] = await Promise.all([
      prisma.user.findUnique({ where: { email } }),
      hashPassword(password),
      req.file
        ? uploadService.uploadFile(req.file)
        : Promise.reject(new Error("Avatar is required")),
    ]);

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const stored_user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        avatar: avatarUrl.fileUrl,
      },
    });

    const rooms = await prisma.room.findMany({
      where: {
        AND: [{ users: { some: { userId: parseInt(stored_user.id) } } }],
      },
    });

    res.status(201).json({
      message: "User created",
      user: {
        id: stored_user.id,
        email: stored_user.email,
        avatar: stored_user.avatar,
        rooms,
      },
      token: generateToken({ userId: stored_user.id }),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};
export default app;
