import React, { useState, useEffect } from "react";
import { PomodoroButtonAction, PomodoroButtonSettings } from "../../Components/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Audio } from 'expo-av';
import {
    SectionCycles,
    SectionRow,
    TitleCycles,
    SectionClock,
    CircleClock,
    NumberClock,
} from "./StylesPomodoro";
import ModalPomodoroSettings from "./Components/ModalSettingsPomodoro";

const Pomodoro = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(10);
    const [controlaPomodoro, setControlaPomodoro] = useState(false);

    const [som, setSom] = useState(null);
    const [somNotification, setSomNotification] = useState(false);

    async function fnLoadAudio() {
        const audio = new Audio.Sound()
        try {
            await audio.loadAsync(require('./notification.mp3'))
            setSom(audio);
        } catch (error) {
            console.log('Erro ao carregar a notificação por áudio: ', error);
        }
    };

    async function fnPlayNotificationSound() {
        if (som) {
            try {
                setSomNotification(true)
                await som.playAsync()
            } catch (error) {
                console.error('Erro ao reproduzir o som:', error);
            }
        }
    };

    async function fnStopNotificationSound() {
        if (som) {
            try {
                await som.stopAsync()
                setSomNotification(false)
            } catch (error) {
                console.error('Erro ao parar o som:', error);
            }
        }
    };

    const ativaPomodoro = () => {
        setControlaPomodoro(true);
    }

    const desativaPomodoro = () => {
        setControlaPomodoro(false);
        if (somNotification) {
            fnStopNotificationSound();
        }
    }

    const reloadTime = () => {
        setMinutes(0);
        setSeconds(10);
    }

    useEffect(() => {
        fnLoadAudio()
    }, []);

    useEffect(() => {
        let tempo;

        if (controlaPomodoro) {
            tempo = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                } else if (minutes > 0) {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                } else {
                    fnPlayNotificationSound()
                }
            }, 1000);
        } else {
            clearInterval(tempo);
        }
        return () => {
            clearInterval(tempo);
        };
    }, [controlaPomodoro, minutes, seconds]);


    return (
        <SafeAreaView style={{ flexGrow: 1, paddingHorizontal: 24, justifyContent: "center", backgroundColor: "#2aabbf" }}>
            <SectionRow>
                <SectionCycles>
                    <TitleCycles>Ciclos:</TitleCycles>
                    <Ionicons
                        name="time-outline"
                        size={30}
                        color="#11BBC6"
                    />
                </SectionCycles>

                <TouchableOpacity>
                    <Ionicons
                        name="options-outline"
                        size={35}
                        color={"white"}
                        onPress={() => setModalVisible(true)}
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
                    <NumberClock>{`${minutes}:${seconds}`}</NumberClock>
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
                    onPress={reloadTime}
                />

                <PomodoroButtonAction
                    icon={(
                        <Ionicons
                            name="play-circle-outline"
                            size={35}
                            color={"white"}
                        />
                    )}
                    onPress={ativaPomodoro}
                />
                <PomodoroButtonAction
                    icon={(
                        <Ionicons
                            name="stop-circle-outline"
                            size={35}
                            color={"white"}
                        />
                    )}
                    onPress={desativaPomodoro}
                />
            </SectionRow>
            <ModalPomodoroSettings
                state={modalVisible}
                setModalVisible={setModalVisible}
            />
        </SafeAreaView>
    );
}

export default Pomodoro;