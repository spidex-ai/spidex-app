'use client'

import React, { useState } from 'react'

import { ChevronsUpDown } from 'lucide-react';

import { 
    Button,
    Popover,
    PopoverTrigger,
    PopoverContent,
    Input,
    Skeleton,
} from '@/components/ui'

import SaveToken from '../(app)/_components/save-token';

import { useTokenSearch } from '@/hooks/search';

import { cn } from '@/lib/utils';

import { Token } from '@/db/types';

interface Props {
    value: Token | null,
    onChange: (token: Token | null) => void,
    priorityTokens?: string[]
}

const TokenSelect: React.FC<Props> = ({ value, onChange, priorityTokens = [] }) => {

    const [open, setOpen] = useState(false);

    const [input, setInput] = useState("");

    const { results, loading } = useTokenSearch(input);

    const sortedResults = React.useMemo(() => {
        if (!results) return [];
        
        return results.sort((a, b) => {
            // First check for priority tokens
            const aIndex = priorityTokens.indexOf(a.id);
            const bIndex = priorityTokens.indexOf(b.id);
            
            if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
            if (aIndex !== -1) return -1;
            if (bIndex !== -1) return 1;

            // keep order
            return 0;
        });
    }, [results, priorityTokens, input]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <div
                    className="w-fit shrink-0 flex items-center bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded-md px-2 py-1 gap-2 cursor-pointer transition-colors duration-200"
                >
                    {
                        value ? (
                            <img 
                                src={value.logoURI || '/placeholder.png'} 
                                alt={value.name} 
                                className="w-6 h-6 rounded-full" 
                            />
                        ) : (
                            <div className="w-6 h-6 rounded-full bg-neutral-200 dark:bg-neutral-600" />
                        )
                    }
                    <p className={cn(
                        "text-xs font-bold",
                        value ? "opacity-100" : "opacity-50"
                    )}>
                        {value ? value.symbol : "Select"}
                    </p>
                    <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-2 flex flex-col gap-2">
                <Input
                    placeholder="Search tokens..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                {
                    loading ? (
                        <Skeleton className="h-48 w-full" />
                    ) : (
                        <div className="flex flex-col gap-2 max-h-[300px] overflow-y-scroll">
                            {
                                input ? (
                                    sortedResults.length === 0 ? (
                                        <p className="text-xs text-neutral-500">
                                            No results for &quot;{input}&quot;
                                        </p>
                                    ) : (
                                        sortedResults.map((token) => (
                                            <Button 
                                                key={token.id}
                                                variant="ghost"
                                                className="w-full justify-start px-1"
                                                onClick={() => {
                                                    setOpen(false);
                                                    onChange(token);
                                                }}
                                            >
                                                <img 
                                                    src={token.logoURI} 
                                                    alt={token.name} 
                                                    className="w-6 h-6 rounded-full" 
                                                />
                                                <p className="text-sm font-bold">
                                                    {token.symbol}
                                                </p>
                                                <SaveToken address={token.id} />
                                            </Button>
                                        ))
                                    )
                                ) : (
                                    <p className="text-xs text-neutral-500">
                                        Start typing to search for a token
                                    </p>
                                )
                            }
                        </div>
                    )
                }
            </PopoverContent>
        </Popover>
    )
}

export default TokenSelect