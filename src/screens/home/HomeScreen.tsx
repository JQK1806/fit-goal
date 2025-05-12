import React from "react";
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import WorkoutSummary from "./components/WorkoutSummary";
import GoalProgress from "./components/GoalProgress";
import ActivityChart from "./components/ActivityChart";
import { globalStyles, colors, spacing } from "../../styles/globalStyles";
import { useHomeData } from "../../hooks/useHomeData";

/**
 * The landing page HomeScreen component that displays a users'
 *  - Workouts
 *  - Goals and progress
 *  - Recent Activity (WIP)
 * @returns {JSX.Element} The rendered HomeScreen
 */
const HomeScreen = () => {
    const { workouts, goals } = useHomeData();

    return (
        <SafeAreaView style={globalStyles.container}>
            <ScrollView>
                <View style={globalStyles.headerContainer}>
                    <Text style={[globalStyles.title, { color: colors.text.light }]}>FitGoal</Text>
                    <Text style={[globalStyles.subtitle, { color: colors.text.light }]}>Track your fitness goals</Text>
                </View>

                <View style={globalStyles.contentContainer}>
                    <View style={globalStyles.card}>
                        <Text style={globalStyles.cardTitle}>Your Workouts</Text>
                        {workouts.length > 0 ? (
                            workouts.map(workout => (
                                <WorkoutSummary key={workout.id} workout={workout} />
                            ))
                        ) : (
                            <Text style={globalStyles.cardText}>No workouts logged yet</Text>
                        )}
                    </View>
                    
                    <View style={globalStyles.card}>
                        <Text style={globalStyles.cardTitle}>Your Goals</Text>
                        {goals.length > 0 ? (
                            goals.map(goal => (
                                <GoalProgress key={goal.id} goal={goal} />
                            ))
                        ) : (
                            <Text style={globalStyles.cardText}>No goals set yet</Text>
                        )}
                    </View>

                    <View style={globalStyles.card}>
                        <Text style={globalStyles.cardTitle}>Activity</Text>
                        <ActivityChart workouts={workouts} />
                    </View>

                    <View style={globalStyles.card}>
                        <Text style={globalStyles.cardTitle}>Actions</Text>
                        <TouchableOpacity style={[globalStyles.button, { marginBottom: spacing.sm }]}>
                            <Text style={globalStyles.buttonText}>Log Workout</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={globalStyles.button}>
                            <Text style={globalStyles.buttonText}>Set Goal</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen;