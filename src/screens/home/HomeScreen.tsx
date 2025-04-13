import React, { useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Workout } from "../../types/workout";
import WorkoutSummary from "./components/WorkoutSummary";
import GoalProgress from "./components/GoalProgress";

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

const HomeScreen = () => {
    const [workouts, setWorkouts] = useState<Workout[]>([])
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.title}>FitTrack</Text>
                    <Text style={styles.subtitle}>Track your fitnes jounrey</Text>
                </View>

                <View style={styles.content}>
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Today's Workouts</Text>
                        {workouts.length > 0 ? (
                            workouts.map(workout => (
                                <WorkoutSummary key={workout.id} workout={workout} />
                            ))
                        ) : (
                            <Text style={styles.cardText}>No workouts logged today</Text>
                        )}
                    </View>
                    
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Your Goals</Text>
                        {sampleGoals.map(goal => (
                            <GoalProgress key={goal.id} goal={goal} />
                        ))}
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Actions</Text>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Log Workout</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Set Goal</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        padding: 20,
        backgroundColor: '#4a90e2',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    subtitle: {
        fontSize: 16,
        color: 'white',
        marginTop: 5,
    },
    content: {
        padding: 20
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    cardText: {
        fontSize: 16,
        color: '#666',
    },
    button: {
        backgroundColor: '#4a90e2',
        padding: 15,
        borderRadius: 8,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default HomeScreen;