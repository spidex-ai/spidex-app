import {
  FAQ_KNOWLEDGE_NAME,
  SEARCH_KNOWLEDGE_NAME,
  SEARCH_WEB_KNOWLEDGE_NAME,
} from "@/ai/action-names";
import { knowledgeTool } from "@/ai/knowledge";
import {
  FAQKnowledgeAction,
  SearchKnowledgeAction,
  SearchWebKnowledgeAction,
} from "@/ai/knowledge/actions/search-knowledge";

export const KNOWLEDGE_TOOLS = {
  [`knowledge-${SEARCH_KNOWLEDGE_NAME}`]: knowledgeTool(
    new SearchKnowledgeAction()
  ),
  [`knowledge-${SEARCH_WEB_KNOWLEDGE_NAME}`]: knowledgeTool(
    new SearchWebKnowledgeAction()
  ),
  [`knowledge-${FAQ_KNOWLEDGE_NAME}`]: knowledgeTool(new FAQKnowledgeAction()),
};
