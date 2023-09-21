import React, { Fragment, useContext, useState } from 'react'
import { Input, InputPassword } from "../../../../Components/Inputs";
import { Button } from "../../../../Components/Button";
import { useNavigation } from '@react-navigation/native';
import { ContainerButton, LinkNavigators, UppercaseTitle } from "../../../../Styles/DefaultStyles";
import { TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { AutenticacaoContext } from "../../../../Contexts/UserContext";
import { deleteUser } from "../../../../Services/Requisicoes/Users/index";
import ModalComponent from "../../../../Components/Modal";
import AlertComponent from '../../../../Components/Alert';

const ModalPerfilSettings = ({ state, setModalPerfilSettings }) => {
    const [alertInformation, setAlertInformation] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    const { tokenJWT, logout, username } = useContext(AutenticacaoContext);
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

    return (
        <Fragment>
            <ModalComponent visible={state} setModalVisible={setModalPerfilSettings} upKeyboard={true}>
                <UppercaseTitle>{`${username}`}</UppercaseTitle>

                <InputPassword
                    text={'Digite a sua senha: '}
                    secureText={true}
                />

                <Input
                    text={"Confirme sua senha: "}
                    secureText={true}
                />

                <View>
                    <ContainerButton>
                        <Button
                            text={"Salvar"}
                        />
                    </ContainerButton>

                    <TouchableOpacity onPress={userOff}>
                        <LinkNavigators>Sair</LinkNavigators>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={showAlertDeleteAccount}>
                        <LinkNavigators style={{fontWeight: "bold"}}>Excluir a conta!</LinkNavigators>
                    </TouchableOpacity>
                </View>
            </ModalComponent>

            <AlertComponent
                state={alertInformation}
                setVisible={setAlertInformation}
                title={alertTitle}
                message={alertMessage}
                onConfirm={handleConfirmButton}
                onCancel={handleCancelButton}
            />
        </Fragment>
    );
}

export default ModalPerfilSettings;