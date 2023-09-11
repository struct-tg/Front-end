import React from "react";
import Modal from "react-native-modal";
import ContainerModal from "./StylesModal.js";
import { View } from "react-native";

const ModalComponent = ({ visible, setModalVisible, upKeyboard, children }) => {
    return (
        <View>
            <Modal isVisible={visible} onBackdropPress={() => setModalVisible(false)} avoidKeyboard={upKeyboard}>
                <ContainerModal>{children}</ContainerModal>
            </Modal>
        </View>
    );
}

export default ModalComponent;