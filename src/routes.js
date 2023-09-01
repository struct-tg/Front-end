import React from 'react'

import ScreenLogin from './screens/Login/index';
import ScreenRegister from "./screens/Register/index";
import ScreenForgotPassword from "./screens/ForgotPassword/index";
import ScreenPasswordCode from "./screens/PasswordCode/index";
import ScreenRecoverPassword from "./screens/RecoverPassword/index";

import ScreenHome from "./screens/Home/index";

import ScreenToDo from "./screens/ToDoList/index";
import ScreenAddTodo from "./screens/ToDoList/AddTask/index";
import ScreenEditTodo from "./screens/ToDoList/EditTask/index";

import ScreenPomodoro from "./screens/Pomodoro/index";
import ScreenPomodorSettings from "./screens/Pomodoro/PomodoroSettings/index";
import ScreenGrades from "./screens/Grades/index";
import ScreenCalendar from "./screens/Calendar/index";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>

                <Stack.Screen name="Login" component={ScreenLogin} />
                <Stack.Screen name="Register" component={ScreenRegister} />
                <Stack.Screen name="ForgotPassword" component={ScreenForgotPassword} />
                <Stack.Screen name="PasswordCode" component={ScreenPasswordCode} />
                <Stack.Screen name="RecoverPassword" component={ScreenRecoverPassword} />

                <Stack.Screen name="AddTodo" component={ScreenAddTodo} />
                <Stack.Screen name="EditTodo" component={ScreenEditTodo} />

                <Stack.Screen name="PomodoroSettings" component={ScreenPomodorSettings} />
                <Stack.Screen name="RoutesApp" component={RoutesApp} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

function RoutesApp() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true, tabBarStyle: { backgroundColor: "#168B9D", borderColor: "transparent", borderWidth: 0 }, tabBarLabelStyle: { color: "white" } }} >
            <Tab.Screen
                name="Home"
                component={ScreenHome}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" color={"white"} size={30} />
                    )
                }}
            />
            <Tab.Screen
                name="ToDo"
                component={ScreenToDo}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="checkmark-circle-outline" color={"white"} size={30} />
                    )
                }}
            />
            <Tab.Screen
                name="Pomodoro"
                component={ScreenPomodoro}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="stopwatch-outline" color={"white"} size={30} />
                    )
                }}
            />
            <Tab.Screen
                name="Calendar"
                component={ScreenCalendar}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="calendar-outline" color={"white"} size={30} />
                    )
                }}
            />
            <Tab.Screen
                name="Grades"
                component={ScreenGrades}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="book-outline" color={"white"} size={30} />
                    )
                }}
            />
        </Tab.Navigator>
    );
}

export default Routes;