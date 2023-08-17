import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { View } from 'react-native';

const TextArea = ({ text, value, onChangeText }) => {

    return (
        <View>
            <TextInput
                label={text}
                mode="flat"
                multiline
                numberOfLines={6}
                value={value}
                onChangeText={onChangeText}
                style={{ minHeight: 100 }}
            />
        </View>
    );
}

export default TextArea;
