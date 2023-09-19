import React, { useState, useContext, Fragment } from 'react'
import { useNavigation } from '@react-navigation/native';
import { updateTask } from "../../../../Services/Requisicoes/Tasks";
import { AutenticacaoContext } from "../../../../Contexts/UserContext";
import FormsToDo from "../../ComponentsToDo/FormsToDo";
import ToastComponent from "../../../../Components/Toast";
import convertDateISO8601 from '../../../../Utils/Date';

const EditTask = ({ route }) => {
  const [toastVisible, setToastVisible] = useState(false);
  const { tokenJWT } = useContext(AutenticacaoContext);
  const { objEdit } = route.params;
  const navigation = useNavigation();

  const fnEditSubmitForm = async (datasForm) => {
    const { id, userId, ...cleanObj } = datasForm;

    const updatedSubTasks = cleanObj.subTasks.map(({ taskId, ...objLimpo }) => objLimpo);

    cleanObj.subTasks = updatedSubTasks;
    cleanObj.dateWishEnd = convertDateISO8601(cleanObj.dateWishEnd);

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