import React, { useState } from "react";
import Input from "../Inputs";
import TextArea from "../TextArea";
import Button from "../Button";
import Modal from "react-native-modal";
import { View } from "react-native";
import {
    FormContainer,
    ContainerButton
} from "../../styles/ToDoList";

const ModalComponent = ({ visible, state }) => {
    const [camposForm, setCamposForm] = useState({
        taskName: "",
        startDate: "",
        endDate: "",
        subtask: "",
        taskDescription: ""
    });

    /*
        significa dizer que eu estou atualizando o estado especifico do meu 
        input que foi digitado algo, mantendo as informações dos outros inputs 
        que ainda nao foram alterados;
    */
    const capturaMudançasDeDados = (campoDeInput, value) => {
        setCamposForm((dadosAnteriores) => ({
            ...dadosAnteriores,
            [campoDeInput]: value
        }));
    };

    const clearInputs = () => {
        setCamposForm({
            taskName: "",
            startDate: "",
            endDate: "",
            subtask: "",
            taskDescription: ""
        });
    };

    const addNewTask = () => {
        clearInputs();
        state();
    };

    return (
        <View>
            <Modal isVisible={visible} >
                <FormContainer>
                    <Input
                        secureText={false}
                        text={"Nome da tarefa: "}
                        value={camposForm.taskName}
                        onChangeText={(value) => capturaMudançasDeDados("taskName", value)}
                    />
                    <Input
                        secureText={false}
                        text={"Data de inicio: "}
                        value={camposForm.startDate}
                        onChangeText={(value) => capturaMudançasDeDados("startDate", value)}
                    />
                    <Input
                        secureText={false}
                        text={"Data de término: "}
                        value={camposForm.endDate}
                        onChangeText={(value) => capturaMudançasDeDados("endDate", value)}
                    />
                    <Input
                        secureText={false}
                        text={"Adicione uma subtarefa: "}
                        value={camposForm.subtask}
                        onChangeText={(value) => capturaMudançasDeDados("subtask", value)}
                    />

                    <TextArea
                        text={"Descrição da tarefa: "}
                        value={camposForm.taskDescription}
                        onChangeText={(value) => capturaMudançasDeDados("taskDescription", value)}
                    />

                    <ContainerButton>
                        <Button
                            text="Nova tarefa"
                            onPress={addNewTask}
                        />
                    </ContainerButton>

                </FormContainer>
            </Modal>
        </View>
    );
}

export default ModalComponent;