import React, { useContext, Fragment } from 'react';
import FormsActivity from '../Components/FormsActivity/FormsActivity';

import { insertNewActivity } from "../../../../../../Services/Requisicoes/Activity/activity-service";
import { AutenticacaoContext } from "../../../../../../Contexts/UserContext";
import { useNavigation } from '@react-navigation/native';

const AddActivity = () => {
    const { tokenJWT } = useContext(AutenticacaoContext);
    const navigation = useNavigation();

    console.log('chega aqui');

    const handleAddNewActivity = async (dadosFormulario) => {
        console.log('0');
        dadosFormulario.discipline = Strimg(dadosFormulario.name);
        console.log('1');
        dadosFormulario.nameActivity = String(dadosFormulario.nameActivity);
        console.log('2');
        dadosFormulario.typeAc = Strimg(dadosFormulario.typeAc);
        console.log('3');
        dadosFormulario.date = new Date(dadosFormulario.date);
        console.log('4');
        dadosFormulario.weight = parseFloat(dadosFormulario.weight.toFixed(2));
        console.log('5');
        dadosFormulario.note = parseFloat(dadosFormulario.note.toFixed(2));
        console.log('6');
        dadosFormulario.comment = String(dadosFormulario.comment);
        console.log('7');
        dadosFormulario.description = String(dadosFormulario.description);
        console.log('8');

        console.log('dadosFormulario', dadosFormulario);

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
                aoSubmitar={handleAddNewActivity}
                isEdit={false}
            />
        </Fragment>
    )
}

export default AddActivity;