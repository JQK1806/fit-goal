import { useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { userService } from '../services/userService';

interface UseAuthReturn {
    isLogin: boolean;
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    loading: boolean;
    alertVisible: boolean;
    alertTitle: string;
    alertMessage: string;
    showConfirmButton: boolean;
    setName: (name: string) => void;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    setConfirmPassword: (password: string) => void;
    setAlertVisible: (visible: boolean) => void;
    toggleAuthMode: () => void;
    handleAuth: () => Promise<void>;
    showAlert: (title: string, message: string, onConfirm?: () => void, showConfirm?: boolean) => void;
}

/**
 * Custom hook for handling user authentication
 * 
 * Manages the authentication state and logic for both login and signup flows.
 * It handles form validation, Firebase authentication, and user profile creation.
 * 
 * @param {() => void} onAuthSuccess - Callback function to be executed after successful authentication
 * @returns {UseAuthReturn} Object containing authentication state and methods
 */
export const useAuth = (onAuthSuccess: () => void): UseAuthReturn => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertOnConfirm, setAlertOnConfirm] = useState<(() => void) | undefined>(undefined);
    const [showConfirmButton, setShowConfirmButton] = useState(false);
    const [authSuccess, setAuthSuccess] = useState(false);

    useEffect(() => {
        if (authSuccess) {
            onAuthSuccess();
            setAuthSuccess(false);
        }
    }, [authSuccess, onAuthSuccess]);

    const showAlert = (title: string, message: string, onConfirm?: () => void, showConfirm = false) => {
        setAlertTitle(title);
        setAlertMessage(message);
        setAlertOnConfirm(onConfirm);
        setShowConfirmButton(showConfirm);
        setAlertVisible(true);
    };

    const validateForm = () => {
        if (!email.trim()) {
            showAlert("Error", "Please enter your email");
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            showAlert("Error", "Please enter a valid email");
            return false;
        }
        if (password.length < 6) {
            showAlert("Error", "Password must be at least 6 characters");
            return false;
        }
        
        if (!isLogin) {
            if (!name.trim()) {
                showAlert("Error", "Please enter your name");
                return false;
            }
            if (password !== confirmPassword) {
                showAlert("Error", "Passwords do not match");
                return false;
            }
        }
        
        return true;
    };

    const handleAuth = async () => {
        if (!validateForm()) return;
        setLoading(true);
        
        try {
            const auth = getAuth();
            
            if (isLogin) {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                showAlert("Success", "Signed in successfully!");
                setAuthSuccess(true);
            } else {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);

                await Promise.all([
                    updateProfile(userCredential.user, { displayName: name }),
                    userService.createUserProfile({
                        id: userCredential.user.uid,
                        displayName: name,
                        email: email,
                        createdOn: new Date(),
                    })
                ]);

                showAlert("Success", "Account created successfully!");
                setAuthSuccess(true);
            }
        } catch (error: any) {
            console.error("Authentication error:", error);
            let errorMessage = `An error occurred during ${isLogin ? 'sign in' : 'sign up'}`;

            if (error.code === 'auth/email-already-in-use') {
                errorMessage = 'Email already in use';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'Invalid email address';
            } else if (error.code === 'auth/weak-password') {
                errorMessage = 'Password is too weak';
            } else if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                errorMessage = 'Invalid email or password';
            }

            showAlert("Error", errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

    return {
        isLogin,
        name,
        email,
        password,
        confirmPassword,
        loading,
        alertVisible,
        alertTitle,
        alertMessage,
        showConfirmButton,
        setName,
        setEmail,
        setPassword,
        setConfirmPassword,
        setAlertVisible,
        toggleAuthMode,
        handleAuth,
        showAlert
    };
}; 