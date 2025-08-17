'use client'


import { useEffect, useState } from "react";

import { Achievement, PointHistory, PointInfo, Quest } from "./type";
import { useSpidexCore } from "../core/useSpidexCore";

export const usePointInfo = () => {
    const {getUserPointMeInfo, getAchievements} = useSpidexCore()

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

    const refetchPointInfo = async () => {
        const data = await getUserPointMeInfo();
        setPointInfo(data);
        const dataAchievements = await getAchievements();
        if (dataAchievements.length > 0) {
            setAchievements(dataAchievements);
        } else {
            setAchievements([]);
        }
    }

    return { pointInfo, loading, error, achievements, refetchPointInfo };

}

export const useQuests = () => {
    const {getUserQuests} = useSpidexCore()

    const [currentPage, setCurrentPage] = useState(0); 
    const [totalPages, setTotalPages] = useState(0); 
    const [perPage] = useState(10);
    const [quests, setQuests] = useState<Quest[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchQuests();
    }, [currentPage]);     

    const fetchQuests = async () => {
        try {
            setLoading(true);
            const data = await getUserQuests(currentPage + 1, perPage);
            setQuests(data.data);
            setTotalPages(Math.ceil(data.metadata.total / perPage));
        } catch (error) {
            setError(error as string);
        } finally {
            setLoading(false);
        }
    }

    const refetchQuests = async () => {
        setCurrentPage(0); 
        const data = await getUserQuests(1, perPage);
        setQuests(data.data);
        setTotalPages(Math.ceil(data.metadata.total / perPage));
    }

    return { quests, loading, error, fetchQuests, currentPage, setCurrentPage, totalPages, refetchQuests };
}

export const usePointHistory = () => {
    const {getUserPointHistory} = useSpidexCore()

    const [currentPage, setCurrentPage] = useState(0); 
    const [totalPages, setTotalPages] = useState(0); 
    const [perPage] = useState(8);
    const [pointHistory, setPointHistory] = useState<PointHistory[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchPointHistory();
    }, [currentPage]);

    const fetchPointHistory = async () => {
        try {
            setLoading(true);
            const data = await getUserPointHistory(currentPage + 1, perPage);
            console.log("🚀 ~ fetchPointHistory ~ data:", data)
            setPointHistory(data.data);
            setTotalPages(Math.ceil(data.metadata.total / perPage));
        } catch (error) {
            setError(error as string);
        } finally {
            setLoading(false);
        }
    }

    const refetchPointHistory = async () => {
        setCurrentPage(0); 
        const data = await getUserPointHistory(1, perPage);
        console.log("🚀 ~ refetchPointHistory ~ data:", data)
        setPointHistory(data.data);
        setTotalPages(Math.ceil(data.metadata.total / perPage));
    }

    return { pointHistory, loading, error, refetchPointHistory, totalPages, currentPage, setCurrentPage };
    
}
