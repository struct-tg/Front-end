import React from "react";
import SwitchComponent from "../../../Components/Switch";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Title } from "../../../styles/DefaultStyles";

const PomodoroSettings = () => {
    return (
        <SafeAreaView style={{flexGrow: 1, padding: 24, justifyContent: "space-around"}}>
            <Title>Configuração do Pomodoro</Title>

            <View>
                <View>
                    <Text>Pomodoro</Text>
                </View>

                <View>
                    <Text>Pausa curta</Text>
                </View>

                <View>
                    <Text>Pausa longa</Text>
                </View>
            </View>

            <View>
                <View>
                    <Text>Iniciar automaticamente as pausas</Text>
                    <SwitchComponent />
                </View>

                <View>
                    <Text>Iniciar automaticamente o pomodoro</Text>
                    <SwitchComponent />
                </View>
            </View>

            <View>
                <Text>Quantidade de pausas longas</Text>
            </View>
        </SafeAreaView>
    );
}

export default PomodoroSettings;