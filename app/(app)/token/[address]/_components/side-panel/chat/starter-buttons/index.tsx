import React from 'react'

import StarterButton from './starter-button';
import Image from 'next/image';
const starterButtons = [
    {
        title: "Holder Analysis",
        description: "Analyze the holders of this token",
        icon: <Image src="/icons/trending.svg" alt="Trending" width={13} height={13} />,
        prompt: "Analyze the holders of this token"
        //   prompt: "Show me the trending tokens"
    }, 
    {
        title: "Liquidity Pools",
        description: "Analyze the liquidity pools of this token",
        icon: <Image src="/icons/news-white.svg" alt="Trending" width={13} height={13} />,
        prompt: "Analyze the liquidity pools of this token"
    },
    {
        title: "Top Holders",
        description: "Analyze the top holders of this token",
        icon: <Image src="/icons/trading-agent.svg" alt="Trending" width={13} height={13} />,
        prompt: "Analyze the top holders of this token"
    },
    {
        title: "Trading Activity",
        description: "Analyze the trading activity of this token",
        icon: <Image src="/icons/knowledge-white.svg" alt="Trending" width={13} height={13} />,
        prompt: "Analyze the trading activity of this token"
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