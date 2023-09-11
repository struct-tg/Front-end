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
    const { control, handleSubmit, formState: { errors } } = useForm({ mode: "onChange", defaultValues: initialValues });
    const [subtasks, setSubtasks] = useState([]);

    useEffect(() => {
    }, [subtasks]);

    const handleNewSubtarefa = (inputId, inputText) => {
        setSubtasks((prevSubtasks) => {
            const updatedSubtasks = prevSubtasks.map((subtask) =>
                subtask.id === inputId ? { ...subtask, text: inputText } : subtask
            );
            return updatedSubtasks;
        });
    }

    const removeInput = (inputId) => {
        setSubtasks((prevSubtasks) =>
            prevSubtasks.filter((subtask) => subtask.id !== inputId)
        );
    }

    const finishTask = (inputId, item) => {
        setSubtasks((prevSubtasks) => {
            const updatedSubtasks = prevSubtasks.map((subtask) =>
                subtask.id === inputId ? { ...subtask, status: !subtask.status } : subtask
            );
            return updatedSubtasks;
        });
        console.log(`O id clicado: ${inputId} e o dados do input: ${item}`);
    }

    const addNewInput = (newInputId) => {
        const newSubtask = {
            id: newInputId,
            text: "",
            status: false
        };
        setSubtasks((prevSubtasks) => [...prevSubtasks, newSubtask]);
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
                subtasks={subtasks}
                onNewInputAdded={addNewInput}
                onInputChange={handleNewSubtarefa}
                onInputRemove={removeInput}
                onInputFinish={finishTask}
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
                    onPress={handleSubmit(aoSubmitar)}
                />
            </ContainerButton>
        </SafeAreaView>
    );
};

export default FormsToDo;