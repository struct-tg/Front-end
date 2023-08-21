import React from "react";

/*Tem que diminuir este trecho de codigo de importação, 
mas isso fica para um momento posterior.
*/

import ScreenLogin from "./src/screens/Login/index";
import ScreenRegister from "./src/screens/Register/index";
import ScreenForgotPassword from "./src/screens/ForgotPassword/index";
import ScreenPasswordCode from "./src/screens/PasswordCode/index";
import ScreenRecoverPassword from "./src/screens/RecoverPassword/index";

import ScreenHome from "./src/screens/Home/index";
import ScreenToDo from "./src/screens/ToDoList/index";
import ScreenPomodoro from "./src/screens/Pomodoro/index";
import ScreenGrades from "./src/screens/Grades/index";
import ScreenCalendar from "./src/screens/Calendar/index";
import ScreenFormsToDo from "./src/Components/Forms/index";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>

        <Stack.Screen name="Login" component={ScreenLogin} />
        <Stack.Screen name="Register" component={ScreenRegister} />
        <Stack.Screen name="ForgotPassword" component={ScreenForgotPassword} />
        <Stack.Screen name="PasswordCode" component={ScreenPasswordCode} />
        <Stack.Screen name="RecoverPassword" component={ScreenRecoverPassword} />
        <Stack.Screen name="FormsToDo" component={ScreenFormsToDo} />

        <Stack.Screen name="RoutesApp" component={RoutesApp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function RoutesApp() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true }} >
      <Tab.Screen
        name="Home"
        component={ScreenHome}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name="ToDo"
        component={ScreenToDo}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="checkmark-circle-outline" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name="Pomodoro"
        component={ScreenPomodoro}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="stopwatch-outline" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name="Grades"
        component={ScreenGrades}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-outline" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={ScreenCalendar}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" color={color} size={size} />
          )
        }}
      />
    </Tab.Navigator>
  );
}