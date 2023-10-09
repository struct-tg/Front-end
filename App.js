import React, { Fragment } from "react";
import { AutenticacaoProvider } from "./src/Contexts/UserContext";

import Toast from 'react-native-toast-message';
import toastConfig from "./src/Components/Toast/toastConfig";
import Routes from "./src/routes";
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  return (
    <Fragment>
      <AutenticacaoProvider>
        <Routes />
      </AutenticacaoProvider>
      <Toast config={toastConfig} />
    </Fragment>
  );
};