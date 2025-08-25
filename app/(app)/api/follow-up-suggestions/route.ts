import { Models } from '@/types/models';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { generateObject } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

const prompt = `Generate 3 follow-up suggestions for what I can do next. They can be declarative or questions. The prompts should be specific to the previous messages. Reference specific tokens, projects, etc.`;

export async function POST(req: NextRequest) {
  const { messages, modelName } = await req.json();

  let model;
  switch (modelName) {
    case Models.OpenAI:
      model = openrouter.languageModel('openai/gpt-4o-mini');
      break;
    case Models.Anthropic:
      model = openrouter.languageModel('anthropic/claude-3-5-sonnet-latest');
      break;
    case Models.XAI:
      model = openrouter.languageModel('x-ai/grok-beta');
      break;
    case Models.Gemini:
      model = openrouter.languageModel('google/gemini-2.0-flash-exp');
      break;
    case Models.Deepseek:
      model = openrouter.languageModel('deepseek/deepseek-chat');
      break;
    default:
      throw new Error('Invalid model');
  }

  // Filter out messages with incomplete tool invocations
  const filteredMessages = messages.map((message: any) => {
    if (message.toolInvocations) {
      const completedToolInvocations = message.toolInvocations.filter(
        (invocation: any) => invocation.state === 'result'
      );
      return {
        ...message,
        toolInvocations: completedToolInvocations,
      };
    }
    return message;
  });

  try {
    const { object } = await generateObject({
      model: model as any,
      messages: [
        ...filteredMessages,
        {
          role: 'user',
          content: prompt,
        },
      ],
      schema: z.object({
        suggestions: z.array(
          z.object({
            prompt: z.string().describe('A prompt for the suggestion.'),
            title: z
              .string()
              .describe(
                'A short, concise and complete 3-5 word title for the suggestion'
              ),
          })
        ),
      }),
    });
    return NextResponse.json(object.suggestions);
  } catch (error) {
    console.error('Error generating follow-up suggestions:', error);
    return NextResponse.json(
      { error: 'Failed to generate follow-up suggestions' },
      { status: 500 }
    );
  }
}
