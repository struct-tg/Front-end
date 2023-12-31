import React, { Fragment, useContext, useState } from 'react';
import { AutenticacaoContext } from "../../../../../Contexts/UserContext";
import { updateDiscipline } from "../../../../../Services/Requests/Disciplines/index";
import { useNavigation } from "@react-navigation/native";
import FormsDisciplines from "../../ComponentsDisciplines/FormsDisciplines";
import ToastComponent from "../../../../../Components/Toast";

const EditDiscipline = ({ route }) => {
    const { tokenJWT } = useContext(AutenticacaoContext);

    const navigation = useNavigation();
    const [toastVisible, setToastVisible] = useState(false);
    const { objGrade } = route.params;

    const isDateEndNotNull = objGrade.dateEnd !== null;

    const fnEditSubmitForm = async (dadosFormulario) => {
        dadosFormulario.noteMin = parseFloat(dadosFormulario.noteMin);
        dadosFormulario.noteMin = parseFloat(dadosFormulario.noteMin.toFixed(2));
        if (dadosFormulario.dateEnd) {
            dadosFormulario.dateEnd = null;
        } else {
            dadosFormulario.dateEnd = new Date();
        }

        try {
            const result = await updateDiscipline(tokenJWT, objGrade.id, dadosFormulario);
            if (result) {
                setToastVisible(true);
                navigation.navigate('Disciplinas');
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <Fragment>
            <FormsDisciplines
                aoSubmitar={fnEditSubmitForm}
                initialValues={objGrade}
                isEdit={true}
                interactions={isDateEndNotNull}
            />
            {toastVisible
                &&
                <ToastComponent
                    Title={'Disciplina editada com sucesso!'}
                    Description={'Você alterou uma disciplina, Estudante.'}
                    ToastType={'success'}
                />
            }
        </Fragment>
    );
};

export default EditDiscipline;