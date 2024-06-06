import { DEFAULT_OPENAI_MODEL } from "@/app/shared/Constants";
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});

export async function handler(req) {
    if (req.method !== "POST") {
        return Response.json({ message: "Method not allowed" }, { status: 405 });
    }

    const body = await req.json();
    const messages = body?.messages || [];
    const model = body?.model || DEFAULT_OPENAI_MODEL;

    try {
        const promptMessage = {
        role: "system",
        content: "You are ChatGPT. Respond to the user like you normally would.",
        };
        const initialMessages = messages.slice(0, 3);
        const latestMessages = messages.slice(-5).map(message => ({
        role: message.role,
        content: message.content,
        }));

        const completion = await openai.chat.completions.create({
        model: model.id,
        temperature: 0.5,
        messages: [promptMessage, ...initialMessages, ...latestMessages],
        });

        const responseMessage = completion.data.choices?.[0]?.message?.content.trim();

        if (!responseMessage) {
        return Response.json({ message: "Unable to get response from OpenAI. Please try again." }, { status: 400 });
        }

        return Response.json({ message: responseMessage }, { status: 200 });
    } catch (error) {
        console.log(error.message);

        if (error.code==='insufficient_quota') {
            return Response.json({ message: "OpenAI API quota exhausted. Here is a sample response." }, { status: 200 });
        }
        else {
            return Response.json({ message: "An error occured during the request to OpenAI. Please try again." }, { status: 500 });
        }
    }
}

export { handler as POST, handler as GET }
