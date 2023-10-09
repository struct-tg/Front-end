import React, { Fragment, useState, useContext } from 'react';
import { updatePomodoro } from "../../../../../Services/Requisicoes/Pomodoro/index.js";
import { useNavigation } from '@react-navigation/native';
import { AutenticacaoContext } from "../../../../../Contexts/UserContext.js";
import FormsPomodoro from "../../Components/FormsPomodoro/index.js";
import ToastComponent from "../../../../../Components/Toast/index.js";

const EditPomodoro = ({ route }) => {
    const [toastVisible, setToastVisible] = useState(false);
    const { tokenJWT } = useContext(AutenticacaoContext);
    const { objEdit } = route.params;
    const navigation = useNavigation();

    const fnEditSubmitForm = async (dadosFormulario) => {
        const result = await updatePomodoro(dadosFormulario.id, dadosFormulario, tokenJWT)
        if (result) {
            setToastVisible(true);
            navigation.navigate('Pomodoro');
        } else {
            console.log('Algo deu errado na edicao de um pomodoro');
        }
    }

    return (
        <Fragment>
            <FormsPomodoro
                aoSubmitar={fnEditSubmitForm}
                initialValues={objEdit}
                isEdit={true}
            />
            {   toastVisible
                &&
                (   <ToastComponent 
                        ToastType={'success'}
                        Title={'Pomodoro editado com sucesso!'}
                        Description={'Você editou um pomodoro, Estudante!'}
                    />
                )
            }
        </Fragment>
    );
}

export default EditPomodoro;