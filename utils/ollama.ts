import { Ollama } from "ollama";
import { AiMessage } from "../types/message.types";

export async function AskOllama(
  content: string,
  model?: string
): Promise<AiMessage> {
  const ollama = new Ollama();
  const streamResponse = await ollama.chat({
    model: model ?? "deepseek-r1:8b",
    messages: [{ role: "user", content }],
    stream: true,
  });
  let text = "";
  for await (const response of streamResponse) {
    text += response.message.content;
  }
  const endOfThink = "</think>";
  const match = text.indexOf("</think>");
  const reason = text.slice(7, match).trim();
  const answer = text.slice(match + endOfThink.length).trim();
  return {
    reason,
    answer,
  };
}

export async function ListOfOllamaModels() {
  const ollama = new Ollama();
  const modelList = await ollama.list();
  return modelList.models.map((model) => model.name);
}
