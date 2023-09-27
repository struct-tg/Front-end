import React, { Fragment, useContext, useState } from 'react'
import { Input, InputPassword, InputIcon } from "../../../../../Components/Inputs";
import { Button } from "../../../../../Components/Button";
import { useNavigation } from '@react-navigation/native';
import { ContainerButton, LinkNavigators, UppercaseTitle } from "../../../../../Styles/DefaultStyles";
import { View, TouchableOpacity } from 'react-native';
import { AutenticacaoContext } from "../../../../../Contexts/UserContext";
import { deleteUser, updateUser } from "../../../../../Services/Requisicoes/Users";
import { Ionicons } from '@expo/vector-icons';
import { Controller, useForm } from "react-hook-form";
import ModalComponent from "../../../../../Components/Modal";
import AlertComponent from '../../../../../Components/Alert';
import ViewInputNome from "./StylesModalPerfilHome";
import HelperTextComponent from "../../../../../Components/HelperText";

const ModalPerfilSettings = ({ state, setModalPerfilSettings }) => {
    const [alertInformation, setAlertInformation] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [isEditUsername, setIsEditUsername] = useState(false);
    const { tokenJWT, logout, username } = useContext(AutenticacaoContext);
    const { control, handleSubmit, formState: { errors } } = useForm({ mode: "onChange" });
    const navigation = useNavigation();

    const showAlertDeleteAccount = () => {
        setAlertTitle(`Você tem certeza, ${username}?! 😕😒`);
        setAlertMessage('Ao excluir a sua conta, todos os seus dados que estão cadastrados serão excluidos. Essa é a uma ação irreversivel.');
        setAlertInformation(true);
    }

    const handleCancelButton = () => {
        setAlertInformation(false);
        setAlertTitle('');
        setAlertMessage('');
    }

    const handleConfirmButton = async () => {
        const result = await deleteUser(tokenJWT)
        if (result) {
            console.log('conta excluida com sucesso');
            navigation.navigate('Login');
        } else {
            console.log('Algo deu errado na exclusao de conta');
        }
    }

    const userOff = () => {
        navigation.navigate('Login');
        logout();
    }

    const handleEditInformation = async (objEnvio) => {
        const { confirmPassword, username, ...data } = objEnvio;
        console.log(data)
        try {
            const result = await updateUser(tokenJWT, data);
            if (result) {
                navigation.navigate('Login');
            } else {
                console.log('deu ruim mano')
            }
        } catch (error) {
            console.log(JSON.stringify(error))
        }
    }

    return (
        <Fragment>
            <ModalComponent visible={state} setModalVisible={setModalPerfilSettings} upKeyboard={true}>
                {isEditUsername
                    ?
                    (<Controller
                        control={control}
                        name='name'
                        defaultValue={username}
                        rules={{ required: ' Campo obrigatório! ' }}
                        render={({ field }) => (
                            <View>
                                <InputIcon
                                    text={'Altere o seu nome: '}
                                    value={field.value}
                                    onChangeText={field.onChange}
                                    onButtonPress={() => setIsEditUsername(false)}
                                    iconOne={() => (
                                        <Ionicons
                                            name='pencil-outline'
                                            size={35}
                                            color='white'
                                        />
                                    )}
                                />
                                {errors.name && (<HelperTextComponent helperType={'error'} helperText={errors.name.message} />)}
                            </View>
                        )}
                    />
                    )
                    :
                    (
                        <ViewInputNome>
                            <UppercaseTitle>{username}</UppercaseTitle>
                            <TouchableOpacity onPress={() => setIsEditUsername(true)}>
                                <Ionicons
                                    name="pencil-outline"
                                    size={25}
                                    color="white"
                                />
                            </TouchableOpacity>
                        </ViewInputNome>
                    )
                }
                <Controller
                    control={control}
                    name={'password'}
                    rules={{
                        required: "Campo obrigatório", min: {
                            value: 8,
                            message: "Senha deve ter mais 8"
                        }
                    }}
                    defaultValue={""}
                    render={({ field }) => (
                        <View>
                            <InputPassword
                                text={'Digite a sua senha: '}
                                secureText={true}
                                value={field.value}
                                onChangeText={field.onChange}
                            />
                            {errors.password && (<HelperTextComponent helperType={'error'} helperText={errors.password.message} />)}
                        </View>
                    )}
                />

                <Controller
                    control={control}
                    name={'confirmPassword'}
                    rules={{
                        required: "Campo obrigatório", min: {
                            value: 8,
                            message: "Senha deve ter mais 8"
                        }
                    }}
                    defaultValue={""}
                    render={({ field }) => (
                        <View>
                            <Input
                                text={'Digite a sua senha: '}
                                secureText={true}
                                value={field.value}
                                onChangeText={field.onChange}
                            />
                            {errors.confirmPassword && (<HelperTextComponent helperType={'error'} helperText={errors.confirmPassword.message} />)}
                        </View>
                    )}
                />

                <View>
                    <ContainerButton>
                        <Button
                            text={"Salvar"}
                            onPress={handleSubmit(handleEditInformation)}
                        />
                    </ContainerButton>

                    <TouchableOpacity onPress={userOff}>
                        <LinkNavigators>Sair</LinkNavigators>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={showAlertDeleteAccount}>
                        <LinkNavigators style={{ fontWeight: "bold" }}>Excluir a conta!</LinkNavigators>
                    </TouchableOpacity>
                </View>
            </ModalComponent >

            <AlertComponent
                state={alertInformation}
                setVisible={setAlertInformation}
                title={alertTitle}
                message={alertMessage}
                onConfirm={handleConfirmButton}
                onCancel={handleCancelButton}
            />
        </Fragment >
    );
}

export default ModalPerfilSettings;