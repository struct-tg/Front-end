import React, { useState } from "react";
import { View } from "react-native";
import { InputIcon } from "../Inputs";
import ContainerScroll  from "../../Components/ScrollBlock/StylesScrollBlock.js";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import uuid from 'react-native-uuid';

const ScrollBlock = ({ onNewInputAdded }) => {
    const [subtasks, setSubtasks] = useState([]);

    const addNewInput = () => {
        const newInputId = uuid.v4();
        const newInput = {
            id: newInputId,
            text: "",
            component: (
                <InputIcon
                    text={"Nome da subtarefa: "}
                    secureText={false}
                    Icon={() => (
                        <Ionicons
                            name="trash-outline"
                            size={35}
                            color={"white"}
                        />
                    )}
                    key={uuid.v4()}
                    onButtonPress={() => removeInput(newInputId)}
                    onChangeText={(newText) => {
                        handleInputChange(newInputId, newText);
                        onNewInputAdded(newInputId, newText);
                    }}
                />
            )
        };
        setSubtasks((prevSubtasks) => [...prevSubtasks, newInput]);
    }

    const removeInput = (inputId) => {
        setSubtasks((prevSubtasks) => prevSubtasks.filter((subtask) => subtask.id !== inputId));
    }

    const handleInputChange = (inputId, newText) => {
        setSubtasks((prevSubtasks) =>
            prevSubtasks.map((subtask) =>
                subtask.id === inputId ? { ...subtask, text: newText } : subtask
            )
        );
    }

    return (
        <View>
            <TouchableOpacity onPress={addNewInput}>
                <Ionicons
                    name="add-circle-outline"
                    size={35}
                    color={"white"}
                />
            </TouchableOpacity>

            <ContainerScroll>
                {subtasks.map((subtask) => (
                    <View key={subtask.id}>
                        {subtask.component}
                    </View>
                ))}
            </ContainerScroll>
        </View>
    );
}

export default ScrollBlock;
