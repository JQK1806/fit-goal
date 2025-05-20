import React, { useState } from "react";
import { Goal } from "../../../types/goal";
import { View, Text, TouchableOpacity, Modal, Slider } from 'react-native';
import { globalStyles, colors, spacing } from '../../../styles/globalStyles';
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
                        
                        <View style={styles.sliderContainer}>
                            <Text style={styles.progressText}>{Math.round(tempProgress)}%</Text>
                            <Slider
                                style={styles.slider}
                                minimumValue={0}
                                maximumValue={100}
                                value={tempProgress}
                                onValueChange={setTempProgress}
                                minimumTrackTintColor={colors.primary}
                                maximumTrackTintColor={colors.background.secondary}
                                thumbTintColor={colors.primary}
                            />
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: colors.background.primary,
        borderRadius: 10,
        padding: spacing.lg,
        width: '80%',
        maxWidth: 400,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.text.primary,
        marginBottom: spacing.xs,
    },
    modalSubtitle: {
        fontSize: 16,
        color: colors.text.secondary,
        marginBottom: spacing.lg,
    },
    sliderContainer: {
        marginBottom: spacing.lg,
    },
    progressText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.primary,
        textAlign: 'center',
        marginBottom: spacing.sm,
    },
    slider: {
        width: '100%',
        height: 40,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: spacing.sm,
    },
    button: {
        flex: 1,
        padding: spacing.sm,
        borderRadius: 8,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: colors.background.secondary,
    },
    updateButton: {
        backgroundColor: colors.primary,
    },
    buttonText: {
        color: colors.text.light,
        fontSize: 16,
        fontWeight: '600',
    },
};

export default GoalProgress;