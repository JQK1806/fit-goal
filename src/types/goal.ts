/**
 * Represents a fitness goal in the application
 * 
 * @interface Goal
 * @property {string} id - Unique identifier for the goal
 * @property {string} name - Name/title of the goal
 * @property {string} description - Detailed description of what the goal entails
 * @property {number} progess - Current progress towards the goal (0-100)
 */

export interface Goal {
    id: string;
    name: string;
    description: string;
    progess: number;
}