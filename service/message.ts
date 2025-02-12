import { Ollama } from "ollama";
import { pool } from "./setup";
import { ChatMessage } from "../web-app/src/store/types";

export async function PostMessage(message: string): Promise<string> {
  const ollama = new Ollama();
  let text: string = "";
  const streamResponse = await ollama.chat({
    model: "deepseek-r1:8b",
    messages: [{ role: "user", content: message }],
    stream: true,
  });
  for await (const response of streamResponse) {
    text += response.message.content;
  }
  return text;
}

export async function StartChat(title: string): Promise<{ chatId: number }> {
  const conn = await pool.getConnection();
  const rslt = await conn.query("INSERT INTO chat(title) VALUES(?)", title);
  conn.release();
  return {
    chatId: Number(rslt.insertId),
  };
}

export async function UpdateChat(
  chats: [
    {
      chatId: string;
    } & ChatMessage
  ]
): Promise<number> {
  const conn = await pool.getConnection();
  try {
    const query = `
      INSERT INTO message (chatId, question, answer)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE 
        question = VALUES(question),
        answer = VALUES(answer)
    `;
    const data = chats.map((chat) => [chat.chatId, chat.question, chat.answer]);
    const result = await conn.batch(query, data);
    console.log("batch update result:", result);
    return Array.isArray(result) ? result[0].affectedRows : result.affectedRows;
  } catch (error) {
    throw error;
  } finally {
    conn.release();
  }
}

export async function GetChats() {
  const conn = await pool.getConnection();
  const rslt = await conn.query("SELECT * FROM chat");
  console.log(rslt);
  conn.release();
  return rslt;
}
