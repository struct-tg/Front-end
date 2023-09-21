import React from 'react';

/*Telas externas ao APP*/
import ScreenLogin from './Screens/Login/index.js';
import ScreenRegister from "./Screens/Register/index.js";
import ScreenForgotPassword from "./Screens/ForgotPassword/index.js";
import ScreenPasswordCode from "./Screens/PasswordCode/index.js";
import ScreenRecoverPassword from "./Screens/RecoverPassword/index.js";

/*Telas internas ao APP: Home*/
import ScreenHome from "./Screens/Home/index.js";
import ScreenChartHome from "./Screens/Home/ScreensHome/ChartHome/index.js";

/*Telas internas ao APP: ToDo*/
import ScreenToDo from "./Screens/ToDoList/index.js";
import ScreenAddTodo from "./Screens/ToDoList/ScreensToDo/AddTask/index.js";
import ScreenEditTodo from "./Screens/ToDoList/ScreensToDo/EditTask/index.js";
import ScreenFiltersTodo from "./Screens/ToDoList/ScreensToDo/FiltersTask/index.js";

/*Telas internas ao APP: Pomodoro*/
import ScreenPomodoro from "./Screens/Pomodoro/index.js";

/*Telas internas ao APP: Disciplinas*/
import ScreenGrades from "./Screens/Grades/index.js";
import ScreenAddGrade from "./Screens/Grades/ScreensGrades/AddGrade/index.js";
import ScreenEvaluativeActivity from "./Screens/Grades/ScreensGrades/EvaluativeActivity/index.js";
import ScreenActivityFilters from "./Screens/Grades/ScreensGrades/ActivityFilters/index.js";


/*Telas internas ao APP: Calendario*/
import ScreenCalendar from "./Screens/Calendar/index.js";

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

                <Stack.Screen name='AddGrade' component={ScreenAddGrade} />
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