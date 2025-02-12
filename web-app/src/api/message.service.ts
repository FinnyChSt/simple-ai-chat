import axios from "axios";
import { ChatsResponse } from "./api.types";

export async function StartChat(title?: string): Promise<{ chatId: number }> {
  return (
    await axios.post(
      "http://localhost:8080/startChat",
      title ? { title } : undefined,
    )
  ).data;
}

export async function GetChats(): Promise<ChatsResponse[]> {
  const res = (await axios.get("http://localhost:8080/chats")).data;
  console.log(res);
  return res;
}
