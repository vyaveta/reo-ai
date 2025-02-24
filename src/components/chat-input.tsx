"use client"

import { Button, Textarea } from "@heroui/react"
import { Send } from "lucide-react"
import { type useChat } from "@ai-sdk/react"

type THandleInputChange = ReturnType<typeof useChat>["handleInputChange"]
type THandleSubmit = ReturnType<typeof useChat>["handleSubmit"]
type TSetInput = ReturnType<typeof useChat>["setInput"]

interface ChatInputProps {
    input: string,
    handleInputChange: THandleInputChange,
    handleSubmit: THandleSubmit,
    setInput: TSetInput
}

export const ChatInput = ({ handleInputChange, input, setInput, handleSubmit }: ChatInputProps) => {
    return <div className="z-10 bg-zinc-900 bottom-0 left-0 w-full" >
        <div className="mx-2 flex flex-row gap-3 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl" >
            <div className="relative flex h-full flex-1 items-stretch md:flex-col" >
                <div className="relative flex flex-col w-full flex-grow p-4" >
                    <form className="relative" onSubmit={handleSubmit} >
                        <Textarea
                            minRows={4}
                            autoFocus placeholder="Enter your question..."
                            onChange={handleInputChange}
                            value={input}
                            onKeyDown={(e) => {
                                if(e.key === "Enter" && !e.shiftKey){
                                    e.preventDefault()
                                    handleSubmit()
                                    setInput("")
                                }
                            }}
                            className="resize-none bg-zinc-800 hover:bg-zinc-900 rounded-xl text-base"
                        />
                        <Button
                            size="sm"
                            type="submit"
                            className="absolute z-10 border border-border bg-zinc-900 right-2 bottom-2"
                        >
                            <Send className="size-4" />
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    </div>
}