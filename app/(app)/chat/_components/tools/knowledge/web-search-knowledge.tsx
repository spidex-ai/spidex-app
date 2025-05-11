import React from 'react'

import ToolCard from '../tool-card';

import type { ToolInvocation } from 'ai';
import type { SearchWebKnowledgeResultType } from '@/ai';

interface Props {
    tool: ToolInvocation,
    prevToolAgent?: string,
}

const SearchWebKnowledge: React.FC<Props> = ({ tool, prevToolAgent }) => {
    

    return (
        <ToolCard 
            tool={tool}
            loadingText={`Searching Web Knowledge...`}
            result={{
                heading: (result: SearchWebKnowledgeResultType) => result.body?.webKnowledge 
                    ? `Searched web knowledge base` 
                    : `Failed to fetch web knowledge`,
                body: (result: SearchWebKnowledgeResultType) => result.body 
                    ? `Included the top ${result.body.webKnowledge.results.length} pages in context.`
                    :  "No web knowledge found"
            }}
            defaultOpen={false}
            prevToolAgent={prevToolAgent}
        />
    )
}

export default SearchWebKnowledge;