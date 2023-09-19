import Dialog from "react-native-dialog";
import { View } from "react-native";

const DialogComponent = ({ state, setVisible, title, description, textButtonConfirm, textButtonCancel }) => {
    return (
        <View>
            <Dialog.Container visible={state}>
                <Dialog.Title style={{ color: 'black' }}>{title}</Dialog.Title>
                <Dialog.Description>{description}</Dialog.Description>

                <Dialog.Button label={`${textButtonConfirm}`}/>

                <Dialog.Button label={`${textButtonCancel}`} onPress={() => setVisible(false)} />
            </Dialog.Container>
        </View>
    );
}

export default DialogComponent;