'use client'


import { useEffect, useState } from "react";

import { useSpidexCoreContext } from "@/app/_contexts/spidex-core";
import { Achievement, PointHistory, PointInfo, Quest } from "./type";

export const usePointInfo = () => {
    const {getUserPointMeInfo, getAchievements} = useSpidexCoreContext()

    const [pointInfo, setPointInfo] = useState<PointInfo>();
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchPointInfo();
        fetchAchievements();
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

    const fetchAchievements = async () => {
        try {
            const data = await getAchievements();
            if (data.length > 0) {
                setAchievements(data);
            } else {
                setAchievements([]);
            }
        } catch (error) {
            setError(error as string);
        } finally {
         
        }

    }

    return { pointInfo, loading, error, achievements };

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

    const refetchPointHistory = async () => {
        await fetchPointHistory();
    }

    return { pointHistory, loading, error, refetchPointHistory };
    
}
