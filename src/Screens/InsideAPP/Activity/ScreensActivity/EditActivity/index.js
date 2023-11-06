import React, { Fragment, useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { AutenticacaoContext } from "../../../../../Contexts/UserContext";
import { updateActivity } from "../../../../../Services/Requests/Activity";
import FormsActivity from "../../ComponentsActivity/FormsActivity";
import ToastComponent from "../../../../../Components/Toast";

const EditActivity = ({ route }) => {
    const [toastVisible, setToastVisible] = useState(false);
    const { objEdit } = route.params;
    const { tokenJWT } = useContext(AutenticacaoContext);
    const navigation = useNavigation();

    const fnEditSubmitFormActivity = async (datasForm) => {
        const { comment, description, ...objEnvio } = datasForm;
        const result = await updateActivity(tokenJWT, objEdit.id, objEnvio);
        if (result) {
            navigation.navigate('Activity')
            setToastVisible(true);
        } else {
            console.log('Algo deu errado na edicao de uma atividade');
        }
    };

    return (
        <Fragment>
            <FormsActivity
                aoSubmitar={fnEditSubmitFormActivity}
                isEdit={true}
                initialValues={objEdit}
                typeCalc={route.params.typeCalculator}
                isFinishedDiscipline={route.params.isFinishedDiscipline}
                interactions={!route.params.isFinishedDiscipline}
            />
            {toastVisible && (
                <ToastComponent
                    ToastType={'success'}
                    Title={'Atividade editada com sucesso!'}
                    Description={'Você alterou uma atividade, Estudante.'}
                />
            )
            }
        </Fragment>
    );
}

export default EditActivity;