import { Exercise } from '../../types/exercise';
import { exerciseService } from '../exerciseService';
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

describe('exerciseService', () => {
    const mockExercise: Exercise = {
        id: 'exercise-1',
        name: 'Bench Press',
        sets: 3,
        reps: 10,
        weight: 60,
        restTime: 90,
        notes: 'Focus on form'
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getExerciseById', () => {
        it('should return an exercise when it exists', async () => {
            const mockDocSnap = {
                exists: () => true,
                data: () => mockExercise
            };

            (doc as jest.Mock).mockReturnValue('mock-doc-ref');
            (getDoc as jest.Mock).mockResolvedValue(mockDocSnap);

            const result = await exerciseService.getExerciseById(mockExercise.id);

            expect(doc).toHaveBeenCalledWith({ type: 'firestore' }, 'exercises', mockExercise.id);
            expect(getDoc).toHaveBeenCalledWith('mock-doc-ref');
            expect(result).toEqual(mockExercise);
        });

        it('should return null when exercise does not exist', async () => {
            const mockDocSnap = {
                exists: () => false,
                data: () => null
            };

            (doc as jest.Mock).mockReturnValue('mock-doc-ref');
            (getDoc as jest.Mock).mockResolvedValue(mockDocSnap);

            const result = await exerciseService.getExerciseById('non-existent-id');

            expect(result).toBeNull();
        });

        it('should throw an error when retrieval fails', async () => {
            const error = new Error('Retrieval failed');
            (doc as jest.Mock).mockReturnValue('mock-doc-ref');
            (getDoc as jest.Mock).mockRejectedValue(error);

            await expect(exerciseService.getExerciseById(mockExercise.id)).rejects.toThrow('Retrieval failed');
        });
    });

    describe('getWorkoutExercises', () => {
        const workoutId = 'workout-1';

        it('should return all exercises for a workout', async () => {
            const mockQuerySnapshot = {
                docs: [
                    {
                        id: mockExercise.id,
                        data: () => mockExercise
                    }
                ]
            };

            (collection as jest.Mock).mockReturnValue('mock-collection');
            (query as jest.Mock).mockReturnValue('mock-query');
            (where as jest.Mock).mockReturnValue('mock-where');
            (getDocs as jest.Mock).mockResolvedValue(mockQuerySnapshot);

            const result = await exerciseService.getWorkoutExercises(workoutId);

            expect(collection).toHaveBeenCalledWith({ type: 'firestore' }, 'exercises');
            expect(query).toHaveBeenCalledWith('mock-collection', 'mock-where');
            expect(where).toHaveBeenCalledWith('workoutId', '==', workoutId);
            expect(result).toEqual([mockExercise]);
        });

        it('should return empty array when workout has no exercises', async () => {
            const mockQuerySnapshot = {
                docs: []
            };

            (collection as jest.Mock).mockReturnValue('mock-collection');
            (query as jest.Mock).mockReturnValue('mock-query');
            (where as jest.Mock).mockReturnValue('mock-where');
            (getDocs as jest.Mock).mockResolvedValue(mockQuerySnapshot);

            const result = await exerciseService.getWorkoutExercises(workoutId);

            expect(result).toEqual([]);
        });

        it('should throw an error when retrieval fails', async () => {
            const error = new Error('Retrieval failed');
            (collection as jest.Mock).mockReturnValue('mock-collection');
            (query as jest.Mock).mockReturnValue('mock-query');
            (where as jest.Mock).mockReturnValue('mock-where');
            (getDocs as jest.Mock).mockRejectedValue(error);

            await expect(exerciseService.getWorkoutExercises(workoutId)).rejects.toThrow('Retrieval failed');
        });
    });

    describe('createExercise', () => {
        it('should create a new exercise and return it with an id', async () => {
            const newExercise: Omit<Exercise, 'id'> = {
                name: 'Squats',
                sets: 4,
                reps: 12,
                weight: 80,
                restTime: 120,
                notes: 'Keep back straight'
            };

            const mockDocRef = {
                id: 'new-exercise-id'
            };

            (collection as jest.Mock).mockReturnValue('mock-collection');
            (addDoc as jest.Mock).mockResolvedValue(mockDocRef);

            const result = await exerciseService.createExercise(newExercise);

            expect(collection).toHaveBeenCalledWith({ type: 'firestore' }, 'exercises');
            expect(addDoc).toHaveBeenCalledWith('mock-collection', newExercise);
            expect(result).toEqual({
                id: 'new-exercise-id',
                ...newExercise
            });
        });

        it('should throw an error when creation fails', async () => {
            const newExercise: Omit<Exercise, 'id'> = {
                name: 'Squats',
                sets: 4,
                reps: 12,
                weight: 80,
                restTime: 120,
                notes: 'Keep back straight'
            };

            const error = new Error('Creation failed');
            (collection as jest.Mock).mockReturnValue('mock-collection');
            (addDoc as jest.Mock).mockRejectedValue(error);

            await expect(exerciseService.createExercise(newExercise)).rejects.toThrow('Creation failed');
        });
    });
}); 