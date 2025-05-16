import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { globalStyles, colors, spacing } from '../../styles/globalStyles';
import { workoutService } from '../../services/workoutService';
import { Workout } from '../../types/workout';
import { Exercise } from '../../types/exercise';
import { RootStackParamList } from '../../../App';

type LogWorkoutScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'LogWorkout'>;

const workoutTypes: Workout['type'][] = ['strength', 'cardio', 'flexibility', 'hiit', 'custom'];

const LogWorkoutScreen = () => {
    const navigation = useNavigation<LogWorkoutScreenNavigationProp>();
    const [workout, setWorkout] = useState<Partial<Workout>>({
        name: '',
        description: '',
        duration: 0,
        type: 'strength',
        intensity: 5,
        exercises: [],
        date: new Date(),
        notes: '',
        caloriesBurned: 0,
    });

    const handleSave = async () => {
        try {
            // TODO: Get actual user ID from auth context
            const userId = 'current-user-id';
            const newWorkout = await workoutService.createWorkout({
                ...workout,
                userId,
            } as Omit<Workout, 'id'>);
            
            // Navigate back to home screen
            navigation.goBack();
        } catch (error) {
            console.error('Error saving workout:', error);
            // TODO: Show error message to user
        }
    };

    return (
        <SafeAreaView style={globalStyles.container}>
            <ScrollView>
                <View style={globalStyles.headerContainer}>
                    <Text style={[globalStyles.title, { color: colors.text.light }]}>Log Workout</Text>
                </View>

                <View style={globalStyles.contentContainer}>
                    <View style={globalStyles.card}>
                        <Text style={globalStyles.cardTitle}>Workout Details</Text>
                        
                        <Text style={globalStyles.label}>Name</Text>
                        <TextInput
                            style={globalStyles.input}
                            value={workout.name}
                            onChangeText={(text) => setWorkout({ ...workout, name: text })}
                            placeholder="Workout name"
                        />

                        <Text style={globalStyles.label}>Description</Text>
                        <TextInput
                            style={[globalStyles.input, styles.textArea]}
                            value={workout.description}
                            onChangeText={(text) => setWorkout({ ...workout, description: text })}
                            placeholder="Workout description"
                            multiline
                            numberOfLines={3}
                        />

                        <Text style={globalStyles.label}>Type</Text>
                        <View style={styles.typeContainer}>
                            {workoutTypes.map((type) => (
                                <TouchableOpacity
                                    key={type}
                                    style={[
                                        styles.typeButton,
                                        workout.type === type && styles.typeButtonSelected
                                    ]}
                                    onPress={() => setWorkout({ ...workout, type })}
                                >
                                    <Text style={[
                                        styles.typeButtonText,
                                        workout.type === type && styles.typeButtonTextSelected
                                    ]}>
                                        {type.charAt(0).toUpperCase() + type.slice(1)}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <Text style={globalStyles.label}>Duration (minutes)</Text>
                        <TextInput
                            style={globalStyles.input}
                            value={workout.duration?.toString()}
                            onChangeText={(text) => setWorkout({ ...workout, duration: parseInt(text) || 0 })}
                            placeholder="Duration in minutes"
                            keyboardType="numeric"
                        />

                        <Text style={globalStyles.label}>Intensity (1-10)</Text>
                        <TextInput
                            style={globalStyles.input}
                            value={workout.intensity?.toString()}
                            onChangeText={(text) => setWorkout({ ...workout, intensity: parseInt(text) || 5 })}
                            placeholder="Intensity level"
                            keyboardType="numeric"
                        />

                        <Text style={globalStyles.label}>Calories Burned</Text>
                        <TextInput
                            style={globalStyles.input}
                            value={workout.caloriesBurned?.toString()}
                            onChangeText={(text) => setWorkout({ ...workout, caloriesBurned: parseInt(text) || 0 })}
                            placeholder="Estimated calories burned"
                            keyboardType="numeric"
                        />

                        <Text style={globalStyles.label}>Notes</Text>
                        <TextInput
                            style={[globalStyles.input, styles.textArea]}
                            value={workout.notes}
                            onChangeText={(text) => setWorkout({ ...workout, notes: text })}
                            placeholder="Additional notes about your workout"
                            multiline
                            numberOfLines={4}
                        />

                        <TouchableOpacity 
                            style={[globalStyles.button, { marginTop: spacing.md }]}
                            onPress={handleSave}
                        >
                            <Text style={globalStyles.buttonText}>Save Workout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    typeContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.sm,
        marginBottom: spacing.md,
    },
    typeButton: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: 20,
        backgroundColor: colors.background.input,
        borderWidth: 1,
        borderColor: colors.border,
    },
    typeButtonSelected: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    typeButtonText: {
        color: colors.text.primary,
        fontSize: 14,
    },
    typeButtonTextSelected: {
        color: colors.text.light,
    },
});

export default LogWorkoutScreen; 