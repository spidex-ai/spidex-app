import React from 'react'

import ToolCard from '../tool-card';

import type { ToolInvocation } from 'ai';
import type { FAQKnowledgeResultType } from '@/ai';

interface Props {
    tool: ToolInvocation,
    prevToolAgent?: string,
}

const SearchFAQKnowledge: React.FC<Props> = ({ tool, prevToolAgent }) => {
    

    return (
        <ToolCard 
            tool={tool}
            loadingText={`Searching Knowledge...`}
            result={{
                heading: (result: FAQKnowledgeResultType) => result?.body?.faqKnowledge 
                    ? `Searched knowledge base` 
                    : `Failed to fetch knowledge`,
                body: (result: FAQKnowledgeResultType) => result?.body?.faqKnowledge 
                    ? `Included the context of the knowledge in the response`
                    :  "No knowledge found"
            }}
            defaultOpen={false}
            prevToolAgent={prevToolAgent}
        />
    )
}

export default SearchFAQKnowledge;