import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import AlertModal from "../../components/AlertModal";
import { globalStyles, colors, spacing } from "../../styles/globalStyles";
import { createUserProfile } from "../../services/userService";
import { UserProfile } from "../../types/user";

type RootStackParamList = {
    Auth: undefined;
    Home: undefined;
};

type AuthScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Auth'>;

const AuthScreen: React.FC = () => {
    const navigation = useNavigation<AuthScreenNavigationProp>();
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [shouldNavigate, setShouldNavigate] = useState(false);
    
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertOnConfirm, setAlertOnConfirm] = useState<(() => void) | undefined>(undefined);
    const [showConfirmButton, setShowConfirmButton] = useState(false);

    useEffect(() => {
        if (shouldNavigate) {
            navigation.navigate('Home');
            setShouldNavigate(false);
        }
    }, [shouldNavigate, navigation]);

    const showAlert = (title: string, message: string, onConfirm?: () => void, showConfirm = false) => {
        console.log(`Showing alert: ${title} - ${message}`);
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
            console.log(`Attempting to ${isLogin ? 'sign in' : 'create user'} with Firebase...`);
            const auth = getAuth();
            
            if (isLogin) {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                console.log("User signed in successfully:", userCredential.user.uid);
                
                showAlert(
                    "Success",
                    "Signed in successfully!",
                    () => setShouldNavigate(true),
                    false
                );
            } else {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                console.log("User created successfully:", userCredential.user.uid);

                await Promise.all([
                    updateProfile(userCredential.user, { displayName: name }),
                    createUserProfile({
                        id: userCredential.user.uid,
                        displayName: name,
                        email: email,
                        createdOn: new Date(),
                    })
                ]);

                console.log("Profile setup completed successfully");
                showAlert(
                    "Success", 
                    "Account created successfully!", 
                    () => setShouldNavigate(true),
                    false
                );
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

    return (
        <SafeAreaView style={globalStyles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <ScrollView contentContainerStyle={{ flexGrow: 1, padding: spacing.lg }}>
              <View style={globalStyles.headerContainer}>
                <Text style={globalStyles.title}>{isLogin ? "Welcome Back" : "Create Account"}</Text>
                <Text style={globalStyles.subtitle}>
                  {isLogin 
                    ? "Sign in to continue tracking your fitness journey" 
                    : "Sign up to start tracking your fitness journey"}
                </Text>
              </View>
    
              <View style={globalStyles.formContainer}>
                {!isLogin && (
                  <View style={globalStyles.inputContainer}>
                    <Text style={globalStyles.label}>Full Name</Text>
                    <TextInput
                      style={globalStyles.input}
                      placeholder="Enter your full name"
                      value={name}
                      onChangeText={setName}
                      autoCapitalize="words"
                    />
                  </View>
                )}
    
                <View style={globalStyles.inputContainer}>
                  <Text style={globalStyles.label}>Email</Text>
                  <TextInput
                    style={globalStyles.input}
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
    
                <View style={globalStyles.inputContainer}>
                  <Text style={globalStyles.label}>Password</Text>
                  <TextInput
                    style={globalStyles.input}
                    placeholder={isLogin ? "Enter your password" : "Create a password"}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                </View>
    
                {!isLogin && (
                  <View style={globalStyles.inputContainer}>
                    <Text style={globalStyles.label}>Confirm Password</Text>
                    <TextInput
                      style={globalStyles.input}
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      secureTextEntry
                    />
                  </View>
                )}
    
                <TouchableOpacity
                  style={[globalStyles.button, loading && globalStyles.buttonDisabled]}
                  onPress={handleAuth}
                  disabled={loading}
                >
                  <Text style={globalStyles.buttonText}>
                    {loading 
                      ? (isLogin ? "Signing In..." : "Creating Account...") 
                      : (isLogin ? "Sign In" : "Sign Up")}
                  </Text>
                </TouchableOpacity>
    
                <View style={globalStyles.linkContainer}>
                  <Text style={globalStyles.linkText}>
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                  </Text>
                  <TouchableOpacity onPress={toggleAuthMode}>
                    <Text style={globalStyles.link}>
                      {isLogin ? "Sign Up" : "Sign In"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
          
          <AlertModal
            visible={alertVisible}
            title={alertTitle}
            message={alertMessage}
            onClose={() => setAlertVisible(false)}
            onConfirm={alertOnConfirm}
            showConfirmButton={showConfirmButton}
            confirmText="Continue"
          />
        </SafeAreaView>
    );
};

export default AuthScreen; 