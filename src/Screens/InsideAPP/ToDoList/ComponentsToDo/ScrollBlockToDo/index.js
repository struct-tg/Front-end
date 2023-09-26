import React, { useState } from "react";
import { View } from "react-native";
import { InputIcon } from "../../../../../Components/Inputs";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useForm, Controller } from "react-hook-form";
import uuid from 'react-native-uuid';
import ContainerScroll from "./StylesScrollBlock.js";
import HelperTextComponent from "../../../../../Components/HelperText";

const ScrollBlock = ({ state, addInput, removeInput, finishInput, changeInput, isEdit }) => {
    const { control, formState: { errors } } = useForm({ mode: "onChange" });

    const addNewInput = () => {
        const newInputId = uuid.v4();
        addInput(newInputId);
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
                {state.map((subtask, index) => (
                    <View key={subtask.id} style={{ marginBottom: 15 }}>
                        <InputIcon
                            text={"Adicione uma subtarefa: "}
                            value={subtask.description}
                            onChangeText={(newText) => changeInput(subtask.id, newText)}
                            textBlock={subtask.status}
                            iconOne={() => (
                                <Ionicons
                                    name="checkmark-outline"
                                    size={35}
                                    color={subtask.status === true ? "#02f78d" : "white"}
                                    onPress={() => {
                                        finishInput(subtask.id, subtask.status);
                                    }}
                                />
                            )}
                            iconTwo={() => (
                                <Ionicons
                                    name="trash-outline"
                                    size={35}
                                    color={"white"}
                                    onPress={() =>
                                        removeInput(subtask.id)
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