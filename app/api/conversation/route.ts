import { GoogleGenerativeAI } from '@google/generative-ai';
import { env } from 'process';
import { auth } from "@clerk/nextjs";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY as any);

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (!messages) {
      return new Response("No messages provided", { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = messages.map((message: any) => message.content).join("\n");

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return new Response(text);
  } catch (error: any) {
    console.log(error);
    return new Response(error.message, { status: 500 });
  }
}