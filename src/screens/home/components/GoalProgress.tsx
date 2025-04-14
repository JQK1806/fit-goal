import React from "react";
import { Goal } from "../../../types/goal";
import { View, Text, StyleSheet } from 'react-native'

/**
 * Props for the GoalProgress component
 */
interface GoalProps {
    goal: Goal;
}

/**
 * Goal Progress component
 * 
 * Displays the progress of a goal
 *  - goal name
 *  - goal description
 *  - progress towards the goal
 * 
 * @param {GoalProps} goal The component props
 * @returns {JSX.Element} The rendered GoalProgress component
 */
const GoalProgress: React.FC<GoalProps> = ({ goal }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{goal.name}</Text>
                <Text style={styles.progress}>{goal.progess}%</Text>
            </View>
            <Text style={styles.description}>{goal.description}</Text>
            <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${goal.progess}%` }]} />
            </View>
        </View>
    )
}

/**
 * Styles for GoalProgress component
 */
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    progress: {
        fontSize: 14,
        fontWeight: '600',
        color: '#4a90e2',
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    progressBar: {
        height: 6,
        backgroundColor: '#f0f0f0',
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#4a90e2',
        borderRadius: 3,
    },
});

export default GoalProgress;