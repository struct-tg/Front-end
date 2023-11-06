import React, { Fragment, useContext, useState } from 'react';
import FormsDisciplines from "../../ComponentsDisciplines/FormsDisciplines";
import { insertNewDiscipline } from "../../../../../Services/Requests/Disciplines/index";
import { AutenticacaoContext } from "../../../../../Contexts/UserContext";
import { useNavigation } from '@react-navigation/native';
import ToastComponent from '../../../../../Components/Toast';

const AddDiscipline = () => {
    const [toastVisible, setToastVisible] = useState(false);

    const { tokenJWT } = useContext(AutenticacaoContext)
    const navigation = useNavigation();

    const handleAddNewDiscipline = async (dadosFormulario) => {
        dadosFormulario.noteMin = parseFloat(dadosFormulario.noteMin);
        dadosFormulario.noteMin = parseFloat(dadosFormulario.noteMin.toFixed(2));
        if (dadosFormulario.dateEnd) {
            dadosFormulario.dateEnd = null;
        } else {
            dadosFormulario.dateEnd = new Date();
        }

        try {
            const result = await insertNewDiscipline(tokenJWT, dadosFormulario);
            if (result) {
                navigation.navigate('Disciplinas');
                setToastVisible(true);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <Fragment>
            <FormsDisciplines
                aoSubmitar={handleAddNewDiscipline}
                isEdit={false}
            />
            {toastVisible
                &&
                (<ToastComponent
                    ToastType={'success'}
                    Title={'Disciplina adicionada com sucesso!'}
                    Description={'Você tem uma nova disciplina, Estudante.'}
                />
                )
            }
        </Fragment>
    )
}

export default AddDiscipline;