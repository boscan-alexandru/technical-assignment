const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { Server } = require("socket.io");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    socket.on("message", async (message) => {
      try {
        const decodedToken = jwt.verify(message.token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;

        const savedMessage = await prisma.message.create({
          data: {
            body: message.body,
            user: { connect: { id: userId } },
            room: { connect: { id: message.roomId } },
            type: { connect: { id: message.typeId } },
            attachment: message.attachmentId
              ? { connect: { id: message.attachmentId } }
              : undefined,
          },
          include: {
            user: true,
            type: true,
            room: true,
            attachment: true,
          },
        });

        io.to(message.roomId).emit("message", savedMessage);
      } catch (error) {
        console.error("Error saving message:", error);
      }
    });

    socket.on("join", (roomId) => {
      socket.join(roomId);
    });
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log(
      `> Ready on ${process.env.NEXT_PUBLIC_WS_URL || "localhost:3000"}`
    );
  });
});
