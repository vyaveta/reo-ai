import { ragChat } from "@/libs/rag-chat";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const { messages, sessionId } = await req.json()

        const lastMessage = messages[messages.length-1].content

        const response = await ragChat.chat(lastMessage)

        console.log("response ", response)

    } catch (_) {
        console.log("POST chat-stream", _)
    }
}