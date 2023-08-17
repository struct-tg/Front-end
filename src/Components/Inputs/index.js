import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native';

const Input = ({ secureText, text, value, onChangeText }) => {

    return (
        <SafeAreaView>
            <TextInput
                label={text}
                mode="flat"
                secureTextEntry={secureText}
                value={value}
                onChangeText={onChangeText}
            />
        </SafeAreaView>
    );
}

export default Input;