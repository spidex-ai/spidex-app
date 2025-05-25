'use client'

import React from 'react'

import { Loader2, Star } from 'lucide-react'

import { Skeleton } from '@/components/ui'

import { useSaveToken } from '@/hooks'

import { cn } from '@/lib/utils'

import { toast } from 'react-hot-toast'

interface Props {
    address: string
    className?: string
}

const SaveToken: React.FC<Props> = ({ address, className }) => {

    const { saveToken, deleteToken, isLoading, isUpdating, isTokenSaved } = useSaveToken(address);

    if(isLoading) {
        return (
            <Skeleton className="size-6" />
        )
    }

    const removeSaveToken = async () => {
        try {
            await deleteToken();
            const searchInput = document.querySelector('input[placeholder="Search tokens..."]') as HTMLInputElement;
            if (searchInput) {
                searchInput.focus();
            }
            toast.success("Token removed from saved tokens");
        } catch (error) {
            toast.error("Failed to remove token from saved tokens");
            throw error;
        }
    }
    
    const addSaveToken = async () => {
        try {
            await saveToken();
            toast.success("Token added to saved tokens");
        } catch (error) {
            toast.error("Failed to add token to saved tokens");
            throw error;
        }
    }

    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (isUpdating) {
            return;
        }

        if (isTokenSaved) {
            await removeSaveToken();
        } else {
            await addSaveToken();
        }
    }

    return (
        <div 
            onClick={handleClick}
            className={cn(
                "size-6 shrink-0 dark:hover:bg-neutral-700 hover:bg-neutral-200 rounded-md transition-all duration-300 flex items-center justify-center", 
                isUpdating && "pointer-events-none cursor-not-allowed opacity-50",
                className
            )}
        >
            {
                isUpdating ? (
                    <Loader2 className="size-4 animate-spin" />
                ) : (
                    <Star className={cn("size-4", isTokenSaved && "text-brand-600")} />
                )
            }
        </div>
    )
}

export default SaveToken;