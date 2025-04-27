import { Workout } from '../types/workout';
import { getFirestore, collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';

const db = getFirestore();

/**
 * Service for handling workout-related operations
 */
export const workoutService = {
    /**
     * Get a workout by its ID
     * @param workoutId - The ID of the workout to retrieve
     * @returns Promise<Workout | null> - The workout if found, null otherwise
     */
    async getWorkoutById(workoutId: string): Promise<Workout | null> {
        try {
            const workoutDoc = await getDoc(doc(db, 'workouts', workoutId));
            if (!workoutDoc.exists()) {
                return null;
            }
            return { id: workoutDoc.id, ...workoutDoc.data() } as Workout;
        } catch (error) {
            console.error('Error getting workout:', error);
            throw error;
        }
    },

    /**
     * Get all workouts for a specific user
     * @param userId - The ID of the user whose workouts to retrieve
     * @returns Promise<Workout[]> - Array of workouts
     */
    async getUserWorkouts(userId: string): Promise<Workout[]> {
        try {
            const workoutsQuery = query(
                collection(db, 'workouts'),
                where('userId', '==', userId)
            );
            const querySnapshot = await getDocs(workoutsQuery);
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Workout[];
        } catch (error) {
            console.error('Error getting user workouts:', error);
            throw error;
        }
    }
}; 