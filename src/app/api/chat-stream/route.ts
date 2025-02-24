import { ragChat } from "@/libs/rag-chat";
import { aiUseChatAdapter } from "@upstash/rag-chat/nextjs";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const { messages, sessionId } = await req.json()

        const lastMessage = messages[messages.length - 1].content

        const response = await ragChat.chat(lastMessage, { streaming: true, sessionId })

        return aiUseChatAdapter(response)

    } catch (_) {
        console.log("POST chat-stream", _)
    }
}