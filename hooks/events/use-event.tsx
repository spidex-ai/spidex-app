'use client';

import { useEffect, useState } from 'react';
import { useSpidexCore } from '../core/useSpidexCore';
import { EventItem, EventLeaderboard, EventMyRank } from './type';
export enum EEventStatus {
  UPCOMING = 'upcoming',
  LIVE = 'live',
  ENDED = 'ended',
  DISTRIBUTED = 'distributed',
}

export const useEvent = (status: EEventStatus) => {
  const { getEvents } = useSpidexCore();

  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, [status]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const data = await getEvents(status);
      setEvents(data);
    } catch (error) {
      setError(error as string);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    events,
    loading,
    error,
  };
};

export const useEventLeaderboard = (id: number) => {
  const { getLeaderboardEvent, getMyRankLeaderboardEvent } = useSpidexCore();

  const [leaderboard, setLeaderboard] = useState<EventLeaderboard>();
  const [myRank, setMyRank] = useState<EventMyRank>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEventLeaderboard();
  }, [id]);

  useEffect(() => {
    fetchMyRankLeaderboard();
  }, [id]);

  const fetchEventLeaderboard = async () => {
    setLoading(true);
    console.log("🚀 ~ fetchEventLeaderboard ~ true:", true)
    try {
      const data = await getLeaderboardEvent(id);
      setLeaderboard(data);
    } catch (error) {
      setError(error as string);
    } finally { 
      setLoading(false);
    }
  };

  const fetchMyRankLeaderboard = async () => {
    setLoading(true);
    try {
      const data = await getMyRankLeaderboardEvent(id);
      setMyRank(data);
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  return {
    leaderboard,
    data: leaderboard?.leaderboard || [],
    myRank,
    loading,
    error,
  };
};
