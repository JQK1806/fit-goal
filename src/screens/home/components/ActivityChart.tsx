import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Workout } from '../../../types/workout';

/**
 * Props for the ActivityChart component
 */
interface ActivityChartProps {
    workouts: Workout[];
    days?: number;
}

/**
 * ActivityChart Component
 * 
 * Displays a simple bar chart showing workout activity over time
 * - Shows the number of workouts per day
 * - Displays the last 7 days by default
 * 
 * @param {ActivityChartProps} props - The component props
 * @returns {JSX.Element} The rendered ActivityChart component
 */
const ActivityChart: React.FC<ActivityChartProps> = ({ workouts, days=7 }) => {
    const today = new Date();

     // Create an array of the last 'days' days
    const dates = Array.from({ length: days }, (_, i) => {
        const date = new Date();
        date.setDate(today.getDate() - (days - 1 - i));
        return date;
    });

    // Count workouts for each day
    const workoutCounts = dates.map(date => {
        const dateString = date.toISOString().split('T')[0];
        return workouts.filter(workout => {
            const workoutDate = new Date(workout.date || Date.now()).toISOString().split('T')[0];
            return workoutDate === dateString;
        }).length;
    });

    // Find the maximum count for scaling
    const maxCount = Math.max(...workoutCounts, 1);

     // Get day names for the x-axis
    const dayNames = dates.map(date => {
        return date.toLocaleDateString('en-US', { weekday: 'short' });
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Activity</Text>
            <View style={styles.chartContainer}>
                {workoutCounts.map((count, index) => (
                    <View key={index} style={styles.barContainer}>
                        <View 
                            style={[
                                styles.bar, 
                                { height: `${(count / maxCount) * 100}%` }
                            ]} 
                        />
                        <Text style={styles.dayLabel}>{dayNames[index]}</Text>
                    </View>
                ))}
            </View>
        </View>
    )
}

/**
 * Styles for the ActivityChart component
 */
const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
    },
    chartContainer: {
        flexDirection: 'row',
        height: 150,
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    barContainer: {
        alignItems: 'center',
        width: `${100 / 7}%`,
    },
    bar: {
        width: '80%',
        backgroundColor: '#4a90e2',
        borderRadius: 4,
        minHeight: 4,
    },
    dayLabel: {
        marginTop: 8,
        fontSize: 12,
        color: '#666',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
});

export default ActivityChart;
