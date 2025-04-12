'use client'

import { useSpidexCore } from "../core/useSpidexCore";

import { useEffect, useState } from "react";
import { ReferralInfo } from "./type";

export const useRefInfo = () => {
    const { getUserRefMeInfo } = useSpidexCore();

    const [referralInfo, setReferralInfo] = useState<ReferralInfo | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
      fetchRefInfo()
    }, []);

    const fetchRefInfo = async () => {
        try {
            setLoading(true);
            const data = await getUserRefMeInfo();
            setReferralInfo(data);
        } catch (error) {
            setError(error as string);
        } finally {
            setLoading(false);
        }
    }

    return { referralInfo, loading, error };
}

export const useRefHistory = () => {
    const { getUserRefHistory } = useSpidexCore();

    const [referralHistory, setReferralHistory] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchRefHistory();
    }, []); 

    const fetchRefHistory = async () => {
        try {
            setLoading(true);
            const data = await getUserRefHistory();
            setReferralHistory(data);
        } catch (error) {
            setError(error as string);
        } finally {
            setLoading(false);
        }
    }

    return { referralHistory, loading, error }; 
}


export const useRefReferredUsers = ({ page = 1, perPage = 10 }: { page?: number, perPage?: number }) => {
    const { getUserRefMeReferredUsers } = useSpidexCore();

    const [referralReferredUsers, setReferralReferredUsers] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
     
    useEffect(() => {
        fetchRefReferredUsers();
    }, [page, perPage]);

    const fetchRefReferredUsers = async () => {
        try { 
            setLoading(true);
            const data = await getUserRefMeReferredUsers(page, perPage);
            setReferralReferredUsers(data);
        } catch (error) {
            setError(error as string);
        } finally {
            setLoading(false);
        } 
    }

    return { referralReferredUsers, loading, error };
}
