import { UserProfile } from '../../types/user';
import { userService } from '../userService';
import { doc, setDoc, getDoc } from 'firebase/firestore';

// Mock the db import from firebaseConfig
jest.mock('../../../firebase/firebaseConfig', () => ({
    db: { type: 'firestore' }
}));

// Mock Firebase Firestore
jest.mock('firebase/firestore', () => ({
    doc: jest.fn(),
    setDoc: jest.fn(),
    getDoc: jest.fn(),
    updateDoc: jest.fn(),
}));

describe('userService', () => {
    const mockUser: UserProfile = {
        id: 'test-user-id',
        displayName: 'Test User',
        email: 'test@example.com',
        createdOn: new Date(),
        height: 180,
        weight: 75,
        age: 25,
        gender: 'male',
        fitnessLevel: 'intermediate'
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('createUserProfile', () => {
        it('should create a new user profile successfully', async () => {
            (doc as jest.Mock).mockReturnValue('mock-doc-ref');
            (setDoc as jest.Mock).mockResolvedValue(undefined);

            await userService.createUserProfile(mockUser);

            expect(doc).toHaveBeenCalledWith({ type: 'firestore' }, 'users', mockUser.id);
            expect(setDoc).toHaveBeenCalledWith(
                'mock-doc-ref',
                expect.objectContaining({
                    ...mockUser,
                    createdOn: expect.any(Date)
                })
            );
        });

        it('should throw an error when creation fails', async () => {
            const error = new Error('Creation failed');
            (doc as jest.Mock).mockReturnValue('mock-doc-ref');
            (setDoc as jest.Mock).mockRejectedValue(error);

            await expect(userService.createUserProfile(mockUser)).rejects.toThrow('Creation failed');
        });
    });

    describe('getUserProfile', () => {
        it('should return user profile when it exists', async () => {
            const mockDocSnap = {
                exists: () => true,
                data: () => mockUser
            };

            (doc as jest.Mock).mockReturnValue('mock-doc-ref');
            (getDoc as jest.Mock).mockResolvedValue(mockDocSnap);

            const result = await userService.getUserProfile(mockUser.id);

            expect(doc).toHaveBeenCalledWith({ type: 'firestore' }, 'users', mockUser.id);
            expect(getDoc).toHaveBeenCalledWith('mock-doc-ref');
            expect(result).toEqual(mockUser);
        });

        it('should return null when user profile does not exist', async () => {
            const mockDocSnap = {
                exists: () => false,
                data: () => null
            };

            (doc as jest.Mock).mockReturnValue('mock-doc-ref');
            (getDoc as jest.Mock).mockResolvedValue(mockDocSnap);

            const result = await userService.getUserProfile(mockUser.id);

            expect(result).toBeNull();
        });

        it('should throw an error when retrieval fails', async () => {
            const error = new Error('Retrieval failed');
            (doc as jest.Mock).mockReturnValue('mock-doc-ref');
            (getDoc as jest.Mock).mockRejectedValue(error);

            await expect(userService.getUserProfile(mockUser.id)).rejects.toThrow('Retrieval failed');
        });
    });
}); 