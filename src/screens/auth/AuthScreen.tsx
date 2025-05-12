import React from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AlertModal from "../../components/AlertModal";
import { globalStyles, colors, spacing } from "../../styles/globalStyles";
import { useAuth } from "../../hooks/useAuth";

type RootStackParamList = {
    Auth: undefined;
    Home: undefined;
};

type AuthScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Auth'>;

const AuthScreen: React.FC = () => {
    const navigation = useNavigation<AuthScreenNavigationProp>();
    const {
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
    } = useAuth(() => navigation.navigate('Home'));

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
            onConfirm={() => {
              if (alertOnConfirm) alertOnConfirm();
              setAlertVisible(false);
            }}
            showConfirmButton={showConfirmButton}
            confirmText="Continue"
          />
        </SafeAreaView>
    );
};

export default AuthScreen; 