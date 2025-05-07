import { Exercise } from '../types/exercise';
import { collection, getDocs, query, where, doc, getDoc, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

/**
 * Service for handling exercise-related operations
 */
export const exerciseService = {
    /**
     * Get an exercise by its ID
     * @param exerciseId - The ID of the exercise to retrieve
     * @returns Promise<Exercise | null> - The exercise if found, null otherwise
     */
    async getExerciseById(exerciseId: string): Promise<Exercise | null> {
        try {
            const exerciseDoc = await getDoc(doc(db, 'exercises', exerciseId));
            if (!exerciseDoc.exists()) {
                return null;
            }
            return { id: exerciseDoc.id, ...exerciseDoc.data() } as Exercise;
        } catch (error) {
            console.error('Error getting exercise:', error);
            throw error;
        }
    },

    /**
     * Get all exercises for a specific workout
     * @param workoutId - The ID of the workout whose exercises to retrieve
     * @returns Promise<Exercise[]> - Array of exercises
     */
    async getWorkoutExercises(workoutId: string): Promise<Exercise[]> {
        try {
            const exercisesQuery = query(
                collection(db, 'exercises'),
                where('workoutId', '==', workoutId)
            );
            const querySnapshot = await getDocs(exercisesQuery);
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Exercise[];
        } catch (error) {
            console.error('Error getting workout exercises:', error);
            throw error;
        }
    },

    /**
     * Create a new exercise
     * @param exercise - The exercise data to create
     * @returns Promise<Exercise> - The created exercise with id
     */
    async createExercise(exercise: Omit<Exercise, 'id'>): Promise<Exercise> {
        try {
            const docRef = await addDoc(collection(db, 'exercises'), exercise);
            return {
                id: docRef.id,
                ...exercise
            } as Exercise;
        } catch (error) {
            console.error('Error creating exercise:', error);
            throw error;
        }
    }
}; 