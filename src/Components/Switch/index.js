import React, { useState } from 'react';
import { Switch } from 'react-native-paper';

const SwitchComponent = ({ value, onValueChange }) => {
    return <Switch value={value} onValueChange={onValueChange} />;
};

export default SwitchComponent;