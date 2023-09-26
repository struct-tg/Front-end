import React, { useState, useEffect, useContext, Fragment, useRef } from "react";
import { PomodoroButtonAction, PomodoroButtonSettings } from "../../../Components/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Audio } from 'expo-av';
import { useIsFocused } from "@react-navigation/native";
import {
    SectionCycles,
    SectionRow,
    TitleCycles,
    SectionClock,
    CircleClock,
    NumberClock,
} from "./StylesPomodoro";
import { AutenticacaoContext } from "../../../Contexts/UserContext";
import { getAllPomodoro } from "../../../Services/Requisicoes/Pomodoro";
import SpinnerComponent from "../../../Components/Spinner";
import ModalPomodoroSettings from "./Components/ModalSettingsPomodoro";
import AlertComponent from "../../../Components/Alert";
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

const Pomodoro = () => {
    const { tokenJWT, username } = useContext(AutenticacaoContext);
    const [datas, setDatas] = useState({});

    const [currentTimerType, setCurrentTimerType] = useState("Pomodoro");
    const previousTimerTypeRef = useRef(currentTimerType);

    const [completedCycles, setCompletedCycles] = useState(0);
    const [controlaPomodoro, setControlaPomodoro] = useState(false);

    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const [som, setSom] = useState(null);
    const [somNotification, setSomNotification] = useState(false);

    const [alertCongratulation, setAlertCongratulation] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const isFocused = useIsFocused(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await getAllPomodoro(tokenJWT);
                if (result) {
                    setDatas(result);
                } else {
                    console.log('Você não tem dados cadastrados!');
                }
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
        fnLoadAudio();
    }, [isFocused]);
    
    const handleCallNotifications = async () => {
        const { status } = await Notifications.getPermissionsAsync();

        if (status !== "granted") {
            Alert.alert("Você nao deixou as notificações ativas");
            return;
        }

        await Notifications.scheduleNotificationAsync({
            content: {
                title: `Parabéns, ${username}!`,
                subtitle: 'Struct.',
                body: `Você terminou mais um ciclo de Pomodoro! ${username}, você tem se dedicado muito, estamos com você na sua jornada!`,
                color: "#2aabbf"
            },
            trigger: {
                seconds: 1,
            }
        })
    };

    function handleCycleCompletion() {
        setCompletedCycles(completedCycles + 1);

        if (completedCycles === 4) {
            setAlertCongratulation(true);
            setCompletedCycles(0);
        }
    };

    function handleZeroCycle() {
        setCompletedCycles(completedCycles);
    }

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
                    fnPlayNotificationSound();
                    setControlaPomodoro(false);

                    if (currentTimerType === "Pomodoro") {
                        previousTimerTypeRef.current = "Pomodoro";
                    } else if (previousTimerTypeRef.current == "Pomodoro" && currentTimerType == "Intervalo Curto") {
                        handleCycleCompletion();
                        handleCallNotifications();
                    } else if (previousTimerTypeRef.current == "Pomodoro" && currentTimerType != "Intervalo Curto") {
                        handleZeroCycle();
                    }
                }
            }, 1000);
        } else {
            clearInterval(tempo);
        }
        return () => {
            clearInterval(tempo);
        };
    }, [controlaPomodoro, minutes, seconds, currentTimerType]);

    const ativaPomodoro = () => {
        setControlaPomodoro(true);
    };

    const desativaPomodoro = () => {
        setControlaPomodoro(false);
        if (somNotification) {
            fnStopNotificationSound();
        }
    };

    const buttonPauseLong = () => {
        setSeconds(0);
        setMinutes(datas.timerPauseLong || 0);
        setCurrentTimerType("Intervalo Longo");
        handleCallNotifications()
    };

    const buttonPomodoro = () => {
        setSeconds(0);
        setMinutes(datas.timer || 0);
        setCurrentTimerType("Pomodoro");
    };

    const buttonPauseShort = () => {
        setSeconds(0);
        setMinutes(datas.timerPauseShort || 0);
        setCurrentTimerType("Intervalo Curto");
    };

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
    };

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

    return (
        <SafeAreaView style={{ flexGrow: 1, paddingHorizontal: 24, justifyContent: "center", backgroundColor: "#2aabbf" }}>
            {isLoading ? (
                <SpinnerComponent
                    state={isLoading}
                    text={'Carregando...'}
                />
            ) : (
                <Fragment>
                    <SectionRow>
                        <SectionCycles>
                            <TitleCycles>Ciclos:</TitleCycles>
                            {Array(5).fill(0).map((_, index) => (<Ionicons key={index} name="time-outline" size={35} color={index < completedCycles ? '#168B9D' : 'black'} />))}
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
                            <NumberClock>{`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`}</NumberClock>
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
                    <AlertComponent
                        state={alertCongratulation}
                        setVisible={setAlertCongratulation}
                        isInformation={true}
                        title={`Parabéns, ${username}!!! ✨🎉✨🎉`}
                        message={'Você concluiu todos os cinco ciclos de Pomodoro. Continue focado nos estudos, estamos com você.'}
                        onConfirm={() => setAlertCongratulation(false)}
                    />
                </Fragment>
            )
            }
        </SafeAreaView >
    );

}

export default Pomodoro;
