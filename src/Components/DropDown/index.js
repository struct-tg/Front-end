import React from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const DropdownComponent = ({ state, disable, fnSetValue, text, arrObjInformation }) => {
    const colors = disable ? "#B3B1B1" : "#535454";
    const inputFontSize = 16;

    return (
        <Dropdown
            data={arrObjInformation}
            style={[
                styles.dropdown,
                disable ? styles.disabledDropdown : null
            ]}
            placeholder={text}
            disable={disable}
            placeholderStyle={{
                color: colors,
                fontSize: inputFontSize,
            }}
            selectedTextStyle={{
                color: colors,
                fontSize: inputFontSize,
            }}
            maxHeight={150}
            labelField="label"
            valueField="value"
            value={state}
            onChange={item => {
                fnSetValue(item.value);
            }}
        />
    );
};

export default DropdownComponent;

const styles = StyleSheet.create({
    dropdown: {
        backgroundColor: "white",
        height: 60,
        paddingHorizontal: 20,
        borderTopStartRadius: 5,
        borderTopEndRadius: 5,
        borderBottomColor: "black",
        borderStyle: "solid"
    },
    disabledDropdown: {
        backgroundColor: "#ffffff",
        borderColor: "#000000",
        borderWidth: 1.2,

    },
});