import { UserProfile } from '../types/user';
import { getFirestore, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

const db = getFirestore();

/**
 * Creates a new user profile in Firestore
 * @param userProfile The user profile to create
 * @returns Promise<void>
 */
export const createUserProfile = async (userProfile: UserProfile): Promise<void> => {
    try {
        const userRef = doc(db, 'users', userProfile.id);
        await setDoc(userRef, {
            ...userProfile,
            createdOn: new Date(),
        });
    } catch (error) {
        throw error;
    }
};

/**
 * Retrieves a user profile from Firestore
 * @param userId The ID of the user to retrieve
 * @returns Promise<UserProfile | null>
 */
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
    try {
        const userRef = doc(db, 'users', userId);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
            return userSnap.data() as UserProfile;
        }
        return null;
    } catch (error) {
        throw error;
    }
};
