export interface Workout {
    id: string;
    name: string;
    description?: string;
    duration?: number;
    exercises: Exercise[];
    notes?: string;
}

export interface Exercise {
    id: string;
    name: string;
    sets: number;
    reps: number;
    weight: number;
}