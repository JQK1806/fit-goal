import { Workout, Exercise } from '../../types/workout';
import { workoutService } from '../workoutService';
import { collection, getDocs, query, where, doc, getDoc, addDoc } from 'firebase/firestore';

// Mock the db import from firebaseConfig
jest.mock('../../../firebase/firebaseConfig', () => ({
    db: { type: 'firestore' }
}));

jest.mock('firebase/firestore', () => ({
    collection: jest.fn(),
    getDocs: jest.fn(),
    query: jest.fn(),
    where: jest.fn(),
    doc: jest.fn(),
    getDoc: jest.fn(),
    addDoc: jest.fn(),
}));

describe('workoutService', () => {
    const mockExercise: Exercise = {
        id: 'exercise-1',
        name: 'Bench Press',
        sets: 3,
        reps: 10,
        weight: 60,
        restTime: 90,
        notes: 'Focus on form'
    };

    const mockWorkout: Workout = {
        id: 'workout-1',
        userId: 'user-1',
        name: 'Chest Day',
        description: 'Upper body strength training',
        duration: 60,
        exercises: [mockExercise],
        date: new Date('2024-04-23'),
        type: 'strength',
        intensity: 8,
        caloriesBurned: 400
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getWorkoutById', () => {
        it('should return a workout when it exists', async () => {
            const mockDocSnap = {
                exists: () => true,
                data: () => mockWorkout
            };

            (doc as jest.Mock).mockReturnValue('mock-doc-ref');
            (getDoc as jest.Mock).mockResolvedValue(mockDocSnap);

            const result = await workoutService.getWorkoutById(mockWorkout.id);

            expect(doc).toHaveBeenCalledWith({ type: 'firestore' }, 'workouts', mockWorkout.id);
            expect(getDoc).toHaveBeenCalledWith('mock-doc-ref');
            expect(result).toEqual(mockWorkout);
        });

        it('should return null when workout does not exist', async () => {
            const mockDocSnap = {
                exists: () => false,
                data: () => null
            };

            (doc as jest.Mock).mockReturnValue('mock-doc-ref');
            (getDoc as jest.Mock).mockResolvedValue(mockDocSnap);

            const result = await workoutService.getWorkoutById('non-existent-id');

            expect(result).toBeNull();
        });

        it('should throw an error when retrieval fails', async () => {
            const error = new Error('Retrieval failed');
            (doc as jest.Mock).mockReturnValue('mock-doc-ref');
            (getDoc as jest.Mock).mockRejectedValue(error);

            await expect(workoutService.getWorkoutById(mockWorkout.id)).rejects.toThrow('Retrieval failed');
        });
    });

    describe('getUserWorkouts', () => {
        it('should return all workouts for a user', async () => {
            const mockQuerySnapshot = {
                docs: [
                    {
                        id: mockWorkout.id,
                        data: () => mockWorkout
                    }
                ]
            };

            (collection as jest.Mock).mockReturnValue('mock-collection');
            (query as jest.Mock).mockReturnValue('mock-query');
            (where as jest.Mock).mockReturnValue('mock-where');
            (getDocs as jest.Mock).mockResolvedValue(mockQuerySnapshot);

            const result = await workoutService.getUserWorkouts(mockWorkout.userId);

            expect(collection).toHaveBeenCalledWith({ type: 'firestore' }, 'workouts');
            expect(query).toHaveBeenCalledWith('mock-collection', 'mock-where');
            expect(where).toHaveBeenCalledWith('userId', '==', mockWorkout.userId);
            expect(result).toEqual([mockWorkout]);
        });

        it('should return empty array when user has no workouts', async () => {
            const mockQuerySnapshot = {
                docs: []
            };

            (collection as jest.Mock).mockReturnValue('mock-collection');
            (query as jest.Mock).mockReturnValue('mock-query');
            (where as jest.Mock).mockReturnValue('mock-where');
            (getDocs as jest.Mock).mockResolvedValue(mockQuerySnapshot);

            const result = await workoutService.getUserWorkouts(mockWorkout.userId);

            expect(result).toEqual([]);
        });

        it('should throw an error when retrieval fails', async () => {
            const error = new Error('Retrieval failed');
            (collection as jest.Mock).mockReturnValue('mock-collection');
            (query as jest.Mock).mockReturnValue('mock-query');
            (where as jest.Mock).mockReturnValue('mock-where');
            (getDocs as jest.Mock).mockRejectedValue(error);

            await expect(workoutService.getUserWorkouts(mockWorkout.userId)).rejects.toThrow('Retrieval failed');
        });
    });

    describe('createWorkout', () => {
        it('should create a new workout and return it with an id', async () => {
            const newWorkout: Omit<Workout, 'id'> = {
                userId: 'user-1',
                name: 'New Workout',
                description: 'Test workout',
                duration: 45,
                exercises: [mockExercise],
                date: new Date('2024-04-24'),
                type: 'strength',
                intensity: 7,
                caloriesBurned: 300
            };

            const mockDocRef = {
                id: 'new-workout-id'
            };

            (collection as jest.Mock).mockReturnValue('mock-collection');
            (addDoc as jest.Mock).mockResolvedValue(mockDocRef);

            const result = await workoutService.createWorkout(newWorkout);

            expect(collection).toHaveBeenCalledWith({ type: 'firestore' }, 'workouts');
            expect(addDoc).toHaveBeenCalledWith('mock-collection', newWorkout);
            expect(result).toEqual({
                id: 'new-workout-id',
                ...newWorkout
            });
        });

        it('should throw an error when creation fails', async () => {
            const newWorkout: Omit<Workout, 'id'> = {
                userId: 'user-1',
                name: 'New Workout',
                description: 'Test workout',
                duration: 45,
                exercises: [mockExercise],
                date: new Date('2024-04-24'),
                type: 'strength',
                intensity: 7,
                caloriesBurned: 300
            };

            const error = new Error('Creation failed');
            (collection as jest.Mock).mockReturnValue('mock-collection');
            (addDoc as jest.Mock).mockRejectedValue(error);

            await expect(workoutService.createWorkout(newWorkout)).rejects.toThrow('Creation failed');
        });
    });
}); 