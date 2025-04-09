import { useState } from "react";
import { useEffect } from "react";


export const useCardanoTokenBalance = (tokenUnit: string, walletAddress: string) => {
    const [balance, setBalance] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
         fetchBalance()
    }, [tokenUnit, walletAddress]);

    const fetchBalance = async () => {
        setIsLoading(true);
        // TODO: Fetch balance from API
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
        setBalance(0);
    }

    return {
        balance,
        isLoading,
    }
}
