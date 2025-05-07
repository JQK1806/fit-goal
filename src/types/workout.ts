import { Exercise } from './exercise';

/**
 * Represents a Workout
 * 
 * @property {string} id - The unique identifier of the workout
 * @property {string} userId - ID of the user who performed the workout
 * @property {string} name - The name of the workout
 * @property {string} description - A description of the workout
 * @property {number} duration - The amount of time that the workout lasted (in minutes)
 * @property {Exercise[]} exercises - The exercises done in the workout
 * @property {string} notes - Notes about the workout
 * @property {Date} date - The date when the workout was performed
 * @property {string} type - The type of workout (e.g., 'strength', 'cardio', 'flexibility')
 * @property {number} caloriesBurned - Estimated calories burned during the workout
 * @property {number} intensity - Workout intensity level (1-10)
 */
export interface Workout {
    id: string;
    userId: string;
    name: string;
    description?: string;
    duration: number;
    exercises: Exercise[];
    notes?: string;
    date: Date;
    type: 'strength' | 'cardio' | 'flexibility' | 'hiit' | 'custom';
    caloriesBurned?: number;
    intensity: number;
}