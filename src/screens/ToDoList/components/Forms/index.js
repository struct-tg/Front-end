import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input } from '../../../../Components/Inputs';
import { ContainerButton } from '../../../../styles/DefaultStyles';
import { Button } from '../../../../Components/Button';
import TextArea from "../../../../Components/TextArea";
import ScrollBlock from '../ScrollBlock';

const FormsToDo = ({ dadosIniciais, aoSubmitar, isEdit }) => {
    /*Criando o state do formulario; */
    const [formulario, setFormulario] = useState(dadosIniciais);
    const [subtasks, setSubtasks] = useState([]);

    useEffect(() => {
        setFormulario(dadosIniciais);
        setSubtasks(dadosIniciais.subtasks || []);
    }, [dadosIniciais]);

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

    /*Faço a logica de captura dos dados.*/
    const capturaDados = (nomeInput, valorInput) => {
        setFormulario((dadosAnteriores) => ({
            ...dadosAnteriores,
            [nomeInput]: valorInput
        }));
    }

    const handleSubmitFormulario = () => {
        const formularioComSubtasks = { ...formulario, subtasks };
        aoSubmitar(formularioComSubtasks);
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
            <Input
                text={"Nome da tarefa: "}
                secureText={false}
                value={formulario.taskName}
                onChangeText={(value) => capturaDados("taskName", value)}
            />
            <Input
                text={"Data de previsão: "}
                secureText={false}
                value={formulario.forecastDate}
                onChangeText={(value) => capturaDados("forecastDate", value)}
            />

            <ScrollBlock
                subtasks={subtasks}
                onNewInputAdded={addNewInput}
                onInputChange={handleNewSubtarefa}
                onInputRemove={removeInput}
                onInputFinish={finishTask}
            />

            <TextArea
                text={"Descricação da tarefa: "}
                value={formulario.taskDescription}
                onChangeText={(value) => capturaDados("taskDescription", value)}
            />

            <ContainerButton>
                <Button
                    text={"Salvar tarefa."}
                    onPress={handleSubmitFormulario}
                />
            </ContainerButton>
        </SafeAreaView>
    );
};

export default FormsToDo;