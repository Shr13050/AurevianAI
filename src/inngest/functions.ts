import { inngest } from "./client";
import { openai, createAgent } from "@inngest/agent-kit";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {

    // Use Hugging Face via OpenAI-compatible API
    const writer = createAgent({
      name: "writer",
      system: "You are an expert writer. You write readable, concise, simple content.",
      model: openai({
        model: "meta-llama/Meta-Llama-3-8B-Instruct",
        baseUrl: "https://router.huggingface.co/v1",
        apiKey: process.env.OPENAI_API_KEY,
      }),
    });

    const { output } = await writer.run(event.data.email);
    console.log(output)
    await step.sleep("wait-a-moment", "1s");
    return { message: output };
  },
);