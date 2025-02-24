import { cn } from '@/libs/utils'
import { Bot, User } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

interface MessageProps {
    content: string,
    isUserMessage: boolean
}

const Message = ({ content, isUserMessage }: MessageProps) => {
    return (
        <div className={cn({
            "bg-zinc-800": isUserMessage,
            "bg-zinc-900/5": !isUserMessage

        })} >
            <div className='p-6' >
                <div className='max-w-3xl mx-auto flex items-start gap-2.5' >
                    <div className={cn("size-10 shrink-0 aspect-square rounded-full border-zinc-900 border bg-zinc-900 text-white  flex justify-center items-center", {
                        "bg-blue-950 border-blue-800 border text-zinc-200": isUserMessage,

                    })} >
                        {
                            isUserMessage ? <User className='size-5' /> :
                                // <Bot className='size-5' />
                                <Image src={"/reo.jpg"} alt='reo' width={40}  height={40} className='rounded-full' />
                        }
                    </div>
                    <div className='flex flex-col ml-6 w-full' >
                        <div className='flex items-center space-x-2' >
                            <span className='text-sm font-semibold text-gray-900 dark:text-white' >
                                {isUserMessage ? "You" : "reo-ai"}
                            </span>
                        </div>
                        <p className='text-sm font-normal py-2.5 dark:text-white text-gray-900' >
                            {content}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Message