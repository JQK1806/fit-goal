import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet } from 'react-native';
import HomeScreen from './src/screens/home/HomeScreen';
import AuthScreen from './src/screens/auth/AuthScreen';
import LogWorkoutScreen from './src/screens/workout/LogWorkoutScreen';
import LogGoalScreen from './src/screens/goals/LogGoalScreen';
import './firebase/firebaseConfig';

export type RootStackParamList = {
  Auth: undefined;
  Home: undefined;
  LogWorkout: undefined;
  LogGoal: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen 
          name="Auth" 
          component={AuthScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="LogWorkout" 
          component={LogWorkoutScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="LogGoal" 
          component={LogGoalScreen} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
});

