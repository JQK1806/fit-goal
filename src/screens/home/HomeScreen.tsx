import React, { useState } from "react";
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Workout } from "../../types/workout";
import WorkoutSummary from "./components/WorkoutSummary";
import GoalProgress from "./components/GoalProgress";
import ActivityChart from "./components/ActivityChart";
import { globalStyles, colors, spacing } from "../../styles/globalStyles";

// Sample goals data
const sampleGoals = [
    {
        id: '1',
        name: 'Weekly Workouts',
        description: 'Complete 5 workouts this week',
        progess: 60,
    },
    {
        id: '2',
        name: 'Monthly Goal',
        description: 'Run 50km this month',
        progess: 35,
    },
];

// Sample workout data
const sampleWorkouts: Workout[] = [
    {
        id: '1',
        name: 'Morning Run',
        description: '5km run in the park',
        duration: 30,
        exercises: [
            { id: '1', name: 'Running', sets: 1, reps: 1 }
        ],
        date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days ago
    },
    {
        id: '2',
        name: 'Upper Body Workout',
        description: 'Focus on chest and shoulders',
        duration: 45,
        exercises: [
            { id: '2', name: 'Bench Press', sets: 3, reps: 10, weight: 135 },
            { id: '3', name: 'Shoulder Press', sets: 3, reps: 12, weight: 95 },
            { id: '4', name: 'Lateral Raises', sets: 3, reps: 15, weight: 20 }
        ],
        date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
    },
    {
        id: '3',
        name: 'Lower Body Workout',
        description: 'Focus on legs',
        duration: 50,
        exercises: [
            { id: '5', name: 'Squats', sets: 4, reps: 8, weight: 185 },
            { id: '6', name: 'Deadlifts', sets: 3, reps: 6, weight: 225 },
            { id: '7', name: 'Lunges', sets: 3, reps: 12, weight: 45 }
        ],
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    },
    {
        id: '4',
        name: 'HIIT Session',
        description: 'High-intensity interval training',
        duration: 25,
        exercises: [
            { id: '8', name: 'Burpees', sets: 4, reps: 15 },
            { id: '9', name: 'Mountain Climbers', sets: 4, reps: 20 },
            { id: '10', name: 'Jump Rope', sets: 4, reps: 50 }
        ],
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    },
    {
        id: '5',
        name: 'Yoga Session',
        description: 'Relaxing yoga flow',
        duration: 40,
        exercises: [
            { id: '11', name: 'Sun Salutations', sets: 5, reps: 1 },
            { id: '12', name: 'Warrior Poses', sets: 3, reps: 1 },
            { id: '13', name: 'Meditation', sets: 1, reps: 1 }
        ],
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    },
    {
        id: '6',
        name: 'Core Workout',
        description: 'Focus on abs and core',
        duration: 30,
        exercises: [
            { id: '14', name: 'Planks', sets: 3, reps: 1 },
            { id: '15', name: 'Crunches', sets: 3, reps: 20 },
            { id: '16', name: 'Russian Twists', sets: 3, reps: 15 }
        ],
        date: new Date().toISOString(), // Today
    }
];

/**
 * The landing page HomeScreen component that displays a users'
 *  - Workouts
 *  - Goals and progress
 *  - Recent Activity (WIP)
 * @returns {JSX.Element} The rendered HomeScreen
 */
const HomeScreen = () => {
    const [workouts, setWorkouts] = useState<Workout[]>(sampleWorkouts) // ***TODO*** Temporary for sample data switch back when using real data
    return (
        <SafeAreaView style={globalStyles.container}>
            <ScrollView>
                <View style={globalStyles.headerContainer}>
                    <Text style={[globalStyles.title, { color: colors.text.light }]}>FitGoal</Text>
                    <Text style={[globalStyles.subtitle, { color: colors.text.light }]}>Track your fitness goals</Text>
                </View>

                <View style={globalStyles.contentContainer}>
                    <View style={globalStyles.card}>
                        <Text style={globalStyles.cardTitle}>Your Workouts</Text>
                        {workouts.length > 0 ? (
                            workouts.map(workout => (
                                <WorkoutSummary key={workout.id} workout={workout} />
                            ))
                        ) : (
                            <Text style={globalStyles.cardText}>No workouts logged today</Text>
                        )}
                    </View>
                    
                    <View style={globalStyles.card}>
                        <Text style={globalStyles.cardTitle}>Your Goals</Text>
                        {sampleGoals.map(goal => (
                            <GoalProgress key={goal.id} goal={goal} />
                        ))}
                    </View>

                    <View style={globalStyles.card}>
                        <Text style={globalStyles.cardTitle}>Activity</Text>
                        <ActivityChart workouts={workouts} />
                    </View>

                    <View style={globalStyles.card}>
                        <Text style={globalStyles.cardTitle}>Actions</Text>
                        <TouchableOpacity style={[globalStyles.button, { marginBottom: spacing.sm }]}>
                            <Text style={globalStyles.buttonText}>Log Workout</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={globalStyles.button}>
                            <Text style={globalStyles.buttonText}>Set Goal</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen;