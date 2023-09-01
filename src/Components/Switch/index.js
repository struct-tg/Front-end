import React, { useState } from 'react';
import { Switch } from 'react-native-paper';

const SwitchComponent = () => {
    const [isSwitchOn, setIsSwitchOn] = useState(false);

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    return <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />;
};

export default SwitchComponent;