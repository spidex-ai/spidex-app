'use client'

import Image from "next/image";
import { useState } from "react";

// FAQ data
const faqItems = [
    {
        id: 1,
        question: (
            <p>Why Spidex AI NFTs?</p>
        ),
        answer: (
            <>
                <p>To go beyond DeFi. Spidex AI NFTs grant you real utility: priority access to AI agents, reduced trading fees, exclusive analytics, and the power to help shape the future of Cardano’s smartest DeFAI layer.</p>
                <p>Holders will be eligible for future CNT Airdrops from Spidex AI and Partners.</p>
            </>
        )
    },
    {
        id: 2,
        question: (
            <p>What’s the total supply and price?</p>
        ),
        answer: (
            <>
                <p>Each NFT tier has a limited supply to ensure exclusivity. Prices are listed on the mint page and are payable in ADA. Grab yours before they’re gone!</p>
            </>
        )
    },
    {
        id: 3,
        question: (
            <p>Do NFTs have rarity?</p>
        ),
        answer: (
            <>
                <p>Yes - each NFT level offers unique perks and represents a different tier of access. Higher levels come with rarer utilities and deeper benefits.</p>
            </>
        )
    },
    {
        id: 4,
        question: (
            <p>Will there be more NFT collections in the future?</p>
        ),
        answer: (
            <>
                <p>This is our flagship collection. Future drops may happen, but early holders will always get priority and exclusive benefits.</p>
            </>
        )
    },
    {
        id: 5,
        question: (
            <p>What can SILK be redeemed for?</p>
        ),
        answer: (
            <>
                <ul className="list-disc list-inside">
                    <li>Priority Access: Early features, premium AI tools, and exclusive trading perks.</li>
                    <li>Discounts & Benefits: Fee reductions, cashback, optimized executions, and advanced strategies.</li>
                </ul>
                <p className="mt-4">We're constantly expanding benefits for SILK to reward our most dedicated community members.</p>
            </>
        )
    }
];

export default function Faq() {
    const [expandedItems, setExpandedItems] = useState<number[]>([]);

    const toggleItem = (id: number) => {
        setExpandedItems(prevState => {
            if (prevState.includes(id)) {
                return prevState.filter(item => item !== id);
            } else {
                return [...prevState, id];
            }
        });
    };

    const isExpanded = (id: number) => expandedItems.includes(id);

    return (
        <section
            className="min-h-[500px] sm:min-h-[800px] flex items-start relative overflow-hidden w-full relative overflow-hidden"
            id="faq"
        >
            <div className="w-full flex flex-col gap-8">
                <p className="text-[32px] text-white">
                    Frequently Asked Questions
                </p>


                {faqItems.map((item, index) => (
                    <div
                        key={item.id}
                        className="flex flex-col items-start gap-8 w-full"
                    >
                        <div
                            className="flex items-center gap-2 flex-row w-full justify-between cursor-pointer"
                            onClick={() => toggleItem(item.id)}
                        >
                            <div className="flex items-center gap-2 sm:gap-4 ">
                                <span className="text-base sm:text-lg font-medium text-left bg-gradient-to-r from-[#FFFFFF] via-[#BBF985] to-[#009EFF] text-transparent bg-clip-text">
                                    {item.question}
                                </span>
                            </div>
                            <div className={`transform transition-transform duration-300 ${isExpanded(item.id) ? 'rotate-180' : 'rotate-0'}`}>
                                <Image
                                    src="/icons/arrow-polygon-down.svg"
                                    alt="icon-down"
                                    width={5}
                                    height={5}
                                    className="w-4 h-4"
                                />
                            </div>
                        </div>

                        {isExpanded(item.id) && (
                            <div className="text-[#B8B8B8] text-left text-sm sm:text-lg transition-all duration-300">
                                {item.answer}
                            </div>
                        )}
                        {index !== faqItems.length - 1 && (
                            <div className="w-full h-[1px] bg-gradient-to-r from-[#FFFFFF00] via-[#FFFFFF] to-[#FFFFFF00]"></div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}