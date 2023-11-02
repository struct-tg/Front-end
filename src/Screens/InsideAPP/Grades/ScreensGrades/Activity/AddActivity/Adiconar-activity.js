import React, { useState, useContext, Fragment } from 'react';
import { useNavigation } from '@react-navigation/native';

import { AutenticacaoContext } from "../../../../../../Contexts/UserContext";
import { insertNewActivity } from "../../../../../../Services/Requisicoes/Activity/activity-service";
import FormsActivity from '../Components/FormsActivity/ActivityFoms';

const AddActivity = ({ route }) => {
    const { tokenJWT } = useContext(AutenticacaoContext);
    const { entidadeId } = route.params;
    const navigation = useNavigation();

    const handleAddNewActivity = async (dadosFormulario) => {
        dadosFormulario.discipline = Strimg(entidadeId.name.value);
        dadosFormulario.nameActivity = String(dadosFormulario.nameActivity);
        dadosFormulario.typeAc = Strimg(dadosFormulario.typeAc);
        dadosFormulario.date = String(dadosFormulario.date);
        dadosFormulario.weight = parseFloat(dadosFormulario.weight);
        dadosFormulario.note = parseFloat(dadosFormulario.note);
        dadosFormulario.comment = String(dadosFormulario.comment);
        dadosFormulario.description = String(dadosFormulario.description);

        try {
            const result = await insertNewActivity(tokenJWT, dadosFormulario);
            if (result) {
                navigation.navigate('ActivityList');
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <Fragment>
            <FormsActivity
                save={handleAddNewActivity}
                isEdit={false}
            />
        </Fragment>
    )
}

export default AddActivity;