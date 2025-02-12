import express from "express";
import path from "path";
import { initDb, pool } from "./service/setup";
import { error } from "console";
import { PostMessage } from "./service/message";

const app = express();
const PORT = 8080;

app.use(express.static(path.join(__dirname, "web-app", "dist")));

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

initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost${PORT}`);
  });
});
