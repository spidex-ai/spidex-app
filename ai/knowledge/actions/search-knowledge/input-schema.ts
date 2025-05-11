import { z } from "zod";

export const SearchKnowledgeInputSchema = z.object({
  queryPhrases: z
    .array(z.string())
    .describe("The phrases to search for in knowledge"),
});

export const SearchWebKnowledgeInputSchema = z.object({
  queryPhrases: z.string().describe("The phrases to search for in the web"),
});
