import { useState } from "react";

export const useTokenDetail = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
  
    const getTokenDetail = async (address: string) => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/tokens/detail?tokenId=${encodeURIComponent(address)}&verified=true`);
        const data = await response.json();
        return data;
      } catch (error) {
        setError(error as string);
      } finally {
        setIsLoading(false);
      }
    };
  
    return {
      isLoading,
      error,
      getTokenDetail
    };
  };
  