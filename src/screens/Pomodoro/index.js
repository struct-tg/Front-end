import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { PomodoroButtonAction, PomodoroButtonSettings } from "../../Components/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { SectionCycles, SectionRow, TitleCycles, SectionClock, CircleClock, NumberClock } from "./StylesPomodoro";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Audio } from 'expo-av';

const Pomodoro = () => {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const navigation = useNavigation();

    const soundObject = new Audio.Sound();
    const loadAudio = async () => {
        try {
            await soundObject.loadAsync(require('../../../assets/audios/notification.mp3'));
        } catch (error) {
            console.log('Erro ao carregar a notificação por áudio: ', error);
        }
    }

    const playNotificationSound = async () => {
        try {
            await soundObject.replayAsync();
        } catch (error) {
            console.error('Erro ao reproduzir o som:', error);
        }
    };

    const stopNotificationSound = async () => {
        try {
            await soundObject.stopAsync();
        } catch (error) {
            console.error('Erro ao parar o som:', error);
        }
    }

    useEffect(() => {
        loadAudio();
        return () => {
            soundObject.unloadAsync();
        };
    }, []);

    const goToPomodoroSettings = () => {
        navigation.navigate('PomodoroSettings');
    }

    return (
        <SafeAreaView style={{ flexGrow: 1, paddingHorizontal: 24, justifyContent: "center", backgroundColor: "#2aabbf" }}>
            <SectionRow>
                <SectionCycles>
                    <TitleCycles>Ciclos</TitleCycles>
                    <Ionicons
                        name="time-outline"
                        size={30}
                        color="black"
                    />
                    <Ionicons
                        name="time-outline"
                        size={30}
                        color="black"
                    />
                    <Ionicons
                        name="time-outline"
                        size={30}
                        color="black"
                    />
                    <Ionicons
                        name="time-outline"
                        size={30}
                        color="black"
                    />
                    <Ionicons
                        name="time-outline"
                        size={30}
                        color="black"
                    />
                </SectionCycles>

                <TouchableOpacity>
                    <Ionicons
                        name="options-outline"
                        size={35}
                        color={"white"}
                        onPress={goToPomodoroSettings}
                    />
                </TouchableOpacity>
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

            <SectionClock>
                <CircleClock>
                    <NumberClock>05:39</NumberClock>
                </CircleClock>
            </SectionClock>

            <SectionRow>
                <PomodoroButtonAction
                    icon={(
                        <Ionicons
                            name="reload-circle-outline"
                            size={35}
                            color={"white"}
                        />
                    )}
                />

                <PomodoroButtonAction
                    icon={(
                        <Ionicons
                            name="play-circle-outline"
                            size={35}
                            color={"white"}
                        />
                    )}
                    onPress={playNotificationSound}
                />
                <PomodoroButtonAction
                    icon={(
                        <Ionicons
                            name="stop-circle-outline"
                            size={35}
                            color={"white"}
                        />
                    )}
                    onPress={stopNotificationSound}
                />
            </SectionRow>
        </SafeAreaView>
    );
}

export default Pomodoro;