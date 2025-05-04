import { Goal } from '../../types/goal';
import { goalService } from '../goalService';
import { collection, getDocs, query, where, doc, getDoc, addDoc, updateDoc } from 'firebase/firestore';

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
    updateDoc: jest.fn(),
}));

describe('goalService', () => {
    const mockGoal: Goal = {
        id: 'goal-1',
        userId: 'user-1',
        name: 'Lose 5kg',
        description: 'Lose 5kg in 3 months',
        progress: 30,
        startDate: new Date('2024-01-01'),
        targetDate: new Date('2024-04-01'),
        type: 'weight',
        targetValue: 5,
        unit: 'kg',
        completed: false
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getGoalById', () => {
        it('should return a goal when it exists', async () => {
            const mockDocSnap = {
                exists: () => true,
                data: () => mockGoal
            };

            (doc as jest.Mock).mockReturnValue('mock-doc-ref');
            (getDoc as jest.Mock).mockResolvedValue(mockDocSnap);

            const result = await goalService.getGoalById(mockGoal.id);

            expect(doc).toHaveBeenCalledWith({ type: 'firestore' }, 'goals', mockGoal.id);
            expect(getDoc).toHaveBeenCalledWith('mock-doc-ref');
            expect(result).toEqual(mockGoal);
        });

        it('should return null when goal does not exist', async () => {
            const mockDocSnap = {
                exists: () => false,
                data: () => null
            };

            (doc as jest.Mock).mockReturnValue('mock-doc-ref');
            (getDoc as jest.Mock).mockResolvedValue(mockDocSnap);

            const result = await goalService.getGoalById('non-existent-id');

            expect(result).toBeNull();
        });

        it('should throw an error when retrieval fails', async () => {
            const error = new Error('Retrieval failed');
            (doc as jest.Mock).mockReturnValue('mock-doc-ref');
            (getDoc as jest.Mock).mockRejectedValue(error);

            await expect(goalService.getGoalById(mockGoal.id)).rejects.toThrow('Retrieval failed');
        });
    });

    describe('getUserGoals', () => {
        it('should return all goals for a user', async () => {
            const mockQuerySnapshot = {
                docs: [
                    {
                        id: mockGoal.id,
                        data: () => mockGoal
                    }
                ]
            };

            (collection as jest.Mock).mockReturnValue('mock-collection');
            (query as jest.Mock).mockReturnValue('mock-query');
            (where as jest.Mock).mockReturnValue('mock-where');
            (getDocs as jest.Mock).mockResolvedValue(mockQuerySnapshot);

            const result = await goalService.getUserGoals(mockGoal.userId);

            expect(collection).toHaveBeenCalledWith({ type: 'firestore' }, 'goals');
            expect(query).toHaveBeenCalledWith('mock-collection', 'mock-where');
            expect(where).toHaveBeenCalledWith('userId', '==', mockGoal.userId);
            expect(result).toEqual([mockGoal]);
        });

        it('should return empty array when user has no goals', async () => {
            const mockQuerySnapshot = {
                docs: []
            };

            (collection as jest.Mock).mockReturnValue('mock-collection');
            (query as jest.Mock).mockReturnValue('mock-query');
            (where as jest.Mock).mockReturnValue('mock-where');
            (getDocs as jest.Mock).mockResolvedValue(mockQuerySnapshot);

            const result = await goalService.getUserGoals(mockGoal.userId);

            expect(result).toEqual([]);
        });

        it('should throw an error when retrieval fails', async () => {
            const error = new Error('Retrieval failed');
            (collection as jest.Mock).mockReturnValue('mock-collection');
            (query as jest.Mock).mockReturnValue('mock-query');
            (where as jest.Mock).mockReturnValue('mock-where');
            (getDocs as jest.Mock).mockRejectedValue(error);

            await expect(goalService.getUserGoals(mockGoal.userId)).rejects.toThrow('Retrieval failed');
        });
    });

    describe('createGoal', () => {
        it('should create a new goal and return it with an id', async () => {
            const newGoal: Omit<Goal, 'id'> = {
                userId: 'user-1',
                name: 'Run 5km',
                description: 'Run 5km without stopping',
                progress: 0,
                startDate: new Date('2024-01-01'),
                targetDate: new Date('2024-04-01'),
                type: 'distance',
                targetValue: 5,
                unit: 'km',
                completed: false
            };

            const mockDocRef = {
                id: 'new-goal-id'
            };

            (collection as jest.Mock).mockReturnValue('mock-collection');
            (addDoc as jest.Mock).mockResolvedValue(mockDocRef);

            const result = await goalService.createGoal(newGoal);

            expect(collection).toHaveBeenCalledWith({ type: 'firestore' }, 'goals');
            expect(addDoc).toHaveBeenCalledWith('mock-collection', newGoal);
            expect(result).toEqual({
                id: 'new-goal-id',
                ...newGoal
            });
        });

        it('should throw an error when creation fails', async () => {
            const newGoal: Omit<Goal, 'id'> = {
                userId: 'user-1',
                name: 'Run 5km',
                description: 'Run 5km without stopping',
                progress: 0,
                startDate: new Date('2024-01-01'),
                targetDate: new Date('2024-04-01'),
                type: 'distance',
                targetValue: 5,
                unit: 'km',
                completed: false
            };

            const error = new Error('Creation failed');
            (collection as jest.Mock).mockReturnValue('mock-collection');
            (addDoc as jest.Mock).mockRejectedValue(error);

            await expect(goalService.createGoal(newGoal)).rejects.toThrow('Creation failed');
        });
    });

    describe('updateGoalProgress', () => {
        it('should update goal progress and completion status', async () => {
            (doc as jest.Mock).mockReturnValue('mock-doc-ref');
            (updateDoc as jest.Mock).mockResolvedValue(undefined);

            await goalService.updateGoalProgress('goal-1', 75);

            expect(doc).toHaveBeenCalledWith({ type: 'firestore' }, 'goals', 'goal-1');
            expect(updateDoc).toHaveBeenCalledWith('mock-doc-ref', {
                progress: 75,
                completed: false
            });
        });

        it('should cap progress at 100', async () => {
            (doc as jest.Mock).mockReturnValue('mock-doc-ref');
            (updateDoc as jest.Mock).mockResolvedValue(undefined);

            await goalService.updateGoalProgress('goal-1', 150);

            expect(updateDoc).toHaveBeenCalledWith('mock-doc-ref', {
                progress: 100,
                completed: true
            });
        });

        it('should cap progress at 0', async () => {
            (doc as jest.Mock).mockReturnValue('mock-doc-ref');
            (updateDoc as jest.Mock).mockResolvedValue(undefined);

            await goalService.updateGoalProgress('goal-1', -50);

            expect(updateDoc).toHaveBeenCalledWith('mock-doc-ref', {
                progress: 0,
                completed: false
            });
        });
    });

    describe('updateGoalCompletion', () => {
        it('should update goal completion status and progress', async () => {
            (doc as jest.Mock).mockReturnValue('mock-doc-ref');
            (updateDoc as jest.Mock).mockResolvedValue(undefined);

            await goalService.updateGoalCompletion('goal-1', true);

            expect(doc).toHaveBeenCalledWith({ type: 'firestore' }, 'goals', 'goal-1');
            expect(updateDoc).toHaveBeenCalledWith('mock-doc-ref', {
                completed: true,
                progress: 100
            });
        });

        it('should set progress to 0 when marking as incomplete', async () => {
            (doc as jest.Mock).mockReturnValue('mock-doc-ref');
            (updateDoc as jest.Mock).mockResolvedValue(undefined);

            await goalService.updateGoalCompletion('goal-1', false);

            expect(updateDoc).toHaveBeenCalledWith('mock-doc-ref', {
                completed: false,
                progress: 0
            });
        });
    });
}); 