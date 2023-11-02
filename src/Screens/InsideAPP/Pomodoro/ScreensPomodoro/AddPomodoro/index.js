import React, { Fragment, useState, useContext } from 'react';
import { createPomodoro } from "../../../../../Services/Requests/Pomodoro/index.js";
import { AutenticacaoContext } from "../../../../../Contexts/UserContext.js";
import { useNavigation } from '@react-navigation/native';
import FormsPomodoro from '../../Components/FormsPomodoro';
import ToastComponent from "../../../../../Components/Toast";

const AddPomodoro = () => {
    const [toastVisible, setToastVisible] = useState(false);
    const { tokenJWT } = useContext(AutenticacaoContext);
    const navigation = useNavigation();

    const aoSubmitarForm = async (dadosFormulario) => {
        const result = await createPomodoro(dadosFormulario, tokenJWT)
        if (result) {
            setToastVisible(true);
            navigation.navigate('Pomodoro');
        }
        else {
            console.log('Algo deu errado na adição de um pomodoro');
        }
    }

    return (
        <Fragment>
            <FormsPomodoro
                aoSubmitar={aoSubmitarForm}
                isEdit={false}
            />
            {toastVisible
                &&
                (<ToastComponent
                    ToastType={'success'}
                    Title={'Pomodoro adicionado com sucesso!'}
                    Description={'Você tem um novo pomodoro, Estudante.'}
                />
                )
            }
        </Fragment>
    )
}

export default AddPomodoro;