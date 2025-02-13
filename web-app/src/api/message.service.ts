import axios from "axios";
import { ChatsResponse } from "./api.types";
import { ChatMessage } from "../../../types/message.types";
import { BaseUrl, generateRoute, Routes } from "../../../service/routes";

export async function StartChat(title?: string): Promise<{ chatId: number }> {
  return (
    await axios.post(
      `${BaseUrl}${Routes.chats.start._}`,
      title ? { title } : undefined,
    )
  ).data;
}

export async function GetChats(): Promise<ChatsResponse[]> {
  const res = (await axios.get(`${BaseUrl}${Routes.chats._}`)).data;
  console.log(res);
  return res;
}

export async function UpdateChatMessageBackground(
  chats: [
    {
      chatId: number;
    } & ChatMessage,
  ],
): Promise<boolean> {
  try {
    axios.post(`${BaseUrl}${Routes.chats.messages._}`, chats);
    return true;
  } catch (error) {
    console.log("failed update chats", error);
    return false;
  }
}

export async function GetChat(id: number): Promise<ChatMessage[]> {
  try {
    const res = await axios.get<ChatMessage[]>(
      `${BaseUrl}${generateRoute(Routes.chats.id._, { id })}`,
    );
    return res.data;
  } catch (error) {
    console.log("failed to get chats", error);
    throw new Error("failed to get chats");
  }
}

export async function UpdateChatTitle(update: {
  id: number;
  title: string;
}): Promise<boolean> {
  try {
    await axios.patch(
      `${BaseUrl}${generateRoute(Routes.chats.id.title._, { id: update.id })}`,
      { title: update.title },
    );
    return true;
  } catch (error) {
    console.log("title update failed", error);
    return false;
  }
}

export async function AskQuestion(content: {
  id: number;
  question: string;
  model: string;
}) {
  try {
    const res = await axios.post(
      generateRoute(Routes.chats.id.message.new._, { id: content.id }),
      {
        question: content.question,
        model: content.model,
      },
    );
    return res.data;
  } catch (error) {
    throw new Error(`could not ask question due to: ${error}`);
  }
}

export async function GetModelsList(): Promise<string[]> {
  try {
    return await axios.get(Routes.models._);
  } catch (error) {
    throw new Error(`Error getting models: ${error}`);
  }
}
