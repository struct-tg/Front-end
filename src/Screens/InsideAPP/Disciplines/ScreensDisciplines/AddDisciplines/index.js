import React, { Fragment, useContext, useState, useEffect } from 'react';
import FormsDisciplines from "../../ComponentsDisciplines/FormsDisciplines";
import { insertNewDiscipline } from "../../../../../Services/Requests/Disciplines/index";
import { AutenticacaoContext } from "../../../../../Contexts/UserContext";
import { useNavigation } from '@react-navigation/native';
import ToastComponent from '../../../../../Components/Toast';

const AddDiscipline = () => {
    const [firstToastVisible, setFirstToastVisible] = useState(false);
    const [secondToastVisible, setSecondToastVisible] = useState(false);

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
                setFirstToastVisible(true);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (firstToastVisible) {
            const timeout = setTimeout(() => {
                setFirstToastVisible(false);
                setSecondToastVisible(true);
            }, 400);

            return () => clearTimeout(timeout);
        }
    }, [firstToastVisible]);

    useEffect(() => {
        if (secondToastVisible) {
            const timeout = setTimeout(() => {
                setSecondToastVisible(false);
                navigation.navigate('Disciplinas');
            }, 400);

            return () => clearTimeout(timeout);
        }
    }, [secondToastVisible, navigation]);

    return (
        <Fragment>
            <FormsDisciplines
                aoSubmitar={handleAddNewDiscipline}
                isEdit={false}
            />
            {firstToastVisible && (
                <ToastComponent
                    ToastType={'success'}
                    Title={'Disciplina adicionada com sucesso!'}
                    Description={'Você tem uma nova disciplina, Estudante.'}
                />
            )}
            {secondToastVisible && (
                <ToastComponent
                    ToastType={'info'}
                    Title={'Finalize uma disciplina!'}
                    Description={'Pressione a disciplina para finalizar.'}
                />
            )}
        </Fragment>
    )
}

export default AddDiscipline;