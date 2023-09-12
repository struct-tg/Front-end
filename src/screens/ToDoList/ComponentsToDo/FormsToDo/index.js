import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { Input } from '../../../../Components/Inputs';
import { ContainerButton } from '../../../../Styles/DefaultStyles';
import { Button } from '../../../../Components/Button';
import TextArea from "../../../../Components/TextArea";
import ScrollBlock from '../ScrollBlockToDo';
import HelperTextComponent from "../../../../Components/HelperText";

const FormsToDo = ({ aoSubmitar, initialValues }) => {
    const { control, handleSubmit, formState: { errors }, } = useForm({ mode: "onChange", defaultValues: initialValues });
    const [subtasks, setSubtasks] = useState([]);

    const fnAddNewInput = (ID) => {
        const newSubtask = {
            id: ID,
            description: "",
            status: false,
        }
        setSubtasks((prevSubtasks) => [...prevSubtasks, newSubtask]);
    };

    const fnRemoveInput = (inputId) => {
        setSubtasks((prevSubtasks) =>
            prevSubtasks.filter((subtask) => subtask.id !== inputId)
        );
    };

    const fnFinishTask = (inputId, item) => {
        setSubtasks((prevSubtasks) => {
            const updatedSubtasks = prevSubtasks.map((subtask) =>
                subtask.id === inputId ? { ...subtask, status: !subtask.status } : subtask
            );
            return updatedSubtasks;
        });
    };

    const fnChangeText = (inputId, inputText) => {
        setSubtasks((prevSubtasks) => {
            const updatedSubtasks = prevSubtasks.map((subtask) =>
                subtask.id === inputId ? { ...subtask, text: inputText } : subtask
            );
            return updatedSubtasks;
        });
    }

    const fnSubmit = (data) => {
        /*const subtaskData = subtasks.map((subtask) => ({
            description: subtask.text,
            status: subtask.status,
        }));

        const objEnvio = { ...data, SubTask: subtaskData };       */
        aoSubmitar(data)
    }

    return (
        <SafeAreaView style={{ backgroundColor: '#40aab8', flexGrow: 1, justifyContent: 'space-evenly', paddingHorizontal: 20 }}>
            <Controller
                control={control}
                name='name'
                defaultValue=""
                rules={{ required: ' Campo obrigatório! ' }}
                render={({ field }) => (
                    <View>
                        <Input
                            text={"Nome da tarefa: "}
                            secureText={false}
                            value={field.value}
                            onChangeText={field.onChange}
                        />
                        {errors.name && (<HelperTextComponent helperType={'error'} helperText={errors.name.message} />)}
                    </View>
                )}
            />

            <Controller
                control={control}
                name='dateWishEnd'
                defaultValue=""
                rules={{ required: ' Campo obrigatório! ' }}
                render={({ field }) => (
                    <View>
                        <Input
                            text={"Data de previsão: "}
                            secureText={false}
                            value={field.value}
                            onChangeText={field.onChange}
                        />
                        {errors.dateWishEnd && (<HelperTextComponent helperType={'error'} helperText={errors.dateWishEnd.message} />)}
                    </View>
                )}
            />

            <ScrollBlock
                state={subtasks}
                setState={setSubtasks}
                addInput={fnAddNewInput}
                removeInput={fnRemoveInput}
                finishInput={fnFinishTask}
                changeInput={fnChangeText}
            />

            <Controller
                control={control}
                name='description'
                defaultValue=""
                rules={{ required: ' Campo obrigatório! ' }}
                render={({ field }) => (
                    <View>
                        <TextArea
                            text={"Descricação da tarefa: "}
                            value={field.value}
                            onChangeText={field.onChange}
                        />
                        {errors.description && (<HelperTextComponent helperType={'error'} helperText={errors.description.message} />)}
                    </View>
                )}
            />

            <ContainerButton>
                <Button
                    text={"Salvar tarefa."}
                    onPress={handleSubmit(fnSubmit)}
                />
            </ContainerButton>
        </SafeAreaView>
    );
};

export default FormsToDo;