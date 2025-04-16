import React from 'react';
import { View, Text } from 'react-native';
import { Workout } from '../../../types/workout';
import { globalStyles, colors, spacing } from '../../../styles/globalStyles';

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
        <View style={{ padding: spacing.sm }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm }}>
                {dates.map((date, index) => (
                    <View key={index} style={{ alignItems: 'center', width: `${100 / 7}%` }}>
                        <Text style={[globalStyles.cardTitle, { marginBottom: spacing.xs, fontSize: 16 }]}>
                            {dayNumbers[index]}
                        </Text>
                        <Text style={[globalStyles.cardText, { marginBottom: spacing.sm, fontSize: 12 }]}>
                            {dayNames[index]}
                        </Text>
                        {workoutDays[index] && (
                            <View style={{
                                width: 8,
                                height: 8,
                                borderRadius: 4,
                                backgroundColor: colors.primary,
                            }} />
                        )}
                    </View>
                ))}
            </View>
        </View>
    )
}

export default ActivityChart;
