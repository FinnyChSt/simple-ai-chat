import express from "express";
import path from "path";
import { initDb, pool } from "./service/setup";
import cors from "cors";
import {
  GetChats,
  PostMessage,
  StartChat,
  UpdateChat,
} from "./service/message";

const app = express();
const PORT = 8080;

app.use(express.static(path.join(__dirname, "web-app", "dist")));

app.use(
  cors({
    origin: "*",
    credentials: false,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "web-app", "dist", "index.html"));
});

app.get("/health", async (req, res) => {
  try {
    const conn = await pool.getConnection();
    console.log("connected to MariaDB succesfully");
    conn.release();
    res.send("everything is healthy");
  } catch (error) {
    console.log(`MariaDb connection error: ${error}`);
    res.send("service is not healthy");
  }
});

app.post("/message", async (req, res) => {
  const message = await PostMessage(req.body.question);
  res.json({
    answer: message,
  });
});

app.post("/startChat", async (req, res) => {
  const title = req.body?.title ?? "NewChat";
  const chat = await StartChat(title);
  res.json(chat);
});

app.post("/updateChatMessages", async (req, res) => {
  try {
    console.log(req.body);
    const rowsUPdated = await UpdateChat(req.body);
    res.json({ rowsUPdated });
    res.status(200);
  } catch (error) {
    console.log("updat messages failed:", error);
    res.status(400);
  }
  return;
});

app.get("/chats", async (req, res) => {
  try {
    const chats = await GetChats();
    res.json(chats);
  } catch (error) {
    res.status(500);
  }
});
initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost${PORT}`);
  });
});
