import React from 'react';
import { Workout } from '../../../types/workout';
import { View, Text } from 'react-native';

interface WorkoutSummaryProps {
    workout: Workout;
}

const WorkoutSummary: React.FC<WorkoutSummaryProps> = ({ workout }) => {
    return (
        <View>
            <Text>{workout.name}</Text>
            <Text>{workout.description}</Text>
            <Text>{workout.duration}</Text>
        </View>
    )
}

export default WorkoutSummary;