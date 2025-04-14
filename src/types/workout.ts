/**
 * Represents a Workout
 * 
 * @property {string} id - The unique identifier of the workout
 * @property {string} name - The name of the workout
 * @property {string} description - A description of the workout
 * @property {number} duration - The amount of time that the workout lasted
 * @property {Exercise[]} exercises - The exercises done in the workout
 * @property {string} notes - Notes about the workout
 * @property {string} date - The date when the workout was performed (ISO string)
 */
export interface Workout {
    id: string;
    name: string;
    description?: string;
    duration?: number;
    exercises: Exercise[];
    notes?: string;
    date?: string;
}

/**
 * Represents an exercise
 * 
 * @property {string} id - The unique identifier for the exercise
 * @property {string} name - The name of the exercise
 * @property {number} sets - The number of sets that were done of the exercise
 * @property {number} reps - The number of reps that were done of the exercise
 * @property {number} weight - The weight that was used in the exercise
 */ 
export interface Exercise {
    id: string;
    name: string;
    sets?: number;
    reps?: number;
    weight?: number;
}