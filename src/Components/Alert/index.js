import React from "react";
import { Overlay, AlertContainer, AlertTitle, ButtonContainer, Button, ButtonText, AlertMessage } from "./StylesAlert";
import { Modal } from "react-native";

const AlertComponent = ({ state, setVisible, title, message, onConfirm, onCancel }) => {
    return (
        <Modal transparent animationType="fade" visible={state} onRequestClose={() => { }}>
            <Overlay>
                <AlertContainer>

                    <AlertTitle>{title}</AlertTitle>
                    <AlertMessage>{message}</AlertMessage>

                    <ButtonContainer>
                        <Button onPress={() => { setVisible(false); onCancel(); }}>
                            <ButtonText>Cancelar</ButtonText>
                        </Button>
                        <Button isConfirm onPress={() => { setVisible(false); onConfirm(); }}>
                            <ButtonText>Confirmar</ButtonText>
                        </Button>
                    </ButtonContainer>
                </AlertContainer>
            </Overlay>
        </Modal>
    );
};

export default AlertComponent;