export interface UserProfile {
    id: string;
    displayName: string;
    email: string;
    photoURL?: string;
    createdOn: Date;
    height?: number;
    weight?: number;
    age?: number;
    gender?: string;
    fitnessLevel?: 'beginner' | 'intermediate' | 'advanced';
}