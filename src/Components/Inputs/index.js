import React from 'react';
import { TextInput, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native';
import { ContainerIconButton, ContainerIconInput } from "../../Components/Inputs/StylesInputs.js";

export const Input = ({ secureText, text, value, onChangeText }) => {
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
};

export const InputIcon = ({ secureText, text, value, onChangeText, Icon, onButtonPress }) => {
    return (
        <ContainerIconButton>
            <ContainerIconInput>
                <TextInput
                    label={text}
                    mode="flat"
                    secureTextEntry={secureText}
                    value={value}
                    onChangeText={onChangeText}
                />
            </ContainerIconInput>
            <IconButton
                icon={Icon}
                onPress={onButtonPress}
            />
        </ContainerIconButton>
    );
};