import React, { Fragment, useContext } from 'react';
import FormsDisciplines from "../../ComponentsDisciplines/FormsDisciplines";
import { insertNewDiscipline } from "../../../../../Services/Requests/Disciplines/index";
import { AutenticacaoContext } from "../../../../../Contexts/UserContext";
import { useNavigation } from '@react-navigation/native';

const AddDiscipline = () => {
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
        </Fragment>
    )
}

export default AddDiscipline;