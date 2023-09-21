import React, { useState, useEffect, useContext } from "react";
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
import { AutenticacaoContext } from "../../Contexts/UserContext";
import { getAllPomodoro } from "../../Services/Requisicoes/Pomodoro";
import ModalPomodoroSettings from "./Components/ModalSettingsPomodoro";

const Pomodoro = () => {
    const [datas, setDatas] = useState({});
    const [modalVisible, setModalVisible] = useState(false);

    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [controlaPomodoro, setControlaPomodoro] = useState(false);

    const [som, setSom] = useState(null);
    const [somNotification, setSomNotification] = useState(false);

    const [currentTimerType, setCurrentTimerType] = useState("Pomodoro");

    const { tokenJWT } = useContext(AutenticacaoContext);

    useEffect(() => {
        async function fetchData() {
            const result = await getAllPomodoro(tokenJWT);
            if (result) {
                console.log(result)
                setDatas(result)
            } else {
                console.log('algo deu errado na captura dos dados')
            }
        }
        fetchData();
    }, []);

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
        setSeconds(0);
        switch (currentTimerType) {
            case "Intervalo Longo":
                setMinutes(datas.timerPauseLong);
                break;
            case "Pomodoro":
                setMinutes(datas.timer);
                break;
            case "Intervalo Curto":
                setMinutes(datas.timerPauseShort);
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        fnLoadAudio()
    }, []);

    useEffect(() => {
        let tempo;

        if (datas.startAutomaticTimer || datas.startAutomaticPause) {
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


    const buttonPauseLong = () => {
        setSeconds(0);
        setMinutes(datas.timerPauseLong);
        setCurrentTimerType("Intervalo Longo");
    }

    const buttonPomodoro = () => {
        setSeconds(0);
        setMinutes(datas.timer);
        setCurrentTimerType("Pomodoro");
    }

    const buttonPauseShort = () => {
        setSeconds(0);
        setMinutes(datas.timerPauseShort);
        setCurrentTimerType("Intervalo Curto");
    }

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
                    <Ionicons
                        name="time-outline"
                        size={30}
                        color="#11BBC6"
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
                        onPress={() => setModalVisible(true)}
                    />
                </TouchableOpacity>
            </SectionRow>

            <SectionRow>
                <PomodoroButtonSettings
                    text={"Intervalo longo"}
                    onPress={buttonPauseLong}
                />
                <PomodoroButtonSettings
                    text={"Pomodoro"}
                    onPress={buttonPomodoro}
                />
                <PomodoroButtonSettings
                    text={"Intervalo curto"}
                    onPress={buttonPauseShort}
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
