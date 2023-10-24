import React, { useState, useEffect, useContext, Fragment, useRef } from 'react';
import { Audio } from 'expo-av';
import { useIsFocused } from "@react-navigation/native";
import { AutenticacaoContext } from "../../../../../Contexts/UserContext";
import { PomodoroButtonAction, PomodoroButtonSettings } from "../../../../../Components/Button";
import { ContentContainer } from "../../../../../Styles/DefaultStyles/index.js";
import { Ionicons } from "@expo/vector-icons";
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
    const [timerFinished, setTimerFinished] = useState(false);

    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const [som, setSom] = useState(null);
    const [somNotification, setSomNotification] = useState(false);

    const [alertMessagePauseLong, setAlertMessagePauseLong] = useState(false);
    const [alertCongratulation, setAlertCongratulation] = useState(false);
    const [startAlertPauseLong, setStartAlertPauseLong] = useState(false);

    const [disabledButtonPomodoro, setDisabledButtonPomodoro] = useState(false);
    const [disabledButtonShortPause, setDisabledButtonShortPause] = useState(true);
    const [disabledButtonLongPause, setDisabledButtonLongPause] = useState(true);

    const [disabledButtonReload, setDisabledButtonReload] = useState(true);
    const [disabledButtonStart, setDisabledButtonStart] = useState(false);
    const [disabledButtonStop, setDisabledButtonStop] = useState(true);

    const isFocused = useIsFocused(false);

    const [alertMessage, setAlertMessage] = useState([
        { title: `Parabéns, ${username}!!! ✨🎉✨🎉`, message: 'Você concluiu todos os cinco ciclos de Pomodoro. Continue focado nos estudos, estamos com você.' },
        { title: `Você tem certeza dessa ação, ${username}?`, message: 'Ao concluir esta ação, você perderá o tempo de pomodoro anterior para completar um ciclo.' },
        { title: `Agora é o momento da sua pausa longa!`, message: `Pare por um momento e descanse, ${username}. Este é uns dos momentos mais importantes para a sua produtividade.` }
    ]);

    useEffect(() => {
        fnLoadAudio();
    }, [isFocused]);

    function handleCycleCompletion() {
        setCompletedCycles(completedCycles + 1);

        if (startPauseLong === completedCycles) {
            setStartAlertPauseLong(true);
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

        if (previousTimerTypeRef.current == "Pomodoro" && currentTimerType == "Intervalo Longo") {
            setAlertMessagePauseLong(true);
        }

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
                    setTimerFinished(true);

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
        setTimerFinished(false);

        setDisabledButtonReload(false);
        setDisabledButtonStop(false);

        setDisabledButtonStart(true);

        if (currentTimerType === "Pomodoro" && timerFinished === false) {
            setDisabledButtonPomodoro(true);
        } else if (currentTimerType === "Intervalo Curto" && timerFinished === false) {
            onInitialStateButtonsActions();
            setDisabledButtonShortPause(true);
        }
    };

    const desativaPomodoro = () => {
        setControlaPomodoro(false);

        if (disabledButtonStart === true) {
            setDisabledButtonStart(false);
        }

        if (previousTimerTypeRef.current === "Pomodoro" && timerFinished === true) {
            setDisabledButtonLongPause(false);
            setDisabledButtonShortPause(false);
        }

        if (timerFinished === true) {
            offActionButtons();
        }

        if (somNotification) {
            fnStopNotificationSound();
        }
    };

    const buttonPauseLong = () => {
        setTimerFinished(false);
        setSeconds(0);
        setMinutes(cicloSelecionado.timerPauseLong || 0);
        setCurrentTimerType("Intervalo Longo");

        if (cicloSelecionado.startAutomaticPause) {
            ativaPomodoro();
        } else {
            offButtonsStopAndReplay();
            setDisabledButtonStart(false);
        }
    };

    const buttonPomodoro = () => {
        setTimerFinished(false);
        setSeconds(0);
        setMinutes(cicloSelecionado.timer || 0);
        setCurrentTimerType("Pomodoro");

        if (cicloSelecionado.startAutomaticTimer) {
            ativaPomodoro();
        }
    };

    const buttonPauseShort = () => {
        setTimerFinished(false);
        setCurrentTimerType("Intervalo Curto");

        setDisabledButtonPomodoro(true);
        setDisabledButtonLongPause(true);

        setSeconds(0);
        setMinutes(cicloSelecionado.timerPauseShort || 0);

        if (cicloSelecionado.startAutomaticPause) {
            console.log('entrou aqui')
            ativaPomodoro();
        } else {
            offButtonsStopAndReplay();
            setDisabledButtonStart(false);
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

    const handleCancelAlertMessagePauseLong = () => {
        setSeconds(0);
        setMinutes(cicloSelecionado.timer);
        setAlertMessagePauseLong(false);

        setCurrentTimerType("Pomodoro");
    }

    const handleConfirmAlertMessagePauseLong = () => {
        buttonPauseLong();

        previousTimerTypeRef.current = "Intervalo Longo";
        setAlertMessagePauseLong(false);
    }

    function offButtonsStopAndReplay() {
        setDisabledButtonStop(true);
        setDisabledButtonReload(true);
    }

    function offActionButtons() {
        setDisabledButtonStop(true);
        setDisabledButtonStart(true);
        setDisabledButtonReload(true);
    }

    function onInitialStateButtonsActions() {
        setDisabledButtonStart(true);
        setDisabledButtonReload(false);
        setDisabledButtonStop(false);
    }

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
                        disabled={disabledButtonLongPause}
                    />
                    <PomodoroButtonSettings
                        text={"Pomodoro"}
                        disabled={disabledButtonPomodoro}
                        onPress={buttonPomodoro}
                    />
                    <PomodoroButtonSettings
                        text={"Intervalo curto"}
                        onPress={buttonPauseShort}
                        disabled={disabledButtonShortPause}
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
                        disabled={disabledButtonReload}
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
                        disabled={disabledButtonStart}
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
                        disabled={disabledButtonStop}
                    />
                </SectionRow>

                <AlertComponent
                    state={alertCongratulation}
                    setVisible={setAlertCongratulation}
                    isInformation={true}
                    title={alertMessage[0].title}
                    message={alertMessage[0].message}
                    onConfirm={() => setAlertCongratulation(false)}
                />

                <AlertComponent
                    state={alertMessagePauseLong}
                    setVisible={setAlertMessagePauseLong}
                    title={alertMessage[1].title}
                    message={alertMessage[1].message}
                    onCancel={handleCancelAlertMessagePauseLong}
                    onConfirm={handleConfirmAlertMessagePauseLong}
                />

                <AlertComponent
                    state={startAlertPauseLong}
                    setVisible={setStartAlertPauseLong}
                    isInformation={true}
                    title={alertMessage[2].title}
                    message={alertMessage[2].message}
                    onConfirm={() => setStartAlertPauseLong(false)}
                />

            </Fragment>
        </ContentContainer>
    );
}

export default PomodoroClock;