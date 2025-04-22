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

/**
 * Represents an exercise
 * 
 * @property {string} id - The unique identifier for the exercise
 * @property {string} name - The name of the exercise
 * @property {number} sets - The number of sets that were done of the exercise
 * @property {number} reps - The number of reps that were done of the exercise
 * @property {number} weight - The weight that was used in the exercise (in kg)
 * @property {number} duration - Duration of the exercise in seconds (for timed exercises)
 * @property {number} restTime - Rest time between sets in seconds
 * @property {string} notes - Additional notes about the exercise
 */ 
export interface Exercise {
    id: string;
    name: string;
    sets: number;
    reps: number;
    weight?: number;
    duration?: number;
    restTime?: number;
    notes?: string;
}