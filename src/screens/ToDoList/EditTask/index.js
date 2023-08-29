import React from 'react'
import FormsToDo from "../../../Components/Forms";
import { useNavigation } from '@react-navigation/native';

const EditTask = ({ route }) => {
  const navigation = useNavigation();
  const { objEdit } = route.params;

  console.log(objEdit);

  const handleFormEdit = (dadosForm) => {
    navigation.navigate('ToDo');
  } 

  return (
    <FormsToDo isEdit={true} aoSubmitar={handleFormEdit} dadosIniciais={objEdit} />
  )
}

export default EditTask;