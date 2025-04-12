import React from 'react';
import { Workout } from '../../../types/workout';
import { View, Text, StyleSheet } from 'react-native';

/**
 * Props for the WorkoutSummary component
 */
interface WorkoutSummaryProps {
    workout: Workout;
}

/**
 * WorkoutSummary Component
 * 
 * Displays a summary of a single workout including:
 * - Workout name
 * - Description
 * - Duration
 * - Number of exercises
 * 
 * @component
 * @param {WorkoutSummaryProps} props - The component props
 * @returns {JSX.Element} The rendered WorkoutSummary component
 */
const WorkoutSummary: React.FC<WorkoutSummaryProps> = ({ workout }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.name}>{workout.name}</Text>
            <Text style={styles.description}>{workout.description}</Text>
            <Text style={styles.duration}>{workout.duration}</Text>
            <Text style={styles.exerciseCount}>
                {`Exercises during workout: ${workout.exercises.length}`}
            </Text>
        </View>
    )
}

/**
 * Styles for the WorkoutSummary component
 */
const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    duration: {
        fontSize: 14,
        color: '#4a90e2',
        marginBottom: 5,
    },
    exerciseCount: {
        fontSize: 14,
        color: '#333',
    },
});

export default WorkoutSummary;