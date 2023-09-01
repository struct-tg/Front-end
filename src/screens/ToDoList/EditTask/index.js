import React from 'react'
import FormsToDo from "../../../Components/Forms";
import { useNavigation } from '@react-navigation/native';

const EditTask = ({ route }) => {
  const navigation = useNavigation();
  const { objEdit } = route.params;

  const handleFormEdit = (dadosForm) => {
    const updatedData = { ...objEdit, ...dadosForm };
    navigation.navigate('ToDo', { updatedTask: updatedData });
  }

  return (
    <FormsToDo
      dadosIniciais={objEdit}
      aoSubmitar={handleFormEdit}
      isEdit={true}
    />
  )
};

export default EditTask;