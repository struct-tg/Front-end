import React from "react";
import ScreenLogin from "./src/screens/Login/index";
import ScreenRegister from "./src/screens/Register/index";
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}