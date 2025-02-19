import ChatWrapper from '@/components/chat-wrapper'
import { ragChat } from '@/libs/rag-chat'
import { redis } from '@/libs/redis'
import React from 'react'

interface PageProps {
    params: {
        url: string | string[] | undefined
    }
}

function reconstructUrl({url}: {url: string[]}) {
    const decodedComponents = url.map((component) => decodeURIComponent(component))
    return decodedComponents.join("/")
}

const Page = async ({params}: PageProps) => {
    const reconstructedUrl = reconstructUrl({url: params.url as string[]})

    const isAlreadyIndexed = await redis.sismember("indexed-urls", reconstructedUrl)

    console.log("is already indexed: ", isAlreadyIndexed)

   if(!isAlreadyIndexed){
    await ragChat.context.add({
        type: "html",
        source: reconstructedUrl,
        config: {chunkOverlap: 50, chunkSize: 200}
    })

    await redis.sadd("indexed-urls", reconstructedUrl)
   }

  return (
    <div>
        <ChatWrapper sessionId='mock-session' />
    </div>
  )
}

export default Page