import React, { Fragment } from "react";
import Toast from 'react-native-toast-message';
import toastConfig from "./src/Components/Toast/toastConfig";
import Routes from "./src/routes";

export default function App() {
  return (
    <Fragment>
      <Routes />
      <Toast config={toastConfig} />
    </Fragment>
  );
};