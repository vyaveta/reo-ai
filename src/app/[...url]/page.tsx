// import ChatWrapper from '@/components/chat-wrapper'
// import { ragChat } from '@/libs/rag-chat'
// import { redis } from '@/libs/redis'
// import { cookies } from 'next/headers'
// import React from 'react'

// interface PageProps {
//     params: {
//         url: string | string[] | undefined
//     }
// }

// function reconstructUrl({ url }: { url: string[] }) {
//     const decodedComponents = url.map((component) => decodeURIComponent(component))
//     return decodedComponents.join("/")
// }

// const Page = async ({ params }: PageProps) => {

//     const sessionCookie = (await cookies()).get("sessionId")?.value
//     const reconstructedUrl = params.url ? reconstructUrl({ url: params.url as string[] }) : "";

//     const sessionId = (reconstructedUrl + "-" + sessionCookie).replace(/\//g, "");


//     const isAlreadyIndexed = await redis.sismember("indexed-urls", reconstructedUrl)

//     const initialMessages = await ragChat.history.getMessages({ amount: 10, sessionId })

//     if (!isAlreadyIndexed) {
//         await ragChat.context.add({
//             type: "html",
//             source: reconstructedUrl,
//             config: { chunkOverlap: 50, chunkSize: 200 }
//         })

//         await redis.sadd("indexed-urls", reconstructedUrl)
//     }
//     return (
//         <div>
//             <ChatWrapper sessionId={sessionId} initialMessages={initialMessages} />
//         </div>
//     )
// }

// export default Page


import ChatWrapper from "@/components/chat-wrapper";
import { ragChat } from "@/libs/rag-chat";
import { redis } from "@/libs/redis";
import { cookies } from "next/headers";
import { NextPage } from "next";
import React from "react";

interface PageProps {
  params:any; // Ensure it's optional for safety
}

// Utility function to reconstruct URL
function reconstructUrl(url: string[]): string {
  return url.map(decodeURIComponent).join("/");
}

const Page: NextPage<PageProps> = async ({ params }) => {
  try {
    // Ensure `cookies()` is awaited properly
    const sessionCookieStore = cookies();
    const sessionCookie = (await sessionCookieStore).get("sessionId")?.value ?? "default-session";

    // Handle cases where `params.url` might be undefined
    const reconstructedUrl = params.url ? reconstructUrl(params.url) : "";

    // Generate session ID (remove `/` for safety)
    const sessionId = (reconstructedUrl + "-" + sessionCookie).replace(/\//g, "");

    // Fetch data in parallel
    const [isAlreadyIndexed, initialMessages] = await Promise.all([
      redis.sismember("indexed-urls", reconstructedUrl),
      ragChat.history.getMessages({ amount: 10, sessionId }),
    ]);

    // Index the page if not already indexed
    if (!isAlreadyIndexed && reconstructedUrl) {
      await Promise.all([
        ragChat.context.add({
          type: "html",
          source: reconstructedUrl,
          config: { chunkOverlap: 50, chunkSize: 200 },
        }),
        redis.sadd("indexed-urls", reconstructedUrl),
      ]);
    }

    return <ChatWrapper sessionId={sessionId} initialMessages={initialMessages} />;
  } catch (error) {
    console.error("Error loading chat page:", error);
    return <div>Error loading chat. Please try again later.</div>;
  }
};

export default Page;