'use client'


import { useEffect, useState } from "react";

import { useSpidexCoreContext } from "@/app/_contexts/spidex-core";
import { PointHistory, PointInfo, Quest } from "./type";

export const usePointInfo = () => {
    const {getUserPointMeInfo} = useSpidexCoreContext()

    const [pointInfo, setPointInfo] = useState<PointInfo>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchPointInfo();
    }, []);

    const fetchPointInfo = async () => {
        try {
            setLoading(true);
            const data = await getUserPointMeInfo();
            setPointInfo(data);
        } catch (error) {
            setError(error as string);
        } finally {
            setLoading(false);
        }
    }

    return { pointInfo, loading, error };

}

export const useQuests = () => {
    const {getUserQuests} = useSpidexCoreContext()

    const [quests, setQuests] = useState<Quest[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchQuests();
    }, []);     

    const fetchQuests = async () => {
        try {
            setLoading(true);
            const data = await getUserQuests();
            setQuests(data);
        } catch (error) {
            setError(error as string);
        } finally {
            setLoading(false);
        }
    }

    return { quests, loading, error, fetchQuests };
}

export const usePointHistory = () => {
    const {getUserPointHistory} = useSpidexCoreContext()

    const [pointHistory, setPointHistory] = useState<PointHistory[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchPointHistory();
    }, []);

    const fetchPointHistory = async () => {
        try {
            setLoading(true);
            const data = await getUserPointHistory();
            setPointHistory(data);
        } catch (error) {
            setError(error as string);
        } finally {
            setLoading(false);
        }
    }

    return { pointHistory, loading, error };
    
}
