import React from "react";
import { Overlay, AlertContainer, AlertTitle, ButtonContainer, Button, ButtonText, AlertMessage } from "./StylesAlert";
import { Modal } from "react-native";

const AlertComponent = ({ state = false, setVisible, title, isInformation, message, onConfirm, onCancel }) => {
    return (
        <Modal transparent animationType="fade" visible={state}>
            <Overlay>
                <AlertContainer>
                    <AlertTitle>{title}</AlertTitle>
                    <AlertMessage>{message}</AlertMessage>
                    {isInformation ? (
                        <Button isConfirm  onPress={() => {onConfirm()}}>
                            <ButtonText>Continuar</ButtonText>
                        </Button>
                    ) : (
                        <ButtonContainer>
                            <Button onPress={() => {onCancel()}}>
                                <ButtonText>Cancelar</ButtonText>
                            </Button>
                            <Button isConfirm  onPress={() => {onConfirm()}} >
                                <ButtonText>Confirmar</ButtonText>
                            </Button>
                        </ButtonContainer>
                    )
                    }
                </AlertContainer>
            </Overlay>
        </Modal>
    );
};

export default AlertComponent;