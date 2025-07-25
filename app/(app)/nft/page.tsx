import React from 'react';

import ProtectedClient from '@/app/components/protected-client';
import { TextGradient } from '@/components/ui/text';
import Image from 'next/image';
import ReportBug from '../_components/report-bug';
import { GradientBorderButton, GradientButton } from '@/components/ui';
import NFTCard, { NFTCardShowcase } from './_components/card';
import Faq from './_components/faq';

const NftPage: React.FC = () => {
    return (
        <ProtectedClient>
            <div className='flex flex-col gap-8 mx-auto w-full h-full max-h-full px-1 relative'>
                <div className="flex flex-col gap-8 max-w-4xl mx-auto w-full h-full max-h-full px-2 overflow-y-auto">
                    <div className="flex gap-2">
                        <div className='flex flex-col gap-12 pt-12'>
                            <div className='flex flex-col gap-1 text-white text-[48px] leading-none'>
                                <p>Spidex AI</p>
                                <TextGradient>
                                    Extraordinary
                                </TextGradient>
                                <p>NFT Collection</p>
                            </div>
                            <div className='flex flex-col gap-6'>
                                <p className='text-xl'>Exclusive, On-Chain, And AI-Powered. Get Priority Access, Deeper Insights, And Next-Level DeFi Utilities -  All In One NFT.</p>
                                <div className='flex gap-4'>
                                    <GradientBorderButton>
                                        <div className='flex gap-2 items-center'>
                                            1
                                            <Image
                                                src="/icons/arrow-down-white.svg"
                                                alt="skip"
                                                width={5}
                                                height={5}
                                                className="w-2 h-2"
                                            />
                                        </div>
                                    </GradientBorderButton>
                                    <GradientButton>
                                        <div className='flex gap-2 items-center'>
                                            Mint Spidex NFT
                                            <Image
                                                src="/icons/skip.svg"
                                                alt="skip"
                                                width={5}
                                                height={5}
                                                className="w-4 h-4"
                                            />
                                        </div>
                                    </GradientButton>
                                </div>
                            </div>
                        </div>
                        <Image
                            src="/dexes/nft.png"
                            alt="nft"
                            width={480}
                            height={480}
                        />
                    </div>
                    <p className='text-[32px]'>Unlock Next-Gen Trading - One NFT Away</p>
                    <NFTCardShowcase />
                    <Faq />
                </div>
                <ReportBug />
            </div>
        </ProtectedClient>
    );
};

export default NftPage;
