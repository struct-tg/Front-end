import React from 'react';

/*Telas externas ao APP*/
import ScreenLogin from './Screens/OutsideAPP/Login/index.js';
import ScreenRegister from "./Screens/OutsideAPP/Register/index.js";
import ScreenForgotPassword from "./Screens/OutsideAPP/ForgotPassword/index.js";
import ScreenPasswordCode from "./Screens/OutsideAPP/PasswordCode/index.js";
import ScreenRecoverPassword from "./Screens/OutsideAPP/RecoverPassword/index.js";

/*Telas internas ao APP: Home*/
import ScreenHome from "./Screens/InsideAPP/Home/index.js";

/*Telas internas ao APP: ToDo*/
import ScreenToDo from "./Screens/InsideAPP/ToDoList/index.js";
import ScreenAddTodo from "./Screens/InsideAPP/ToDoList/ScreensToDo/AddTask/index.js";
import ScreenEditTodo from "./Screens/InsideAPP/ToDoList/ScreensToDo/EditTask/index.js";
import ScreenFiltersTodo from "./Screens/InsideAPP/ToDoList/ScreensToDo/FiltersTask/index.js";
import ScreenChartToDo from "./Screens/InsideAPP/ToDoList/ScreensToDo/ChartToDo/index.js";

/*Telas internas ao APP: Pomodoro*/
import ScreenPomodoro from "./Screens/InsideAPP/Pomodoro/index.js";
import ScreenAddPomodoro from "./Screens/InsideAPP/Pomodoro/ScreensPomodoro/AddPomodoro/index.js";
import ScreenEditPomodoro from "./Screens/InsideAPP/Pomodoro/ScreensPomodoro/EditPomodoro/index.js";
import ScreenClockPomodoro from "./Screens/InsideAPP/Pomodoro/ScreensPomodoro/PomodoroClock/index.js";

/*Telas internas ao APP: Disciplinas*/
import ScreenDiscipline from "./Screens/InsideAPP/Disciplines/index.js";
import ScreenAddDisciplines from "./Screens/InsideAPP/Disciplines/ScreensDisciplines/AddDisciplines/index.js";
import ScreenEditDisciplines from "./Screens/InsideAPP/Disciplines/ScreensDisciplines/EditDisciplines/index.js";
import ScreenDisciplinesFilters from "./Screens/InsideAPP/Disciplines/ScreensDisciplines/DisciplinesFilters";
import ScreenDisciplinesFiltersToDo from "./Screens/InsideAPP/Disciplines/ScreensDisciplines/DisciplinesFiltersToDo/index.js";

/*Telas internas ao APP: Atividades avaliativas*/
import ScreenActivity from "./Screens/InsideAPP/Activity/index.js";
import ScreenAddActivity from "./Screens/InsideAPP/Activity/ScreensActivity/AddActivity/index.js";
import ScreenEditActivity from "./Screens/InsideAPP/Activity/ScreensActivity/EditActivity/index.js";
import ScreenFilterActivity from "./Screens/InsideAPP/Activity/ScreensActivity/FiltersActivity/index.js";

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

                <Stack.Screen name="AddTodo" component={ScreenAddTodo} />
                <Stack.Screen name="EditTodo" component={ScreenEditTodo} />
                <Stack.Screen name="FiltersTodo" component={ScreenFiltersTodo} />
                <Stack.Screen name="ChartTodo" component={ScreenChartToDo} />

                <Stack.Screen name="AddPomodoro" component={ScreenAddPomodoro} />
                <Stack.Screen name="EditPomodoro" component={ScreenEditPomodoro} />
                <Stack.Screen name="ClockPomodoro" component={ScreenClockPomodoro} />

                <Stack.Screen name='AddDiscipline' component={ScreenAddDisciplines} />
                <Stack.Screen name='EditDiscipline' component={ScreenEditDisciplines} />
                <Stack.Screen name='DisciplineFilters' component={ScreenDisciplinesFilters} />
                <Stack.Screen name='DisciplinesFiltersToDo' component={ScreenDisciplinesFiltersToDo} />

                <Stack.Screen name="Activity" component={ScreenActivity} />
                <Stack.Screen name="AddActivity" component={ScreenAddActivity} />
                <Stack.Screen name="EditActivity" component={ScreenEditActivity} />
                <Stack.Screen name='FilterActivity' component={ScreenFilterActivity} />

                <Stack.Screen name="RoutesApp" component={RoutesApp} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

function RoutesApp() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true, tabBarStyle: { backgroundColor: "#168B9D", borderColor: "transparent", borderWidth: 0 }, tabBarLabelStyle: { color: "white" } }} >
            <Tab.Screen
                name="Início"
                component={ScreenHome}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" color={"white"} size={30} />
                    )
                }}
            />
            <Tab.Screen
                name="Disciplinas"
                component={ScreenDiscipline}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="book-outline" color={"white"} size={30} />
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
                name="Tarefas"
                component={ScreenToDo}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="checkmark-circle-outline" color={"white"} size={30} />
                    )
                }}
            />
            <Tab.Screen
                name="Calendario"
                component={ScreenCalendar}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="calendar-outline" color={"white"} size={30} />
                    )
                }}
            />
        </Tab.Navigator>
    );
}

export default Routes;