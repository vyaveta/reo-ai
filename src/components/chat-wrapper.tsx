"use client"

import { Message, useChat } from "@ai-sdk/react"
import Messages from "./messages"
import { ChatInput } from "./chat-input"

const ChatWrapper = ({ sessionId, initialMessages }: { sessionId: string, initialMessages: Message[] }) => {

    const { messages, handleInputChange, input, handleSubmit, setInput } = useChat({
        api: "/api/chat-stream",
        body: { sessionId },
        initialMessages
    })

    return (
        <div className="relative min-h-full bg-zinc-900 flex divide-y flex-col divide-zinc-700 justify-between gap-2" >
            <div className="flex-1 text-black bg-zinc-800 justify-between flex flex-col" >

                <Messages messages={messages} />
            </div>
            <ChatInput
                input={input}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                setInput={setInput} />
        </div>
    )
}

export default ChatWrapper