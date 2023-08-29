import React from "react";
import { Text, View } from "react-native";
import { PomodoroButtonAction, PomodoroButtonSettings } from "../../Components/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Container, ViewContainer, SectionCycles, SectionRow, TitleCycles } from "./StylesPomodoro";

const Pomodoro = () => {
    return (
        <SafeAreaView style={{flexGrow: 1, padding: 24}}>
            <SectionRow>
                <SectionCycles>
                    <TitleCycles>Ciclos</TitleCycles>
                    <Ionicons 
                        name="time-outline"
                        size={30}
                    />
                    <Ionicons 
                        name="time-outline"
                        size={30}
                    />
                    <Ionicons 
                        name="time-outline"
                        size={30}
                    />
                    <Ionicons 
                        name="time-outline"
                        size={30}
                    />
                    <Ionicons 
                        name="time-outline"
                        size={30}
                    />
                </SectionCycles>
                <Ionicons
                    name="options-outline"
                    size={35}
                    color={"black"}
                />
            </SectionRow>

            <SectionRow>
                <PomodoroButtonSettings
                    text={"Intervalo longo"}
                />
                <PomodoroButtonSettings
                    text={"Pomodoro"}
                />
                <PomodoroButtonSettings
                    text={"Intervalo curto"}
                />
            </SectionRow>

            <View>
                <Text>05:29</Text>
            </View>

            <SectionRow>
                <PomodoroButtonAction
                    icon={(
                        <Ionicons
                            name="reload-circle-outline"
                            size={35}
                            color={"black"}
                        />
                    )}
                />

                <PomodoroButtonAction
                    icon={(
                        <Ionicons
                            name="play-circle-outline"
                            size={35}
                            color={"black"}
                        />
                    )}
                />
                <PomodoroButtonAction
                    icon={(
                        <Ionicons
                            name="stop-circle-outline"
                            size={35}
                            color={"black"}
                        />
                    )}
                />
            </SectionRow>
        </SafeAreaView>
    );
}

export default Pomodoro;