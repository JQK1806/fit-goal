import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
 * Displays a calendar-like view showing workout activity over time
 * - Shows dots on days where workouts were performed
 * - Displays the last 7 days by default
 * 
 * @param {ActivityChartProps} props - The component props
 * @returns {JSX.Element} The rendered ActivityChart component
 */
const ActivityChart: React.FC<ActivityChartProps> = ({ workouts, days=7 }) => {
    const today = new Date();
    
    // Create an array of the last days
    const dates = Array.from({ length: days }, (_, i) => {
        const date = new Date();
        date.setDate(today.getDate() - (days - 1 - i));
        return date;
    });
    
    // Check which days have workouts
    const workoutDays = dates.map(date => {
        const dateString = date.toISOString().split('T')[0];
        return workouts.some(workout => {
            const workoutDate = new Date(workout.date || Date.now()).toISOString().split('T')[0];
            return workoutDate === dateString;
        });
    });
    
    // Get day names for the x-axis
    const dayNames = dates.map(date => {
        return date.toLocaleDateString('en-US', { weekday: 'short' });
    });
    
    // Get day numbers for the calendar
    const dayNumbers = dates.map(date => {
        return date.getDate();
    });
    
    return (
        <View style={styles.container}>
            <View style={styles.calendarContainer}>
                {dates.map((date, index) => (
                    <View key={index} style={styles.dayContainer}>
                        <Text style={styles.dayNumber}>{dayNumbers[index]}</Text>
                        <Text style={styles.dayName}>{dayNames[index]}</Text>
                        {workoutDays[index] && <View style={styles.workoutDot} />}
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
    calendarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    dayContainer: {
        alignItems: 'center',
        width: `${100 / 7}%`,
    },
    dayNumber: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    dayName: {
        fontSize: 12,
        color: '#666',
        marginBottom: 8,
    },
    workoutDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#4a90e2',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginTop: 10,
    },
});

export default ActivityChart;
