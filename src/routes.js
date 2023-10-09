import React from 'react';

/*Telas externas ao APP*/
import ScreenLogin from './Screens/OutsideAPP/Login/index.js';
import ScreenRegister from "./Screens/OutsideAPP/Register/index.js";
import ScreenForgotPassword from "./Screens/OutsideAPP/ForgotPassword/index.js";
import ScreenPasswordCode from "./Screens/OutsideAPP/PasswordCode/index.js";
import ScreenRecoverPassword from "./Screens/OutsideAPP/RecoverPassword/index.js";

/*Telas internas ao APP: Home*/
import ScreenHome from "./Screens/InsideAPP/Home/index.js";
import ScreenChartHome from "./Screens/InsideAPP/Home/ScreensHome/ChartHome/index.js";

/*Telas internas ao APP: ToDo*/
import ScreenToDo from "./Screens/InsideAPP/ToDoList/index.js";
import ScreenAddTodo from "./Screens/InsideAPP/ToDoList/ScreensToDo/AddTask/index.js";
import ScreenEditTodo from "./Screens/InsideAPP/ToDoList/ScreensToDo/EditTask/index.js";
import ScreenFiltersTodo from "./Screens/InsideAPP/ToDoList/ScreensToDo/FiltersTask/index.js";

/*Telas internas ao APP: Pomodoro*/
import ScreenPomodoro from "./Screens/InsideAPP/Pomodoro/index.js";
import ScreenAddPomodoro from "./Screens/InsideAPP/Pomodoro/ScreensPomodoro/AddPomodoro/index.js";
import ScreenEditPomodoro from "./Screens/InsideAPP/Pomodoro/ScreensPomodoro/EditPomodoro/index.js";
import ScreenClockPomodoro from "./Screens/InsideAPP/Pomodoro/ScreensPomodoro/PomodoroClock/index.js";
import ScreenSelectPomodoro from "./Screens/InsideAPP/Pomodoro/ScreensPomodoro/SelectPomodoro/index.js";

/*Telas internas ao APP: Disciplinas*/
import ScreenGrades from "./Screens/InsideAPP/Grades/index.js";
import ScreenAddGrade from "./Screens/InsideAPP/Grades/ScreensGrades/AddGrade/index.js";
import ScreenEditGrade from "./Screens/InsideAPP/Grades/ScreensGrades/EditGrade/index.js";
import ScreenEvaluativeActivity from "./Screens/InsideAPP/Grades/ScreensGrades/EvaluativeActivity/index.js";
import ScreenActivityFilters from "./Screens/InsideAPP/Grades/ScreensGrades/ActivityFilters/index.js";

/*Telas internas ao APP: Calendario*/
import ScreenCalendar from "./Screens/InsideAPP/Calendar/index.js";

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

                <Stack.Screen name="ChartHome" component={ScreenChartHome} />

                <Stack.Screen name="AddTodo" component={ScreenAddTodo} />
                <Stack.Screen name="EditTodo" component={ScreenEditTodo} />
                <Stack.Screen name="FiltersTodo" component={ScreenFiltersTodo} />

                <Stack.Screen name="AddPomodoro" component={ScreenAddPomodoro} />    
                <Stack.Screen name="EditPomodoro" component={ScreenEditPomodoro} />
                <Stack.Screen name="ClockPomodoro" component={ScreenClockPomodoro} />
                <Stack.Screen name="SelectPomodoro" component={ScreenSelectPomodoro} />   

                <Stack.Screen name='AddGrade' component={ScreenAddGrade} />
                <Stack.Screen name='EditGrade' component={ScreenEditGrade} />
                <Stack.Screen name='EvaluativeActivity' component={ScreenEvaluativeActivity} />
                <Stack.Screen name='ActivityFilters' component={ScreenActivityFilters} />

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