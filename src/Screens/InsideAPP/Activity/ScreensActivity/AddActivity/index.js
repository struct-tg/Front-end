import React, { Fragment, useState, useContext } from "react";
import { createActivity } from "../../../../../Services/Requests/Activity";
import { AutenticacaoContext } from "../../../../../Contexts/UserContext";
import { useNavigation } from "@react-navigation/native";
import FormsActivity from "../../ComponentsActivity/FormsActivity";
import ToastComponent from "../../../../../Components/Toast";

const AddActivity = ({ route }) => {
    const [toastVisible, setToastVisible] = useState(false);
    const [typeCalcActivity, setTypeCalcActivity] = useState(route.params.typeCalculator);
    const { tokenJWT } = useContext(AutenticacaoContext);
    const navigation = useNavigation();

    const aoSubmitarForm = async (dadosFormulario) => {
        const result = await createActivity(tokenJWT, dadosFormulario)
        if (result) {
            setToastVisible(true);
            navigation.navigate('Activity');
        } else {
            console.log('Algo deu errado com a insercao de uma nova atividade');
        }
    }

    return (
        <Fragment>
            <FormsActivity
                aoSubmitar={aoSubmitarForm}
                isEdit={false}
                interactions={true}
                typeCalc={typeCalcActivity}
                discipline={route.params.disciplineIDContext}
            />
            {toastVisible && (
                <ToastComponent
                    ToastType={'success'}
                    Title={'Atividade adicionada com sucesso!'}
                    Description={'Você tem uma nova atividade, Estudante.'}
                />
            )
            }
        </Fragment>
    );
}

export default AddActivity;