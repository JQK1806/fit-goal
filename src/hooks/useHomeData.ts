import { useState, useEffect } from 'react';
import { Workout } from '../types/workout';
import { Goal } from '../types/goal';
import { useCurrentUser } from './useCurrentUser';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

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
 * Uses real-time listeners to automatically update when data changes.
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
        if (!userId) {
            setWorkouts([]);
            setGoals([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        const workoutsQuery = query(
            collection(db, 'workouts'),
            where('userId', '==', userId)
        );

        const workoutsUnsubscribe = onSnapshot(
            workoutsQuery,
            (snapshot) => {
                const workoutData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Workout[];
                setWorkouts(workoutData);
                setLoading(false);
            },
            (err) => {
                console.error('Error listening to workouts:', err);
                setError('Failed to load workouts. Please try again.');
                setLoading(false);
            }
        );

        const goalsQuery = query(
            collection(db, 'goals'),
            where('userId', '==', userId)
        );

        const goalsUnsubscribe = onSnapshot(
            goalsQuery,
            (snapshot) => {
                const goalData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Goal[];
                setGoals(goalData);
                setLoading(false);
            },
            (err) => {
                console.error('Error listening to goals:', err);
                setError('Failed to load goals. Please try again.');
                setLoading(false);
            }
        );

        return () => {
            workoutsUnsubscribe();
            goalsUnsubscribe();
        };
    }, [userId]);

    return {
        workouts,
        goals,
        loading,
        error
    };
}; 