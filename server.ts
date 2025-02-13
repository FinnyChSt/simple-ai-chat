import express from "express";
import path from "path";
import { initDb, pool } from "./service/setup";
import cors from "cors";
import {
  FindChat,
  GetChats,
  StartChat,
  UpdateChat,
  UpdateChatTitle,
} from "./service/message";
import { Routes } from "./service/routes";
import { AskOllama, ListOfOllamaModels } from "./utils/ollama";

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

app.get(Routes.health, async (req, res) => {
  try {
    const conn = await pool.getConnection();
    console.log("connected to MariaDB succesfully");
    conn.release();
    res.send("everything is healthy");
  } catch (error) {
    console.log(`MariaDb connection error: ${error}`);
    res.status(500);
    res.send("service is not healthy");
  }
});

app.post(Routes.chats.id.message.new._, async (req, res) => {
  const question = req.body.question;
  const message = await AskOllama(question, req.body.model);
  await UpdateChat([
    {
      chatId: Number(req.params.id),
      question,
      ...message,
    },
  ]);
  res.status(201);
  res.json(message);
});

app.post(Routes.chats.start._, async (req, res) => {
  const title = req.body?.title ?? "NewChat";
  const chat = await StartChat(title);
  res.json(chat);
  res.status(201);
});

app.post(Routes.chats.messages._, async (req, res) => {
  try {
    console.log(req.body);
    const rowsUPdated = await UpdateChat(req.body);
    res.status(201);
    res.json({ rowsUPdated });
  } catch (error) {
    console.log("updat messages failed:", error);
    res.sendStatus(400);
  }
  return;
});

app.get(Routes.chats._, async (req, res) => {
  try {
    const chats = await GetChats();
    res.json(chats);
  } catch (error) {
    res.sendStatus(500);
  }
});
app.get(Routes.chats.id._, async (req, res) => {
  try {
    const chat = await FindChat(Number(req.params.id));
    res.json(chat);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.get(Routes.models._, async (req, res) => {
  const models = await ListOfOllamaModels();
  res.json(models);
});

app.patch(Routes.chats.id.title._, async (req, res) => {
  await UpdateChatTitle({ id: Number(req.params.id), title: req.body.title });
  res.sendStatus(204);
});

initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost${PORT}`);
  });
});
