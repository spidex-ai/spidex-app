'use client'

import { useSpidexCore } from "../core/useSpidexCore";

import { useEffect, useState } from "react";
import { MyRefItem, ReferralInfo, RefHistoryItem } from "./type";
import { useSpidexCoreContext } from "@/app/_contexts/spidex-core";

export const useRefInfo = () => {
    const { getUserRefMeInfo } = useSpidexCoreContext();

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

export const useRefHistory = ({ page = 1, perPage = 10 }: { page?: number, perPage?: number }) => {
    const { getUserRefHistory } = useSpidexCoreContext();

    const [referralHistory, setReferralHistory] = useState<RefHistoryItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchRefHistory();
    }, [page, perPage]); 

    const fetchRefHistory = async () => {
        try {
            setLoading(true);
            const data = await getUserRefHistory(page, perPage);
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
    const { getUserRefMeReferredUsers } = useSpidexCoreContext();

    const [myRefUsers, setMyRefUsers] = useState<MyRefItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
     
    useEffect(() => {
        fetchRefReferredUsers();
    }, [page, perPage]);

    const fetchRefReferredUsers = async () => {
        try { 
            setLoading(true);
            const data = await getUserRefMeReferredUsers(page, perPage);
            setMyRefUsers(data);
        } catch (error) {
            setError(error as string);
        } finally {
            setLoading(false);
        } 
    }

    return { myRefUsers, loading, error };
}
