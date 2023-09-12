import React, { useState } from "react";
import { View } from "react-native";
import { InputIcon } from "../../../../Components/Inputs";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useForm, Controller } from "react-hook-form";
import uuid from 'react-native-uuid';
import ContainerScroll from "./StylesScrollBlock.js";
import HelperTextComponent from "../../../../Components/HelperText";

const ScrollBlock = ({ state, addInput, removeInput, finishInput, changeInput }) => {
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
                    <Controller
                        key={subtask.id}
                        control={control}
                        name={`subtasks[${index}].text`}
                        rules={{ required: "Campo obrigatório" }}
                        render={({ field }) => (
                            <View>
                                <InputIcon
                                    text={"Adicione uma subtarefa: "}

                                    onChangeText={(newText) => changeInput(subtask.id, newText)}
                                    textBlock={subtask.status}
                                    iconCheck={() => (
                                        <Ionicons
                                            name="checkmark-outline"
                                            size={35}
                                            color={subtask.status === true ? "green" : "white"}
                                            onPress={() => {
                                                finishInput(subtask.id, subtask.status);
                                            }}
                                        />
                                    )}
                                    iconTrash={() => (
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
                                {errors.subtasks && errors.subtasks[index] && (
                                    <HelperTextComponent helperType={"error"} helperText={errors.subtasks[index].message} />
                                )}
                            </View>
                        )}
                    />
                ))}
            </ContainerScroll>
        </View>
    );
}

export default ScrollBlock;