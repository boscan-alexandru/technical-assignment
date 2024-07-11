import express from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import minioClient from "../../utils/minioClient";
import Minio from "../../providers/upload/minio";
import UploadService from "../../services/uploadService";
import stream from "stream";
import prisma from "@/utils/prismaClient";

const app = express();
const uploadStrategy = new Minio(minioClient);
const uploadService = new UploadService(uploadStrategy);

const upload = multer({ storage: multer.memoryStorage() });

app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    const { fileUrl, name } = await uploadService.uploadFile(req.file);

    // create attachment
    const attachment = await prisma.messageAttachment.create({
      data: {
        url: fileUrl,
        name: name,
      },
    });

    res.status(200).json({
      url: fileUrl,
      id: attachment.id,
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
