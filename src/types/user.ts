/**
 * Represents a users' profile
 * 
 * @property {string} id - The unique identifier of the user
 * @property {string} displayName - The user's display name
 * @property {string} email - The email of the user
 * @property {string} photo - The users profile picture
 * @property {Date} createdOn - The creation date of the profile
 * @property {number} height - The height of the user
 * @property {number} weight - The weight of the user
 * @property {number} age - The age of the user
 * @property {string} gender - The gender of the user
 * @property {'beginner' | 'intermediate' | 'advanced'} fitnessLevel - Fitness level of the user: beginner, intermediate, or advanced
 */
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