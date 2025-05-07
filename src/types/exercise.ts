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