import { findRelevantKnowledge } from '@/db/services/knowledge';

import type {
  FAQKnowledgeArgumentsType,
  FAQKnowledgeResultType,
  SearchKnowledgeArgumentsType,
  SearchKnowledgeResultType,
  SearchWebKnowledgeArgumentsType,
  SearchWebKnowledgeResultType,
} from './types';
import { embed } from 'ai';
import { openai } from '@ai-sdk/openai';
import { tavilyClient } from '@/services/tavily';
import { createOpenRouter, OpenRouter } from '@openrouter/ai-sdk-provider';
import { FAQ_KNOWLEDGE_PROMPT } from './prompt';

export const searchKnowledgeFunction = async (
  args: SearchKnowledgeArgumentsType
): Promise<SearchKnowledgeResultType> => {
  const knowledge = await Promise.all(
    args.queryPhrases.map(async phrase => {
      const { embedding } = await embed({
        model: openai.embedding('text-embedding-3-small'),
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
    searchDepth: 'advanced',
    topic: 'general',
  });

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

export const faqKnowledgeFunction = async (
  args: FAQKnowledgeArgumentsType
): Promise<FAQKnowledgeResultType> => {
  const url = 'https://openrouter.ai/api/v1/chat/completions';

  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'openai/gpt-4.1-mini',
      prompt: ` Here is the user question: ${args.queryPhrases} \n\nHere is the FAQ and answers, if the user question related to these, you will use the FAQ and answers to answer the question:
      ${FAQ_KNOWLEDGE_PROMPT}`,
    }),
  };

  try {
    const response = await fetch(url, options);

    // Check if the HTTP request was successful
    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `OpenRouter API error: ${response.status} ${response.statusText}`,
        {
          status: response.status,
          statusText: response.statusText,
          errorBody: errorText,
          queryPhrases: args.queryPhrases,
        }
      );

      return {
        message: `API request failed with status ${response.status}`,
        body: {
          faqKnowledge: `Error: Unable to process FAQ request. API returned ${response.status}: ${response.statusText}`,
        },
      };
    }

    const data = await response.json();

    // Validate response structure
    if (
      !data ||
      !data.choices ||
      !Array.isArray(data.choices) ||
      data.choices.length === 0
    ) {
      console.error('Invalid response structure from OpenRouter API', {
        data,
        queryPhrases: args.queryPhrases,
      });

      return {
        message: 'Invalid response format from FAQ service',
        body: {
          faqKnowledge:
            'No answer found, find another question or try another tool',
        },
      };
    }

    const messageContent = data.choices[0].content || data.choices[0].text;

    if (messageContent) {
      console.log('🚀 ~ messageContent:', messageContent);
      return {
        message:
          "FAQ knowledge search successful. Give an answer to the user's prompt.",
        body: {
          faqKnowledge: messageContent,
        },
      };
    } else {
      console.warn('No message content in OpenRouter response', {
        choice: data.choices[0],
        queryPhrases: args.queryPhrases,
      });

      return {
        message: 'No answer found in FAQ knowledge base',
        body: {
          faqKnowledge:
            'No relevant answer found in the FAQ knowledge base for your question. Try another question or try another tool',
        },
      };
    }
  } catch (error) {
    // Handle different types of errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.error('Network error while calling OpenRouter API', {
        error: error.message,
        queryPhrases: args.queryPhrases,
      });

      return {
        message: 'Network error occurred',
        body: {
          faqKnowledge:
            'Error: Unable to connect to FAQ service. Please check your internet connection and try again.',
        },
      };
    }

    if (error instanceof SyntaxError) {
      console.error('Failed to parse JSON response from OpenRouter API', {
        error: error.message,
        queryPhrases: args.queryPhrases,
      });

      return {
        message: 'Response parsing error',
        body: {
          faqKnowledge:
            'Error: Received invalid response from FAQ service. Try another question or try another tool',
        },
      };
    }

    // Generic error handling
    console.error('Unexpected error in faqKnowledgeFunction', {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      queryPhrases: args.queryPhrases,
    });

    return {
      message: 'An unexpected error occurred',
      body: {
        faqKnowledge:
          'Error: An unexpected error occurred while processing your FAQ request. Please try again later. Try another question or try another tool',
      },
    };
  }
};
