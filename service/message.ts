import { Ollama } from "ollama";
import { pool } from "./setup";
import { ChatMessage } from "../types/message.types";

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
      chatId: number;
    } & ChatMessage
  ]
): Promise<number> {
  const conn = await pool.getConnection();
  try {
    const query = `
      INSERT INTO message (chatId, question, answer, reason)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE 
        question = VALUES(question),
        answer = VALUES(answer)
    `;
    const data = chats.map((chat) => [
      chat.chatId,
      chat.question,
      chat.answer,
      chat.reason,
    ]);
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

export async function FindChat(id: number): Promise<ChatMessage[]> {
  console.log("finding chat");
  const conn = await pool.getConnection();
  try {
    const rslt = await conn.query(
      "SELECT question, reason, answer from message WHERE chatId = ?",
      id
    );
    console.log("chats found for Id:", id, rslt);
    conn.release();
    return rslt;
  } catch (error) {
    conn.release();
    console.log("something went wrong", error);
    throw new Error("something went wrong");
  }
}

export async function UpdateChatTitle(chat: {
  id: number;
  title: string;
}): Promise<boolean> {
  console.log("updating chat title", chat.id, chat.title);
  const conn = await pool.getConnection();
  try {
    const rslt = await conn.execute("UPDATE chat SET title=? WHERE chatId=?", [
      chat.title,
      chat.id,
    ]);
    console.log("update rslt:", rslt);
    conn.release();
    return true;
  } catch (error) {
    conn.release();
    console.log(error);
    throw new Error("update title failes");
  }
}
