import React, { useState, useContext, Fragment } from 'react'
import { useNavigation } from '@react-navigation/native';
import { updateTask } from "../../../../../Services/Requisicoes/Tasks";
import { AutenticacaoContext } from "../../../../../Contexts/UserContext";
import FormsToDo from "../../ComponentsToDo/FormsToDo";
import ToastComponent from "../../../../../Components/Toast";
import { convertDateISO8601, convertISODateToSlashDateString, convertISODateToTraceDateString } from '../../../../../Utils/Date';

const EditTask = ({ route }) => {
  const [toastVisible, setToastVisible] = useState(false);
  const { tokenJWT } = useContext(AutenticacaoContext);
  const { obj } = route.params;
  const navigation = useNavigation();

  const objEdit = { ...obj };
  objEdit.dateWishEnd = convertDateISO8601(objEdit.dateWishEnd);

  const fnEditSubmitForm = async (datasForm) => {
    const { id, userId, ...cleanObj } = datasForm;

    const updatedSubTasks = cleanObj.subTasks.map(({ taskId, ...objLimpo }) => objLimpo);

    cleanObj.subTasks = updatedSubTasks;
    cleanObj.dateWishEnd = cleanObj.dateWishEnd;

    console.log(`A data enviada para o back end: ${cleanObj.dateWishEnd}`);

    await updateTask(id, cleanObj, tokenJWT);
    navigation.navigate('ToDo', { updateTask: cleanObj });
    setToastVisible(true);
  };

  return (
    <Fragment>
      <FormsToDo
        aoSubmitar={fnEditSubmitForm}
        initialValues={objEdit}
        isEdit={true}
      />
      {toastVisible && (
        <ToastComponent
          ToastType={'success'}
          Title={'Tarefa editada com sucesso!'}
          Description={'Você alterou uma tarefa, Estudante.'}
        />
      )
      }
    </Fragment>
  )
};

export default EditTask;