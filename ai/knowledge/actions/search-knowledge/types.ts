import { z } from "zod";

import {
  SearchKnowledgeInputSchema,
  SearchWebKnowledgeInputSchema,
} from "./input-schema";

import type { KnowledgeActionResult } from "../knowledge-action";
import type { Knowledge } from "@/db/types";
import { TavilySearchResponse } from "@tavily/core";

export type SearchKnowledgeSchemaType = typeof SearchKnowledgeInputSchema;

export type SearchKnowledgeArgumentsType = z.infer<SearchKnowledgeSchemaType>;

export type SearchKnowledgeResultBodyType = {
  knowledge: Knowledge[];
};

export type SearchKnowledgeResultType =
  KnowledgeActionResult<SearchKnowledgeResultBodyType>;

export type SearchWebKnowledgeSchemaType = typeof SearchWebKnowledgeInputSchema;

export type SearchWebKnowledgeArgumentsType =
  z.infer<SearchWebKnowledgeSchemaType>;

export type SearchWebKnowledgeResultBodyType = {
  webKnowledge: TavilySearchResponse;
};

export type SearchWebKnowledgeResultType =
  KnowledgeActionResult<SearchWebKnowledgeResultBodyType>;
