import { UserProfile } from '../types/user';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

/**
 * Service for handling user-related operations
 */
export const userService = {
    /**
     * Creates a new user profile in Firestore
     * @param userProfile The user profile to create
     * @returns Promise<void>
     */
    async createUserProfile(userProfile: UserProfile): Promise<void> {
        try {
            console.log('Creating user profile with data:', userProfile);
            const userRef = doc(db, 'users', userProfile.id);
            await setDoc(userRef, {
                ...userProfile,
                createdOn: new Date(),
            });
            console.log('User profile created successfully');
        } catch (error) {
            console.error('Error in createUserProfile:', error);
            throw error;
        }
    },

    /**
     * Retrieves a user profile from Firestore
     * @param userId The ID of the user to retrieve
     * @returns Promise<UserProfile | null>
     */
    async getUserProfile(userId: string): Promise<UserProfile | null> {
        try {
            const userRef = doc(db, 'users', userId);
            const userSnap = await getDoc(userRef);
            
            if (userSnap.exists()) {
                return userSnap.data() as UserProfile;
            }
            return null;
        } catch (error) {
            console.error('Error in getUserProfile:', error);
            throw error;
        }
    },

    /**
     * Updates an existing user profile
     * @param userId The ID of the user to update
     * @param updates The partial user profile data to update
     * @returns Promise<void>
     */
    async updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<void> {
        try {
            const userRef = doc(db, 'users', userId);
            await updateDoc(userRef, {
                ...updates,
                updatedOn: new Date(),
            });
            console.log('User profile updated successfully');
        } catch (error) {
            console.error('Error in updateUserProfile:', error);
            throw error;
        }
    }
};
