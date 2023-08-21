import React, { useState } from 'react';
import { Input } from '../Inputs';
import { ContainerButton } from '../../styles/DefaultStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Button from '../Button';
import TextArea from "../TextArea";
import ScrollBlock from '../ScrollBlock';
import uuid from 'react-native-uuid';

const FormsToDo = () => {
    const [campos, setCampos] = useState({
        id: uuid.v4(),
        taskName: "",
        startDate: "",
        endDate: "",
        taskDescription: ""
    });

    const capturaDados = (nomeInput, valorInput) => {
        setCampos((dadosAnteriores) => ({
            ...dadosAnteriores,
            [nomeInput]: valorInput
        }));
    }

    const handleNewSubtarefa = (inputId, inputText) => {
        setCampos((dadosAnteriores) => ({
            ...dadosAnteriores,
            [inputId]: inputText
        }));
    }

    const cleanInputs = () => {
        setCampos({
            taskName: "",
            startDate: "",
            endDate: "",
            taskDescription: ""
        });
    }

    const navigate = useNavigation();
    const addNewTask = () => {
        console.log("Dados da nova tarefa:", campos);
        navigate.navigate('ToDo', { datasForm: campos });
        cleanInputs();
    }

    return (
        <SafeAreaView style={{ backgroundColor: '#40aab8', flexGrow: 1, justifyContent: 'space-evenly', paddingHorizontal: 20 }}>
            <Input
                text={"Nome da tarefa: "}
                secureText={false}
                value={campos.taskName}
                onChangeText={(value) => capturaDados("taskName", value)}
            />
            <Input
                text={"Data de início: "}
                secureText={false}
                value={campos.startDate}
                onChangeText={(value) => capturaDados("startDate", value)}
            />
            <Input
                text={"Data de término: "}
                secureText={false}
                value={campos.endDate}
                onChangeText={(value) => capturaDados("endDate", value)}
            />

            <ScrollBlock onNewInputAdded={handleNewSubtarefa} />

            <TextArea
                text={"Descricação da tarefa: "}
                value={campos.taskDescription}
                onChangeText={(value) => capturaDados("taskDescription", value)}
            />

            <ContainerButton>
                <Button
                    text={"Adicionar nova tarefa."}
                    onPress={addNewTask}
                />
            </ContainerButton>
        </SafeAreaView>
    );
};

export default FormsToDo;