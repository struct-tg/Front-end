import React from 'react'
import { useNavigation } from '@react-navigation/native';
import FormsToDo from "../components/Forms";
import uuid from 'react-native-uuid';

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