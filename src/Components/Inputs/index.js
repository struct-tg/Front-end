import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native';

const Input = ({ secureText, text }) => {
    const [value, setValue] = useState('');

    return (
        <SafeAreaView>
            <TextInput
                label={text}
                mode="flat"
                secureTextEntry={secureText}
                onChangeText={(value) => setValue(value)}
                value={value}
            />
        </SafeAreaView>
    );
}

export default Input;