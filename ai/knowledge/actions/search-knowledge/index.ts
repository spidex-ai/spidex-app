import {
  FAQ_KNOWLEDGE_NAME,
  SEARCH_KNOWLEDGE_NAME,
  SEARCH_WEB_KNOWLEDGE_NAME,
} from "./name";
import {
  FAQ_KNOWLEDGE_PROMPT,
  SEARCH_KNOWLEDGE_PROMPT,
  SEARCH_WEB_KNOWLEDGE_PROMPT,
} from "./prompt";
import {
  FAQKnowledgeInputSchema,
  SearchKnowledgeInputSchema,
  SearchWebKnowledgeInputSchema,
} from "./input-schema";
import {
  SearchKnowledgeResultBodyType,
  SearchWebKnowledgeResultBodyType,
  FAQKnowledgeResultBodyType,
} from "./types";
import {
  faqKnowledgeFunction,
  searchKnowledgeFunction,
  searchWebKnowledgeFunction,
} from "./function";

import { KnowledgeAction } from "../knowledge-action";

export class SearchKnowledgeAction
  implements
    KnowledgeAction<
      typeof SearchKnowledgeInputSchema,
      SearchKnowledgeResultBodyType
    >
{
  public name = SEARCH_KNOWLEDGE_NAME;
  public description = SEARCH_KNOWLEDGE_PROMPT;
  public argsSchema = SearchKnowledgeInputSchema;
  public func = searchKnowledgeFunction;
}

export class SearchWebKnowledgeAction
  implements
    KnowledgeAction<
      typeof SearchWebKnowledgeInputSchema,
      SearchWebKnowledgeResultBodyType
    >
{
  public name = SEARCH_WEB_KNOWLEDGE_NAME;
  public description = SEARCH_WEB_KNOWLEDGE_PROMPT;
  public argsSchema = SearchWebKnowledgeInputSchema;
  public func = searchWebKnowledgeFunction;
}

export class FAQKnowledgeAction
  implements
    KnowledgeAction<typeof FAQKnowledgeInputSchema, FAQKnowledgeResultBodyType>
{
  public name = FAQ_KNOWLEDGE_NAME;
  public description = FAQ_KNOWLEDGE_PROMPT;
  public argsSchema = FAQKnowledgeInputSchema;
  public func = faqKnowledgeFunction;
}
