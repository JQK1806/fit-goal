import { useState, useEffect } from 'react';
import { Workout } from '../types/workout';
import { Goal } from '../types/goal';
import { workoutService } from '../services/workoutService';
import { goalService } from '../services/goalService';
import { useCurrentUser } from './useCurrentUser';

interface UseHomeDataReturn {
    workouts: Workout[];
    goals: Goal[];
    loading: boolean;
    error: string | null;
}

/**
 * Custom hook for managing home screen data
 * 
 * Manages the state for workouts and goals displayed on the home screen.
 * Fetches data for the currently authenticated user.
 * 
 * @returns {UseHomeDataReturn} Object containing workouts and goals state
 */
export const useHomeData = (): UseHomeDataReturn => {
    const userId = useCurrentUser();
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [goals, setGoals] = useState<Goal[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!userId) {
                setWorkouts([]);
                setGoals([]);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const [fetchedWorkouts, fetchedGoals] = await Promise.all([
                    workoutService.getUserWorkouts(userId),
                    goalService.getUserGoals(userId)
                ]);
                setWorkouts(fetchedWorkouts);
                setGoals(fetchedGoals);
                setError(null);
            } catch (err) {
                console.error('Error fetching home data:', err);
                setError('Failed to load data. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    return {
        workouts,
        goals,
        loading,
        error
    };
}; 