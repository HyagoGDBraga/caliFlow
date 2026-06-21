import OpenAI from "openai";
import { envalid } from "@/env/envalid";

const client = new OpenAI({
  apiKey: envalid.GROQ_API_KEY as string,
  baseURL: "https://api.groq.com/openai/v1",
});

async function main() {
  const response = await client.responses.create({
    model: "openai/gpt-oss-20b",
    input: "Explain the importance of fast language models",
  });

  console.log(response.output_text);
}

main().catch(console.error);