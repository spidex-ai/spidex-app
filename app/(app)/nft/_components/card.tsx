'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button, GradientButton } from '@/components/ui/button';
import Image from 'next/image';

interface NFTCardProps {
    level: 1 | 2 | 3;
    className?: string;
    onMint?: () => void;
}

const NFTCard: React.FC<NFTCardProps> = ({ level, className, onMint }) => {
    const getCardConfig = () => {
        switch (level) {
            case 1:
                return {
                    title: 'NFT Level 1',
                    buttonMint: (
                        <Button
                            onClick={onMint}
                            className={cn(
                                'px-6 py-2 rounded-md font-medium',
                                'border border-white/20 !bg-white !text-black',
                            )}
                        >
                            <div className='flex gap-2 items-center'>
                                Mint NFT
                                <Image
                                    src="/icons/skip.svg"
                                    alt="skip"
                                    width={5}
                                    height={5}
                                    className="w-3 h-3"
                                />
                            </div>
                        </Button>
                    ),
                };
            case 2:
                return {
                    title: 'NFT Level 2',
                    buttonMint: (
                        <Button
                            onClick={onMint}
                            className={cn(
                                'px-6 py-2 rounded-md font-medium',
                                'border border-white/20 !bg-brand-1000 !text-black',
                            )}
                        >
                            <div className='flex gap-2 items-center'>
                                Mint NFT
                                <Image
                                    src="/icons/skip.svg"
                                    alt="skip"
                                    width={5}
                                    height={5}
                                    className="w-3 h-3"
                                />
                            </div>
                        </Button>
                    )
                };
            case 3:
                return {
                    title: 'NFT Level 3',
                    buttonMint: (
                        <GradientButton
                            onClick={onMint}
                            className={cn(
                                '!px-5 !py-2 !rounded-md !font-medium !text-sm',
                            )}
                        >
                            <div className='flex gap-2 items-center'>
                                Mint NFT
                                <Image
                                    src="/icons/skip.svg"
                                    alt="skip"
                                    width={5}
                                    height={5}
                                    className="w-3 h-3"
                                />
                            </div>
                        </GradientButton>
                    )

                };
            default:
                return {
                    title: 'NFT Level 1',
                    buttonMint: <Button
                        onClick={onMint}
                        className={cn(
                            'px-6 py-2 rounded-md font-medium',
                            'border border-white/20 !bg-white !text-black',
                        )}
                    >
                        <div className='flex gap-2 items-center'>
                            Mint NFT
                            <Image
                                src="/icons/skip.svg"
                                alt="skip"
                                width={5}
                                height={5}
                                className="w-3 h-3"
                            />
                        </div>
                    </Button>
                };
        }
    };

    const config = getCardConfig();

    return (
        <div
            className={cn(
                'relative w-72 h-96 rounded-xl overflow-hidden bg-black',
                className
            )}
            style={{
                background: `
          radial-gradient(163.27% 64.37% at 121.3% 37.79%, #BBF985 0%, rgba(255, 255, 255, 0) 100%),
          radial-gradient(105.66% 91.67% at 6.37% 78.69%, #009EFF 0%, rgba(255, 255, 255, 0) 100%),
          radial-gradient(122.53% 48.31% at -40.12% 135.08%, #BBF985 0%, rgba(255, 255, 255, 0) 100%)
        `,
                padding: '1px',
            }}
        >
            {/* Inner card content with black background */}
            <div className="w-full h-full rounded-xl bg-black relative overflow-hidden">
                <div className="relative z-10 flex flex-col h-full p-6">
                    <div className="flex-1 flex flex-col justify-between items-center text-center">
                        <h3 className="text-xl font-bold text-white mb-2">
                            {config.title}
                        </h3>

                        <div className="rounded-lg bg-black/20 border border-white/10 mb-6 flex items-center justify-center">
                            <Image
                                src="/dexes/showcase.png"
                                alt="nft"
                                width={186}
                                height={176}
                            />
                        </div>
                        <div className="flex justify-center">
                            {config.buttonMint}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default NFTCard;

// Example usage component
export const NFTCardShowcase: React.FC = () => {
    const handleMint = (level: number) => {
        console.log(`Minting NFT Level ${level}`);
    };

    return (
        <div className='flex flex-col gap-12'>

            <div className="flex gap-6">
                <NFTCard level={1} onMint={() => handleMint(1)} />
                <NFTCard level={2} onMint={() => handleMint(2)} />
                <NFTCard level={3} onMint={() => handleMint(3)} />
            </div>
            <div className='w-full flex justify-center'>

            <Button className='w-fit rounded-full !bg-transparent border border-white/20 text-white'>See more</Button>
            </div>
        </div>
    );
};
