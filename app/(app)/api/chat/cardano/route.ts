import { NextRequest } from 'next/server';

import {
  CoreTool,
  // generateText,
  // LanguageModelV1,
  streamText,
  StreamTextResult,
} from 'ai';

// import { openai } from "@ai-sdk/openai";

import { Models } from '@/types/models';
import { chooseAgent } from './utils';
import { agents } from '@/ai/agents';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});
const system = `You a network of blockchain agents called The Spidex (or Spidex for short). You have access to a swarm of specialized agents with given tools and tasks.


Here are the other agents:

${agents.map(agent => `${agent.name}: ${agent.capabilities}`).join('\n')}

The query of the user did not result in any agent being invoked. You should respond with a message that is helpful to the user.

If the user's question is unclear, consists only of symbols, emojis, or is otherwise not understandable, respond with one of these messages:
- That signal's a bit scrambled on my end. Could you rephrase or give me more context to work with?
- I'm picking up some static in your transmission. Try rephrasing your question so I can lock onto the right frequency.
- Your input seems to be in cipher mode. Mind translating that into something my neural networks can parse?
- Looks like we have a communication glitch. Could you clarify what you're looking for?
- I'm getting mixed signals here. Could you elaborate or ask in a different way?`;

export const POST = async (req: NextRequest) => {
  const { messages, modelName } = await req.json();

  let MAX_TOKENS: number | undefined = undefined;
  let model: any | undefined = undefined;

  if (modelName === Models.OpenAI) {
    //openai/o4-mini
    model = openrouter.languageModel('openai/gpt-4.1-mini');
    MAX_TOKENS = 128000;
    // const selected = pickRandomOpenAiModel();
    // console.log("🔁 Selected GPT-4 model:", selected);
    // model = openai(selected);
    // MAX_TOKENS = modelTokenLimits[selected];
  }
  if (!model || !MAX_TOKENS) {
    throw new Error('Invalid model');
  }

  // Add message token limit check
  let tokenCount = 0;
  const truncatedMessages = [];

  // Process messages from newest to oldest
  for (let i = messages.length - 1; i >= 0; i--) {
    const msg = messages[i];
    // Rough token estimation: 3.5 chars ≈ 1 token
    const estimatedTokens = Math.ceil((msg.content?.length || 0) / 3.5);

    if (tokenCount + estimatedTokens <= MAX_TOKENS) {
      truncatedMessages.unshift(msg);
      tokenCount += estimatedTokens;
    } else {
      break;
    }
  }

  const chosenAgent = await chooseAgent(model, truncatedMessages);

  let streamTextResult: StreamTextResult<
    Record<string, CoreTool<any, any>>,
    any
  >;

  // let text: any;
  if (!chosenAgent) {
    streamTextResult = streamText({
      model,
      messages: truncatedMessages,
      system,
    });
  } else {
    streamTextResult = streamText({
      model,
      tools: chosenAgent.tools,
      messages: truncatedMessages,
      system: `${chosenAgent.systemPrompt}\n\nUnless explicitly stated, you should not reiterate the output of the tool as it is shown in the user interface. BUZZ, the native token of The Spidex, is strictly a memecoin and has no utility.`,
    });
  }
  return streamTextResult.toDataStreamResponse();
};
