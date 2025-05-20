import React, { useState } from "react";
import { Goal } from "../../../types/goal";
import { View, Text, TouchableOpacity, Modal, TextInput } from 'react-native';
import { globalStyles, colors, spacing, typography } from '../../../styles/globalStyles';
import { goalService } from '../../../services/goalService';

/**
 * Props for the GoalProgress component
 */
interface GoalProps {
    goal: Goal;
    onProgressUpdate?: () => void;
}

/**
 * Goal Progress component
 * 
 * Displays the progress of a goal
 *  - goal name
 *  - goal description
 *  - progress towards the goal
 *  - ability to update progress
 * 
 * @param {GoalProps} props The component props
 * @returns {JSX.Element} The rendered GoalProgress component
 */
const GoalProgress: React.FC<GoalProps> = ({ goal, onProgressUpdate }) => {
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [tempProgress, setTempProgress] = useState(goal.progress);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleProgressChange = (text: string) => {
        const numericValue = text.replace(/[^0-9]/g, '');
        
        const value = parseInt(numericValue, 10);
        if (!isNaN(value)) {
            setTempProgress(Math.min(Math.max(value, 0), 100));
        } else {
            setTempProgress(0);
        }
    };

    const handleUpdateProgress = async () => {
        try {
            setIsUpdating(true);
            await goalService.updateGoalProgress(goal.id, tempProgress);
            setShowUpdateModal(false);
            onProgressUpdate?.();
        } catch (error) {
            console.error('Error updating goal progress:', error);
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <>
            <TouchableOpacity 
                onPress={() => setShowUpdateModal(true)}
                style={[globalStyles.card, { marginBottom: spacing.sm, backgroundColor: colors.background.primary }]}
            >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.xs }}>
                    <Text style={[globalStyles.cardTitle, { marginBottom: 0 }]}>{goal.name}</Text>
                    <Text style={[globalStyles.cardText, { color: colors.primary, fontWeight: '600' }]}>
                        {goal.progress}%
                    </Text>
                </View>
                <Text style={[globalStyles.cardText, { marginBottom: spacing.sm }]}>{goal.description}</Text>
                <View style={{ height: 6, backgroundColor: colors.background.secondary, borderRadius: 3, overflow: 'hidden' }}>
                    <View style={{ height: '100%', backgroundColor: colors.primary, borderRadius: 3, width: `${goal.progress}%` }} />
                </View>
            </TouchableOpacity>

            <Modal
                visible={showUpdateModal}
                transparent
                animationType="fade"
                onRequestClose={() => setShowUpdateModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Update Progress</Text>
                        <Text style={styles.modalSubtitle}>{goal.name}</Text>
                        
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                value={tempProgress.toString()}
                                onChangeText={handleProgressChange}
                                keyboardType="numeric"
                                maxLength={3}
                                placeholder="Enter percentage (0-100)"
                                placeholderTextColor={colors.text.secondary}
                            />
                            <Text style={styles.percentageSymbol}>%</Text>
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.button, styles.cancelButton]}
                                onPress={() => setShowUpdateModal(false)}
                            >
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.updateButton]}
                                onPress={handleUpdateProgress}
                                disabled={isUpdating}
                            >
                                <Text style={styles.buttonText}>
                                    {isUpdating ? 'Updating...' : 'Update'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
};

const styles = {
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
    },
    modalContent: {
        ...globalStyles.card,
        width: '80%' as const,
        maxWidth: 400,
        marginBottom: 0,
    },
    modalTitle: {
        ...globalStyles.title,
        marginBottom: spacing.xs,
    },
    modalSubtitle: {
        ...globalStyles.subtitle,
        marginBottom: spacing.lg,
    },
    inputContainer: {
        flexDirection: 'row' as const,
        alignItems: 'center' as const,
        marginBottom: spacing.lg,
    },
    input: {
        ...globalStyles.input,
        flex: 1,
        marginBottom: 0,
        textAlign: 'center' as const,
        fontSize: 24,
        fontWeight: 'bold' as const,
    },
    percentageSymbol: {
        ...typography.title,
        color: colors.primary,
        marginLeft: spacing.xs,
    },
    buttonContainer: {
        flexDirection: 'row' as const,
        justifyContent: 'space-between' as const,
        gap: spacing.sm,
    },
    button: {
        ...globalStyles.button,
        flex: 1,
        marginTop: 0,
    },
    cancelButton: {
        backgroundColor: colors.background.secondary,
    },
    updateButton: {
        backgroundColor: colors.primary,
    },
    buttonText: {
        ...globalStyles.buttonText,
    },
};

export default GoalProgress;