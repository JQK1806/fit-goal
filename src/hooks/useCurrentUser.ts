import { useState, useEffect } from 'react';
import { auth } from '../../firebase/firebaseConfig';

/**
 * Custom hook to get the current authenticated user's ID
 * @returns {string | null} The current user's ID or null if not authenticated
 */
export const useCurrentUser = () => {
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUserId(user?.uid || null);
        });

        return () => unsubscribe();
    }, []);

    return userId;
}; 