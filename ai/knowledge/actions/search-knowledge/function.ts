import { findRelevantKnowledge } from "@/db/services/knowledge";

import type {
  SearchKnowledgeArgumentsType,
  SearchKnowledgeResultType,
  SearchWebKnowledgeArgumentsType,
  SearchWebKnowledgeResultType,
} from "./types";
import { embed } from "ai";
import { openai } from "@ai-sdk/openai";
import { tavilyClient } from "@/services/tavily";

export const searchKnowledgeFunction = async (
  args: SearchKnowledgeArgumentsType
): Promise<SearchKnowledgeResultType> => {
  const knowledge = await Promise.all(
    args.queryPhrases.map(async (phrase) => {
      const { embedding } = await embed({
        model: openai.embedding("text-embedding-3-small"),
        value: phrase,
      });

      const knowledge = await findRelevantKnowledge(embedding);

      return knowledge;
    })
  );

  return {
    message:
      "Knowledge search successful. Give an answer to the user's prompt and include direct links to any relevant pages.",
    body: {
      knowledge: knowledge.flat(),
    },
  };
};

export const searchWebKnowledgeFunction = async (
  args: SearchWebKnowledgeArgumentsType
): Promise<SearchWebKnowledgeResultType> => {
  const result = await tavilyClient.search(args.queryPhrases, {
    maxResults: 5,
    includeAnswer: true,
    searchDepth: "advanced",
    topic: "general",
  });

  console.log(result);

  return {
    message:
      "Web knowledge search successful. Give an answer in detail and with explanations to the user's prompt and include direct links to any relevant pages.",
    body: {
      webKnowledge: result,
    },
  };
  //   const webKnowledge = await searchWebKnowledge(args.queryPhrases);
  //   return {
  //     message:
  //       "Web knowledge search successful. Give an answer to the user's prompt and include direct links to any relevant pages.",
  //     body: {
  //       webKnowledge: webKnowledge.flat(),
  //     },
  //   };
};
