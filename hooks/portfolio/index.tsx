import { useSpidexCoreContext } from "@/app/_contexts";
import { useEffect } from "react";
import { useState } from "react";
import { PortfolioToken, PortfolioTransaction } from "./type";


export const usePortfolioToken = (address?: string) => {
    const { getPortfolioToken } = useSpidexCoreContext();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<PortfolioToken | null>(null);

    useEffect(() => {
        fetchPortfolioToken()
    },[address])

    const fetchPortfolioToken = async () => {
        setLoading(true)
        setError(null)
        try {
            const data = await getPortfolioToken(address)
            setData(data)
        } catch (error) {
            setError(error as string)
        } finally {
            setLoading(false)
        }
    }

    return {
        data,
        loading,
        error
    }
}

export const usePortfolioTransaction = (address?: string) => {
    const { getPortfolioTransaction } = useSpidexCoreContext();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<PortfolioTransaction[]>([]);
    useEffect(() => {
        fetchPortfolioTransaction()
    },[address])

    const fetchPortfolioTransaction = async () => {
        setLoading(true)
        setError(null)
        try {
            const data = await getPortfolioTransaction(address)
            setData(data)
        } catch (error) {
            setError(error as string)
        } finally {
            setLoading(false)
        }
    }

    return {
        data,
        loading,
        error
    }
}
