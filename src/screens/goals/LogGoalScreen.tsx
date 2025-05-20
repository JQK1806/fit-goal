import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { globalStyles, colors, spacing } from '../../styles/globalStyles';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { goalService } from '../../services/goalService';
import { RootStackParamList } from '../../../App';

const GOAL_UNITS = {
    workout: ['days', 'minutes', 'hours'],
    weight: ['kg', 'lbs'],
    distance: ['km', 'miles', 'm'],
    custom: ['units']
} as const;

type LogGoalScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'LogGoal'>;

const LogGoalScreen = () => {
    const navigation = useNavigation<LogGoalScreenNavigationProp>();
    const userId = useCurrentUser();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showUnitMenu, setShowUnitMenu] = useState(false);

    const [goalData, setGoalData] = useState({
        name: '',
        description: '',
        type: 'workout' as const,
        targetValue: '',
        unit: '',
        targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

    const handleSubmit = async () => {
        if (!userId) {
            setError('You must be logged in to create a goal');
            return;
        }

        if (!goalData.name || !goalData.description || !goalData.targetValue || !goalData.unit) {
            setError('Please fill in all required fields');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await goalService.createGoal({
                userId,
                name: goalData.name,
                description: goalData.description,
                type: goalData.type,
                targetValue: Number(goalData.targetValue),
                unit: goalData.unit,
                targetDate: goalData.targetDate,
                startDate: new Date(),
                progress: 0,
                completed: false,
            });

            navigation.goBack();
        } catch (err) {
            setError('Failed to create goal. Please try again.');
            console.error('Error creating goal:', err);
        } finally {
            setLoading(false);
        }
    };

    const availableUnits = GOAL_UNITS[goalData.type] || GOAL_UNITS.custom;

    return (
        <SafeAreaView style={globalStyles.container}>
            <ScrollView>
                <View style={globalStyles.headerContainer}>
                    <Text style={[globalStyles.title, { color: colors.text.light }]}>Create New Goal</Text>
                </View>

                <View style={globalStyles.contentContainer}>
                    <View style={globalStyles.card}>
                        <Text style={globalStyles.cardTitle}>Goal Details</Text>
                        
                        <Text style={styles.label}>Name *</Text>
                        <TextInput
                            style={styles.input}
                            value={goalData.name}
                            onChangeText={(text) => setGoalData({ ...goalData, name: text })}
                            placeholder="Enter goal name"
                        />

                        <Text style={styles.label}>Description *</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            value={goalData.description}
                            onChangeText={(text) => setGoalData({ ...goalData, description: text })}
                            placeholder="Describe your goal"
                            multiline
                            numberOfLines={3}
                        />

                        <Text style={styles.label}>Type</Text>
                        <View style={styles.typeContainer}>
                            {['workout', 'weight', 'distance', 'custom'].map((type) => (
                                <TouchableOpacity
                                    key={type}
                                    style={[
                                        styles.typeButton,
                                        goalData.type === type && styles.typeButtonActive
                                    ]}
                                    onPress={() => {
                                        setGoalData({ 
                                            ...goalData, 
                                            type: type as any,
                                            unit: GOAL_UNITS[type as keyof typeof GOAL_UNITS][0] // Set default unit for type
                                        });
                                    }}
                                >
                                    <Text style={[
                                        styles.typeButtonText,
                                        goalData.type === type && styles.typeButtonTextActive
                                    ]}>
                                        {type.charAt(0).toUpperCase() + type.slice(1)}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <Text style={styles.label}>Target Value *</Text>
                        <TextInput
                            style={styles.input}
                            value={goalData.targetValue}
                            onChangeText={(text) => setGoalData({ ...goalData, targetValue: text })}
                            placeholder="Enter target value"
                            keyboardType="numeric"
                        />

                        <Text style={styles.label}>Unit *</Text>
                        <View style={styles.unitContainer}>
                            <TouchableOpacity 
                                style={styles.unitSelector}
                                onPress={() => setShowUnitMenu(!showUnitMenu)}
                            >
                                <Text style={styles.unitText}>{goalData.unit || 'Select unit'}</Text>
                            </TouchableOpacity>
                            {showUnitMenu && (
                                <View style={styles.unitMenu}>
                                    {availableUnits.map((unit) => (
                                        <TouchableOpacity
                                            key={unit}
                                            style={styles.unitOption}
                                            onPress={() => {
                                                setGoalData({ ...goalData, unit });
                                                setShowUnitMenu(false);
                                            }}
                                        >
                                            <Text style={[
                                                styles.unitOptionText,
                                                goalData.unit === unit && styles.selectedUnitText
                                            ]}>
                                                {unit}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                        </View>

                        {error && (
                            <Text style={[globalStyles.errorText, { marginTop: spacing.sm }]}>
                                {error}
                            </Text>
                        )}

                        <TouchableOpacity
                            style={[globalStyles.button, { marginTop: spacing.md }]}
                            onPress={handleSubmit}
                            disabled={loading}
                        >
                            <Text style={globalStyles.buttonText}>
                                {loading ? 'Creating...' : 'Create Goal'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: spacing.xs,
        color: colors.text.primary,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 8,
        padding: spacing.sm,
        marginBottom: spacing.sm,
        backgroundColor: colors.background.primary,
        color: colors.text.primary,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    typeContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.xs,
        marginBottom: spacing.sm,
    },
    typeButton: {
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: 20,
        backgroundColor: colors.background.secondary,
        borderWidth: 1,
        borderColor: colors.border,
    },
    typeButtonActive: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    typeButtonText: {
        color: colors.text.primary,
    },
    typeButtonTextActive: {
        color: colors.text.light,
    },
    unitContainer: {
        marginBottom: spacing.sm,
        position: 'relative',
        zIndex: 1000,
    },
    unitSelector: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 8,
        padding: spacing.sm,
        backgroundColor: colors.background.primary,
    },
    unitText: {
        color: colors.text.primary,
    },
    unitMenu: {
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        backgroundColor: colors.background.primary,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
        zIndex: 1001,
        marginTop: spacing.xs,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    unitOption: {
        padding: spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    unitOptionText: {
        color: colors.text.primary,
    },
    selectedUnitText: {
        color: colors.primary,
        fontWeight: '600',
    },
});

export default LogGoalScreen; 