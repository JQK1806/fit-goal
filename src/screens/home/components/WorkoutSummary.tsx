import React from 'react';
import { Workout } from '../../../types/workout';
import { View, Text } from 'react-native';
import { globalStyles, colors, spacing } from '../../../styles/globalStyles';

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
        <View style={[globalStyles.card, { marginBottom: spacing.sm, backgroundColor: colors.background.primary }]}>
            <Text style={[globalStyles.cardTitle, { marginBottom: spacing.xs }]}>{workout.name}</Text>
            <Text style={[globalStyles.cardText, { marginBottom: spacing.xs }]}>{workout.description}</Text>
            <Text style={[globalStyles.cardText, { color: colors.primary, marginBottom: spacing.xs }]}>
                {`${workout.duration} minutes`}
            </Text>
            <Text style={[globalStyles.cardText, { color: colors.text.primary }]}>
                {`Exercises during workout: ${workout.exercises.length}`}
            </Text>
        </View>
    )
}

export default WorkoutSummary;