import React, { useContext } from 'react'
import { Input, InputPassword } from "../../../../Components/Inputs";
import { Button } from "../../../../Components/Button";
import { useNavigation } from '@react-navigation/native';
import { ContainerButton, LinkNavigators, UppercaseTitle } from "../../../../Styles/DefaultStyles";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View } from 'react-native';
import { AutenticacaoContext } from "../../../../Contexts/UserContext";
import ModalComponent from "../../../../Components/Modal";

const ModalPerfilSettings = ({ state, setModalPerfilSettings }) => {
    const { logout, username } = useContext(AutenticacaoContext);
    const navigation = useNavigation();

    const userOff = () => {
        logout();
        navigation.navigate('Login');
    }

    return (
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
                        onPress={userOff}
                    />
                </ContainerButton>

                <TouchableOpacity>
                    <LinkNavigators>Sair</LinkNavigators>
                </TouchableOpacity>
                <TouchableOpacity>
                    <LinkNavigators>Excluir a conta!</LinkNavigators>
                </TouchableOpacity>
            </View>
        </ModalComponent>
    )
}

export default ModalPerfilSettings;