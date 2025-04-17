import { NextRequest } from "next/server";

import { LanguageModelV1, streamText } from "ai";

import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import { xai } from "@ai-sdk/xai";
import { google } from "@ai-sdk/google";
import { deepseek } from "@ai-sdk/deepseek";

import { Models } from "@/types/models";
import {
  CardanoTokenPageLiquidityAction,
  CardanoTokenPagePriceAnalysisAction,
  CardanoTokenPageTopHoldersAction,
  tokenPageTools,
} from "@/ai";

import type { TokenChatData } from "@/types";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});
const system = (tokenMetadata: TokenChatData) =>
  `You are a blockchain agent that helping the user analyze the following token: ${tokenMetadata.name} (${tokenMetadata.name}) with the address ${tokenMetadata?.address}.`;

export const POST = async (req: NextRequest) => {
  const {
    messages,
    modelName,
    token,
  }: { messages: any[]; modelName: string; token: TokenChatData } =
    await req.json();

  let MAX_TOKENS: number | undefined = undefined;
  let model: LanguageModelV1 | undefined = undefined;

  console.log("===================>modelName", system(token));
  if (modelName === Models.OpenAI) {
    model = openrouter.languageModel("openai/o4-mini");
    MAX_TOKENS = 128000;
    // const selected = pickRandomOpenAiModel();
    // console.log("🔁 Selected GPT-4 model:", selected);
    // model = openai(selected);
    // MAX_TOKENS = modelTokenLimits[selected];
  }

  if (modelName === Models.Anthropic) {
    model = anthropic("claude-3-5-sonnet-latest");
    MAX_TOKENS = 190000;
  }

  if (modelName === Models.XAI) {
    model = xai("grok-beta");
    MAX_TOKENS = 131072;
  }

  if (modelName === Models.Gemini) {
    model = google("gemini-2.0-flash-exp");
    MAX_TOKENS = 1048576;
  }

  if (modelName === Models.Deepseek) {
    model = deepseek("deepseek-chat") as LanguageModelV1;
    MAX_TOKENS = 64000;
  }

  if (!model || !MAX_TOKENS) {
    throw new Error("Invalid model");
  }

  // Add message token limit check
  let tokenCount = 0;
  const truncatedMessages = [];

  // Process messages from newest to oldest
  for (let i = messages.length - 1; i >= 0; i--) {
    const msg = messages[i];
    // Rough token estimation: 4 chars ≈ 1 token
    const estimatedTokens = Math.ceil((msg.content?.length || 0) / 4);

    if (tokenCount + estimatedTokens <= MAX_TOKENS) {
      truncatedMessages.unshift(msg);
      tokenCount += estimatedTokens;
    } else {
      break;
    }
  }

  const streamTextResult = streamText({
    model,
    messages: truncatedMessages,
    system: system(token),
    tools: tokenPageTools(token, [
      new CardanoTokenPageTopHoldersAction(),
      new CardanoTokenPageLiquidityAction(),
      new CardanoTokenPagePriceAnalysisAction(),
    ]),
  });

  return streamTextResult.toDataStreamResponse();
};
