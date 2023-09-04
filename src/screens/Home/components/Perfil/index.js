import React from 'react'
import ModalComponent from "../../../../Components/Modal";
import { Input } from "../../../../Components/Inputs";
import { Button } from "../../../../Components/Button";
import { ContainerButton, LinkNavigators, UppercaseTitle } from "../../../../styles/DefaultStyles";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View } from 'react-native';

const ModalPerfilSettings = ({ state, setModalPerfilSettings }) => {
    return (
        <ModalComponent visible={state} setModalVisible={setModalPerfilSettings} upKeyboard={true}>
            <UppercaseTitle>Yuri Alberto.</UppercaseTitle>
            <Input
                text={"E-mail: "}
                secureText={false}
            />
            <Input
                text={"Senha: "}

            />
            <Input
                text={"Confirme sua senha: "}
                secureText={true}
            />

            <View>
                <ContainerButton>
                    <Button
                        text={"Salvar"}
                        onPress={() => setModalPerfilSettings(false)}
                    />
                </ContainerButton>

                <TouchableOpacity>
                    <LinkNavigators>Sair</LinkNavigators>
                </TouchableOpacity>
            </View>
        </ModalComponent>
    )
}

export default ModalPerfilSettings;

