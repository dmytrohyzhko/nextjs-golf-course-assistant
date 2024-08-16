import { openai } from "@/app/openai";

export const runtime = "nodejs";

// Create a new assistant
export async function POST() {

  const assistant = await openai.beta.assistants.create({
    instructions: "You are a helpful assistant.",
    name: "Quickstart Assistant",
    model: "gpt-4o",
    tools: [
      // { type: "code_interpreter" },
      {
        type: "function",
        function: {
          name: "search_availability",
          description: "Check the availability to book a golf time",
          parameters: {
            type: "object",
            properties: {
              date: {
                type: "string",
                description: "The date to check availability for",
              },
              date1: {
                type: "string",
                description: "The date to check availability for",
              },
            },
            required: ["date"],
          },
        },
      },
      // { type: "file_search" },
    ],
  });
  return Response.json({ assistantId: assistant.id });
}
