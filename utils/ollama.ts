import { Ollama } from "ollama";
import { AiMessage } from "../types/message.types";

export async function AskOllama(
  content: string,
  model?: string
): Promise<AiMessage> {
  const ollamaHost = process.env.OLLAMA_HOST || "http://localhost:11434";
  const ollama = new Ollama({ host: ollamaHost });
  try {
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
  } catch (error) {
    console.error("Error querying Ollama:", error);
    return {
      reason: "",
      answer: "Sorry, I encountered an error while processing your request.",
    };
  }
}

export async function ListOfOllamaModels() {
  const ollamaHost = process.env.OLLAMA_HOST || "http://localhost:11434";
  const ollama = new Ollama({ host: ollamaHost });
  try {
    const models = await ollama.list();
    return models.models.map((model) => model.name);
  } catch (error) {
    console.error("Error listing Ollama models:", error);
    return [];
  }
}
