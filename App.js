import React from "react";

import ScreenLogin from "./src/screens/Login/index";
import ScreenRegister from "./src/screens/Register/index";
import ScreenForgotPassword from "./src/screens/ForgotPassword/index";
import ScreenPasswordCode  from "./src/screens/PasswordCode/index";
import ScreenRecoverPassword from "./src/screens/RecoverPassword/index";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  const stackNavigatorSettings = {
    headerShown: false,
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={ScreenLogin}
          options={{ headerShown: stackNavigatorSettings.headerShown }}
        />
        <Stack.Screen
          name="Register"
          component={ScreenRegister}
          options={{ headerShown: stackNavigatorSettings.headerShown }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ScreenForgotPassword}
          options={{ headerShown: stackNavigatorSettings.headerShown }}
        />
        <Stack.Screen
          name="PasswordCode"
          component={ScreenPasswordCode}
          options={{ headerShown: stackNavigatorSettings.headerShown }}
        />
        <Stack.Screen
          name="RecoverPassword"
          component={ScreenRecoverPassword}
          options={{ headerShown: stackNavigatorSettings.headerShown }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}