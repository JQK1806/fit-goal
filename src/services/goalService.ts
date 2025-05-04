import { Goal } from '../types/goal';
import { collection, getDocs, query, where, doc, getDoc, addDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

/**
 * Service for handling goal-related operations
 */
export const goalService = {
    /**
     * Get a goal by its ID
     * @param goalId - The ID of the goal to retrieve
     * @returns Promise<Goal | null> - The goal if found, null otherwise
     */
    async getGoalById(goalId: string): Promise<Goal | null> {
        try {
            const goalDoc = await getDoc(doc(db, 'goals', goalId));
            if (!goalDoc.exists()) {
                return null;
            }
            return { id: goalDoc.id, ...goalDoc.data() } as Goal;
        } catch (error) {
            console.error('Error getting goal:', error);
            throw error;
        }
    },

    /**
     * Get all goals for a specific user
     * @param userId - The ID of the user whose goals to retrieve
     * @returns Promise<Goal[]> - Array of goals
     */
    async getUserGoals(userId: string): Promise<Goal[]> {
        try {
            const goalsQuery = query(
                collection(db, 'goals'),
                where('userId', '==', userId)
            );
            const querySnapshot = await getDocs(goalsQuery);
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Goal[];
        } catch (error) {
            console.error('Error getting user goals:', error);
            throw error;
        }
    },

    /**
     * Create a new goal
     * @param goal - The goal data to create
     * @returns Promise<Goal> - The created goal with id
     */
    async createGoal(goal: Omit<Goal, 'id'>): Promise<Goal> {
        try {
            const docRef = await addDoc(collection(db, 'goals'), goal);
            return {
                id: docRef.id,
                ...goal
            } as Goal;
        } catch (error) {
            console.error('Error creating goal:', error);
            throw error;
        }
    },

    /**
     * Update a goal's progress
     * @param goalId - The ID of the goal to update
     * @param progress - The new progress value (0-100)
     * @returns Promise<void>
     */
    async updateGoalProgress(goalId: string, progress: number): Promise<void> {
        try {
            const goalRef = doc(db, 'goals', goalId);
            await updateDoc(goalRef, {
                progress: Math.min(100, Math.max(0, progress)),
                completed: progress >= 100
            });
        } catch (error) {
            console.error('Error updating goal progress:', error);
            throw error;
        }
    },

    /**
     * Update a goal's completion status
     * @param goalId - The ID of the goal to update
     * @param completed - Whether the goal is completed
     * @returns Promise<void>
     */
    async updateGoalCompletion(goalId: string, completed: boolean): Promise<void> {
        try {
            const goalRef = doc(db, 'goals', goalId);
            await updateDoc(goalRef, {
                completed,
                progress: completed ? 100 : 0
            });
        } catch (error) {
            console.error('Error updating goal completion:', error);
            throw error;
        }
    }
}; 