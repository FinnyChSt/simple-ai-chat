import { Ollama } from "ollama";

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
