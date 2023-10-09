import React from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const DropdownComponent = ({ state, disable, fnSetValue, text, arrObjInformation }) => {
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
                color: disable ? "gray" : "black",
                fontSize: 16,
            }}
            selectedTextStyle={styles.selectedTextStyle}
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
    selectedTextStyle: {
        fontSize: 16,
    },
});