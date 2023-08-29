import React, { useState } from 'react';
import { Input } from '../Inputs';
import { ContainerButton } from '../../styles/DefaultStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../Button';
import TextArea from "../TextArea";
import ScrollBlock from '../ScrollBlock';

const FormsToDo = ({ dadosIniciais, aoSubmitar, isEdit }) => {
    /*Criando o state do formulario; */
    const [formulario, setFormulario] = useState(dadosIniciais);

    /*Faço a logica de captura dos dados.*/
    const capturaDados = (nomeInput, valorInput) => {
        setFormulario((dadosAnteriores) => ({
            ...dadosAnteriores,
            [nomeInput]: valorInput
        }));
    }

    const handleNewSubtarefa = (inputId, inputText) => {
        setFormulario((dadosAnteriores) => ({
            ...dadosAnteriores,
            [inputId]: inputText
        }));
    }

    const handleSubmitFormulario = () => {
        aoSubmitar(formulario);
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
                text={"Data de início: "}
                secureText={false}
                value={formulario.startDate}
                onChangeText={(value) => capturaDados("startDate", value)}
            />
            <Input
                text={"Data de término: "}
                secureText={false}
                value={formulario.endDate}
                onChangeText={(value) => capturaDados("endDate", value)}
            />

            <ScrollBlock
                onNewInputAdded={handleNewSubtarefa}
            />

            <TextArea
                text={"Descricação da tarefa: "}
                value={formulario.taskDescription}
                onChangeText={(value) => capturaDados("taskDescription", value)}
            />

            <ContainerButton>
                <Button
                    text={isEdit ? "Editar dados" : "Adicionar nova tarefa"}
                    onPress={handleSubmitFormulario}
                />
            </ContainerButton>
        </SafeAreaView>
    );
};

export default FormsToDo;