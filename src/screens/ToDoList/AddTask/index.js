import React from 'react'
import FormsToDo from "../../../Components/Forms";
import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/native';

const AddTask = () => {
    const navigation = useNavigation();

    /* Definindo os campos dos inputs; */
    const dadosInputInicial = {
        id: uuid.v4(),
        taskName: "",
        forecastDate: "",
        taskDescription: ""
    }

    /*Criando a funcao que captura os dados*/
    const aoSubmitarForm = (dadosFormulario) => {
        navigation.navigate('ToDo', { datasForm: dadosFormulario })
    }

    return (
        <FormsToDo
            dadosIniciais={dadosInputInicial}
            aoSubmitar={aoSubmitarForm}
            isEdit={false}
        />
    );
}

export default AddTask;