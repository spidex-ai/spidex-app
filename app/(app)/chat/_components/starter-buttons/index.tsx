import React from 'react'

import StarterButton from './starter-button';
import Image from 'next/image';
const starterButtons = [
    {
        title: "Trending",
        description: "Search Cardano trending tokens",
        icon: <Image src="/icons/trending.svg" alt="Trending" width={13} height={13} />,
        prompt: "Show me the top volume tokens on Cardano"
        //   prompt: "Show me the trending tokens"
    }, 
    {
        title: "News",
        description: "Catch up with latest news",
        icon: <Image src="/icons/news-white.svg" alt="Trending" width={13} height={13} />,
        prompt: "Catch up with latest news on Cardano"
    },
    {
        title: "Trade",
        description: "Swap tokens with best market offers",
        icon: <Image src="/icons/trading-agent.svg" alt="Trending" width={13} height={13} />,
        prompt: "Let's trade some tokens"
    },
    {
        title: "Knowledge",
        description: "Learn developer docs for protocols",
        icon: <Image src="/icons/knowledge-white.svg" alt="Trending" width={13} height={13} />,
        prompt: "Get me developer docs from Ethereum documentation"
    }
] as const

const StarterButtons = () => {
    return (
        <div className="grid grid-cols-2 gap-2">
            {starterButtons.map((button) => (
                <StarterButton 
                    key={button.title} 
                    {...button}
                />
            ))}
        </div>
    )
}

export default StarterButtons