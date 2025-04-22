/**
 * Represents a fitness goal in the application
 * 
 * @interface Goal
 * @property {string} id - Unique identifier for the goal
 * @property {string} userId - ID of the user who owns this goal
 * @property {string} name - Name/title of the goal
 * @property {string} description - Detailed description of what the goal entails
 * @property {number} progress - Current progress towards the goal (0-100)
 * @property {Date} startDate - When the goal was created
 * @property {Date} targetDate - When the goal should be completed by
 * @property {string} type - Type of goal (e.g., 'workout', 'weight', 'distance')
 * @property {number} targetValue - The target value to achieve
 * @property {string} unit - Unit of measurement (e.g., 'kg', 'km', 'workouts')
 * @property {boolean} completed - Whether the goal has been completed
 */

export interface Goal {
    id: string;
    userId: string;
    name: string;
    description: string;
    progress: number;
    startDate: Date;
    targetDate: Date;
    type: 'workout' | 'weight' | 'distance' | 'custom';
    targetValue: number;
    unit: string;
    completed: boolean;
}