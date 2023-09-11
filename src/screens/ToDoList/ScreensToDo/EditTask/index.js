import React, { useState, useContext, Fragment } from 'react'
import { useNavigation } from '@react-navigation/native';
import { updateTask } from "../../../../Services/Requisicoes/Tasks";
import { AutenticacaoContext } from "../../../../Contexts/UserContext";
import FormsToDo from "../../ComponentsToDo/FormsToDo";
import ToastComponent from "../../../../Components/Toast";

const EditTask = ({ route }) => {
  const [toastVisible, setToastVisible] = useState(false);
  const { tokenJWT } = useContext(AutenticacaoContext);
  const { objEdit } = route.params;
  const navigation = useNavigation();

  const fnEditSubmitForm = async (datasForm) => {
    await updateTask(datasForm.id, datasForm, tokenJWT);
    navigation.navigate('ToDo', { updateTask: datasForm });
    setToastVisible(true);
  }

  return (
    <Fragment>
      <FormsToDo
        aoSubmitar={fnEditSubmitForm}
        initialValues={objEdit}
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