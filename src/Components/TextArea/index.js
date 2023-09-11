import React from 'react';
import { TextInput } from 'react-native-paper';
import { View } from 'react-native';

const TextArea = ({ text, value, onChangeText }) => {
    return (
        <View>
            <TextInput
                label={text}
                mode="flat"
                multiline
                numberOfLines={3}
                value={value}
                onChangeText={onChangeText}
                style={{ minHeight: 80 }}
            />
        </View>
    );
}

export default TextArea;