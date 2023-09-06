import React, { useState } from "react";
import { View } from "react-native";
import { InputIcon } from "../../../../Components/Inputs";
import ContainerScroll from "./StylesScrollBlock.js";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import uuid from 'react-native-uuid';

const ScrollBlock = ({ subtasks, onNewInputAdded, onInputChange, onInputRemove, onInputFinish }) => {

    const addNewInput = () => {
        const newInputId = uuid.v4();
        onNewInputAdded(newInputId);
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
                    <View key={subtask.id} style={{ marginBottom: 2 }}>
                        <InputIcon
                            text={"Nome da subtarefa: "}
                            value={subtask.text}
                            textBlock={subtask.status}
                            onChangeText={(newText) => onInputChange(subtask.id, newText)}
                            iconCheck={() => (
                                <Ionicons
                                    name="checkmark-outline"
                                    size={35}
                                    color={subtask.status === true ? "green" : "white"}
                                    onPress={() => {
                                        onInputFinish(subtask.id, subtask.status);
                                    }}
                                />
                            )}
                            iconTrash={() => (
                                <Ionicons
                                    name="trash-outline"
                                    size={35}
                                    color={"white"}
                                    onPress={() =>
                                        onInputRemove(subtask.id)
                                    }
                                />
                            )}
                        />
                    </View>
                ))}
            </ContainerScroll>
        </View>
    );
}

export default ScrollBlock;