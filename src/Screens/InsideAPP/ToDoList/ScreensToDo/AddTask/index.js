import React, { Fragment, useState, useContext } from 'react'
import { useNavigation } from '@react-navigation/native';
import { AutenticacaoContext } from "../../../../../Contexts/UserContext";
import { insertNewTask } from "../../../../../Services/Requisicoes/Tasks";
import FormsToDo from "../../ComponentsToDo/FormsToDo";
import ToastComponent from "../../../../../Components/Alert";

const AddTask = () => {
    const [toastVisible, setToastVisible] = useState(false);
    const { tokenJWT } = useContext(AutenticacaoContext);
    const navigation = useNavigation();

    const aoSubmitarForm = async (dadosFormulario) => {
        const result = await insertNewTask(dadosFormulario, tokenJWT)
        if (result) {
            setToastVisible(true);
            navigation.navigate('ToDo');
        } else {
            console.log('Algo deu errado em cadastrar tarefa: ');
        }
    }

    return (
        <Fragment>
            <FormsToDo
                aoSubmitar={aoSubmitarForm}
                isEdit={false}
                interactions={true}
            />
            {toastVisible && (
                <ToastComponent
                    ToastType={'success'}
                    Title={'Tarefa adicionada com sucesso!'}
                    Description={'Você tem uma nova tarefa, Estudante.'}
                />
            )
            }
        </Fragment>
    );

}

export default AddTask;