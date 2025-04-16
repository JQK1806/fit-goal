import React from "react";
import { Goal } from "../../../types/goal";
import { View, Text } from 'react-native';
import { globalStyles, colors, spacing } from '../../../styles/globalStyles';

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
        <View style={[globalStyles.card, { marginBottom: spacing.sm, backgroundColor: colors.background.primary }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.xs }}>
                <Text style={[globalStyles.cardTitle, { marginBottom: 0 }]}>{goal.name}</Text>
                <Text style={[globalStyles.cardText, { color: colors.primary, fontWeight: '600' }]}>
                    {goal.progess}%
                </Text>
            </View>
            <Text style={[globalStyles.cardText, { marginBottom: spacing.sm }]}>{goal.description}</Text>
            <View style={{ height: 6, backgroundColor: colors.background.secondary, borderRadius: 3, overflow: 'hidden' }}>
                <View style={{ height: '100%', backgroundColor: colors.primary, borderRadius: 3, width: `${goal.progess}%` }} />
            </View>
        </View>
    )
}

export default GoalProgress;