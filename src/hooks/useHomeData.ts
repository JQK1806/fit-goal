import { useState } from 'react';
import { Workout } from '../types/workout';
import { Goal } from '../types/goal';

interface UseHomeDataReturn {
    workouts: Workout[];
    goals: Goal[];
    setWorkouts: (workouts: Workout[]) => void;
    setGoals: (goals: Goal[]) => void;
}

/**
 * Custom hook for managing home screen data
 * 
 * Manages the state for workouts and goals displayed on the home screen.
 * Provides state management and update functions for both workouts and goals.
 * 
 * @returns {UseHomeDataReturn} Object containing workouts and goals state with their setters
 */
export const useHomeData = (): UseHomeDataReturn => {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [goals, setGoals] = useState<Goal[]>([]);

    return {
        workouts,
        goals,
        setWorkouts,
        setGoals
    };
}; 