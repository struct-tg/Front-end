import React, { useState, useEffect, useContext, Fragment, useRef } from 'react';
import { Audio } from 'expo-av';
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { AutenticacaoContext } from "../../../../../Contexts/UserContext";
import { PomodoroButtonAction, PomodoroButtonSettings } from "../../../../../Components/Button";
import { ContentContainer } from "../../../../../Styles/DefaultStyles/index.js";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
    SectionCycles,
    SectionRow,
    TitleCycles,
    SectionClock,
    CircleClock,
    NumberClock,
} from "./StylesClockPomodoro";
import AlertComponent from "../../../../../Components/Alert";

const PomodoroClock = ({ route }) => {
    const { username } = useContext(AutenticacaoContext);
    const { cicloSelecionado } = route.params || {};

    const [currentTimerType, setCurrentTimerType] = useState("Pomodoro");
    const previousTimerTypeRef = useRef(currentTimerType);

    const [startPauseLong, setStartPauseLong] = useState(0);
    const [completedCycles, setCompletedCycles] = useState(0);
    const [controlaPomodoro, setControlaPomodoro] = useState(false);
    const [isIntervalButtonDisabled, setIsIntervalButtonDisabled] = useState(true);

    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const [som, setSom] = useState(null);
    const [somNotification, setSomNotification] = useState(false);

    const [alertCongratulation, setAlertCongratulation] = useState(false);
    const isFocused = useIsFocused(false);
    const navigation = useNavigation();

    const goToSelectPomodoro = () => {
        navigation.navigate('SelectPomodoro');
    }

    useEffect(() => {
        fnLoadAudio();
    }, [isFocused]);

    function handleCycleCompletion() {
        setCompletedCycles(completedCycles + 1);

        if (startPauseLong === completedCycles) {
            setSeconds(0);
            setMinutes(cicloSelecionado.timerPauseLong);
        }

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
                    setIsIntervalButtonDisabled(false);
                    
                    if (currentTimerType === "Pomodoro") {
                        previousTimerTypeRef.current = "Pomodoro";
                    } else if (previousTimerTypeRef.current == "Pomodoro" && currentTimerType == "Intervalo Curto") {
                        handleCycleCompletion();
                       
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
    }, [minutes, seconds, controlaPomodoro, currentTimerType]);

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
        setMinutes(cicloSelecionado.timerPauseLong || 0);
        setCurrentTimerType("Intervalo Longo");
        if (cicloSelecionado.startAutomaticPause) {
            ativaPomodoro();
        }
    };

    const buttonPomodoro = () => {
        setSeconds(0);
        setMinutes(cicloSelecionado.timer || 0);
        setCurrentTimerType("Pomodoro");
        if (cicloSelecionado.startAutomaticTimer) {
            ativaPomodoro();
        }
    };

    const buttonPauseShort = () => {
        setSeconds(0);
        setMinutes(cicloSelecionado.timerPauseShort || 0);
        setCurrentTimerType("Intervalo Curto");
        if (cicloSelecionado.startAutomaticPause) {
            ativaPomodoro();
        }
    };

    const reloadTime = () => {
        setSeconds(0);
        switch (currentTimerType) {
            case "Intervalo Longo":
                setMinutes(cicloSelecionado.timerPauseLong);
                if (cicloSelecionado.startAutomaticPause) {
                    ativaPomodoro();
                }
                break;
            case "Pomodoro":
                setMinutes(cicloSelecionado.timer);
                if (cicloSelecionado.startAutomaticTimer) {
                    ativaPomodoro();
                }
                break;
            case "Intervalo Curto":
                setMinutes(cicloSelecionado.timerPauseShort);
                if (cicloSelecionado.startAutomaticPause) {
                    ativaPomodoro();
                }
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
        <ContentContainer>
            <Fragment>
                <SectionRow>
                    <SectionCycles>
                        <TitleCycles>Ciclos:</TitleCycles>
                        {Array(5).fill(0).map((_, index) => (<Ionicons key={index} name="time-outline" size={35} color={index < completedCycles ? '#168B9D' : 'black'} />))}
                    </SectionCycles>

                </SectionRow>

                <SectionRow>
                    <PomodoroButtonSettings
                        text={"Intervalo longo"}
                        onPress={buttonPauseLong}
                        disabled={isIntervalButtonDisabled || controlaPomodoro}
                    />
                    <PomodoroButtonSettings
                        text={"Pomodoro"}
                        onPress={buttonPomodoro}
                        disabled={cicloSelecionado === undefined || controlaPomodoro}
                    />
                    <PomodoroButtonSettings
                        text={"Intervalo curto"}
                        onPress={buttonPauseShort}
                        disabled={isIntervalButtonDisabled || controlaPomodoro}
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
                        disabled={cicloSelecionado === undefined ? true : false}
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
                        disabled={cicloSelecionado === undefined ? true : false}
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
                        disabled={cicloSelecionado === undefined ? true : false}
                    />
                </SectionRow>
                <AlertComponent
                    state={alertCongratulation}
                    setVisible={setAlertCongratulation}
                    isInformation={true}
                    title={`Parabéns, ${username}!!! ✨🎉✨🎉`}
                    message={'Você concluiu todos os cinco ciclos de Pomodoro. Continue focado nos estudos, estamos com você.'}
                    onConfirm={() => setAlertCongratulation(false)}
                />
            </Fragment>
        </ContentContainer>
    );
}

export default PomodoroClock;