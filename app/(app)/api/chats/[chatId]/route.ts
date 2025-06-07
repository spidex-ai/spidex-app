import { NextRequest, NextResponse } from 'next/server';

import {
  addChat,
  getChat,
  updateChatMessages,
  deleteChat,
} from '@/db/services';

import { generateText } from 'ai';
import { Message } from 'ai';
import { openai } from '@ai-sdk/openai';

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ chatId: string }> }
) => {
  const { chatId } = await params;

  try {
    // Get the authorization header
    const authHeader = req.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(null, { status: 401 });
    }

    const token = authHeader.split(' ')[1];

    const user = await fetch(
      `${process.env.NEXT_PUBLIC_SPIDEX_CORE_API_URL}/auth/me`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Verify the token with Privy
    if (!user.ok) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const userData = await user.json();

    return NextResponse.json(await getChat(chatId, userData.data.id));
  } catch (error) {
    console.error('Error in /api/chats/[chatId]:', error);
    return NextResponse.json(null, { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ chatId: string }> }
) => {
  const { chatId } = await params;
  console.log('🚀 ~ chatId:', chatId);

  const { messages } = await req.json();

  console.log('🚀 ~ messages:', JSON.stringify(messages));
  try {
    // Get the authorization header
    const authHeader = req.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(false, { status: 401 });
    }
    const token = authHeader.split(' ')[1];

    const user = await fetch(
      `${process.env.NEXT_PUBLIC_SPIDEX_CORE_API_URL}/auth/me`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Verify the token with Privy
    if (!user.ok) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const userData = await user.json();
    console.log('🚀 ~ userData:', userData);

    const chat = await getChat(chatId, userData.data.id);

    const triggerAgentQuests = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SPIDEX_CORE_API_URL}/user-quest/trigger-agent-quest`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          console.error(`Failed to trigger  prompt quest`);
        } else {
          console.log(`Triggered prompt quest`);
        }
      } catch (error) {
        console.error(`Error triggering prompt quest:`, error);
      }
    };

    triggerAgentQuests();

    // if (
    //   secondLastMessage.toolInvocations &&
    //   secondLastMessage.toolInvocations.length > 0
    // ) {
    //   const mapped = secondLastMessage.toolInvocations
    //     .map((invocation: any) => {
    //       const { toolName } = invocation;

    //       let agentType: EAgentType | undefined;

    //       if (toolName.startsWith("market")) agentType = EAgentType.MARKET;
    //       else if (toolName.startsWith("knowledge"))
    //         agentType = EAgentType.KNOWLEDGE;
    //       else if (toolName.startsWith("wallet"))
    //         agentType = EAgentType.PORTFOLIO;
    //       else if (toolName.startsWith("tokenanalysis"))
    //         agentType = EAgentType.TOKEN;
    //       else if (toolName.startsWith("trade")) agentType = EAgentType.TRADING;

    //       return {
    //         toolName,
    //         agentType,
    //       };
    //     })
    //     .filter((item: any) => item.agentType !== undefined);

    //   console.log("🚀 ~ mapped:", mapped);

    // }

    if (!chat) {
      return NextResponse.json(
        await addChat({
          id: chatId,
          userId: userData.data.id,
          messages,
          tagline: await generateTagline(messages),
        })
      );
    } else {
      return NextResponse.json(
        await updateChatMessages(chatId, userData.data.id, messages)
      );
    }
  } catch (error) {
    console.error('Error in /api/chats/[chatId]:', error);
    return NextResponse.json(false, { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ chatId: string }> }
) => {
  const { chatId } = await params;

  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing or invalid authorization header' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];

    const user = await fetch(
      `${process.env.NEXT_PUBLIC_SPIDEX_CORE_API_URL}/auth/me`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Verify the token with Privy
    if (!user.ok) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const userData = await user.json();

    const success = await deleteChat(chatId, userData.data.id);

    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: 'Failed to delete chat' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in DELETE /api/chats/[chatId]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
};

const generateTagline = async (messages: Omit<Message, 'id'>[]) => {
  const { text } = await generateText({
    model: openai('gpt-4o-mini'),
    messages: [
      messages[0],
      {
        role: 'user',
        content:
          'Generate a 3-5 word description of the chat. Do not include any quotation marks or other punctuation.',
      },
    ],
  });

  return text;
};
