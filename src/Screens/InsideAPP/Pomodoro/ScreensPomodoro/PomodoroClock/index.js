import React, { useState, useEffect, useContext, Fragment, useRef } from 'react';
import { Audio } from 'expo-av';
import { PomodoroButtonAction, PomodoroButtonSettings } from "../../Components/ButtonsPomodoro/index.js";
import { ContentContainer } from "../../../../../Styles/DefaultStyles/index.js";
import { useIsFocused } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import {
    SectionCycles, SectionRow, TitleCycles,
    SectionClock, CircleClock, NumberClock,
} from "./StylesClockPomodoro";
import AlertComponent from "../../../../../Components/Alert";
import useMocks from '../../../../../Mocks/index.js';

const PomodoroClock = ({ route }) => {
    const { cicloSelecionado } = route.params;
    const { PomodoroMocks } = useMocks();

    const [controlAllPomodoro, setControlAllPomodoro] = useState({
        onEndOffTime: false, minutes: cicloSelecionado.timer, seconds: 0,
        whenStartPauseLong: cicloSelecionado.quantityPauseLong === 1 ? 0 : cicloSelecionado.quantityPauseLong - 1,
        startAutomaticPause: cicloSelecionado.startAutomaticPause, startAutomaticTimer: cicloSelecionado.startAutomaticTimer,
        cyclesFinished: 0,
    });

    const [currentTypeTimer, setCurrentTypeTimer] = useState("Pomodoro");
    const previousTypeTimerRef = useRef(null);

    const [isTimeSelected, setIsTimeSelected] = useState(true);
    const [isTimeRunning, setIsTimeRunning] = useState(false);

    const [startAutomaticAfterFirstTime, setStartAutomaticAfterFirstTime] = useState(controlAllPomodoro.startAutomaticTimer === true ? false : false);

    const [cycleFinished, setCycleFinished] = useState(false);
    const [pauseLongRequired, setPauseLongRequired] = useState(false);

    const [disabledTimesButtons, setDisabledTimesButtons] = useState({ buttonPomodoro: true, buttonShortPause: true, buttonLongPause: true });
    const [disabledControlsButtons, setDisabledControlsButtons] = useState({ buttonPlay: false, buttonStop: true, buttonReload: true });
    const [alerts, setAlerts] = useState({ alertDecisionLongPause: false, alertFinishedAllCycles: false, alertRequiredLongPause: false });
    const [audio, setAudio] = useState(null);
    const isFocused = useIsFocused();

    function onPomodoro() {
        setIsTimeRunning(true);
        setStartAutomaticAfterFirstTime(true);
        setControlAllPomodoro((previousInfo) => ({ ...previousInfo, onEndOffTime: true }));
        setDisabledControlsButtons({ buttonPlay: true, buttonStop: false, buttonReload: false });
    };

    function offPomodoro() {
        setControlAllPomodoro((previousInfo) => ({ ...previousInfo, onEndOffTime: false }));
        setDisabledControlsButtons({ buttonPlay: false, buttonStop: true, buttonReload: true });

        if (cycleFinished) {
            setDisabledTimesButtons({ buttonPomodoro: false, buttonShortPause: true, buttonLongPause: true });
            setDisabledControlsButtons({ buttonPlay: true, buttonStop: true, buttonReload: true });

            setCycleFinished(false);
        } else if (isTimeRunning === false && isTimeSelected === false && cycleFinished === false) {
            setDisabledTimesButtons({ buttonPomodoro: true, buttonShortPause: false, buttonLongPause: false });
            setDisabledControlsButtons((previousInfo) => ({ ...previousInfo, buttonPlay: true }));
        }

        if (pauseLongRequired) {
            setControlAllPomodoro((previousInfo) => ({ ...previousInfo, minutes: cicloSelecionado.timerPauseLong }));
            setControlAllPomodoro((previousInfo) => ({ ...previousInfo, seconds: 0 }));
            setDisabledTimesButtons({ buttonPomodoro: true, buttonShortPause: true, buttonLongPause: true });

            if (controlAllPomodoro.startAutomaticPause) {
                onPomodoro();
            } else {
                setDisabledControlsButtons({ buttonPlay: false, buttonStop: true, buttonReload: true });
            }
            setPauseLongRequired(false);
        }

        if (audio) {
            stopNotification();
        }
    };

    function reloadPomodoro() {
        setControlAllPomodoro((previousInfo) => ({ ...previousInfo, seconds: 0 }))
        switch (currentTypeTimer) {
            case "Pausa Longa":
                setControlAllPomodoro((previousInfo) => ({ ...previousInfo, minutes: cicloSelecionado.timerPauseLong }))
                if (cicloSelecionado.startAutomaticPause) {
                    onPomodoro();
                }
                break;
            case "Pomodoro":
                setControlAllPomodoro((previousInfo) => ({ ...previousInfo, minutes: cicloSelecionado.timer }))
                if (cicloSelecionado.startAutomaticTimer) {
                    onPomodoro();
                }
                break;
            case "Pausa Curta":
                setControlAllPomodoro((previousInfo) => ({ ...previousInfo, minutes: cicloSelecionado.timerPauseShort }))
                if (cicloSelecionado.startAutomaticPause) {
                    onPomodoro();
                }
                break;
            default:
                break;
        }
    }

    function handleButtonShortPause() {
        setIsTimeSelected(true);
        setControlAllPomodoro((previousInfo) => ({ ...previousInfo, minutes: cicloSelecionado.timerPauseShort }));
        setCurrentTypeTimer("Pausa Curta");

        if (controlAllPomodoro.startAutomaticPause) {
            onPomodoro();
        } else {
            if (disabledControlsButtons.buttonPlay === true) {
                setDisabledControlsButtons((previousInfo) => ({ ...previousInfo, buttonPlay: false }));
            }
        }
    };

    function handleButtonPomodoro() {
        setIsTimeSelected(true);
        setControlAllPomodoro((previousInfo) => ({ ...previousInfo, minutes: cicloSelecionado.timer }));
        setCurrentTypeTimer("Pomodoro");
        if (cicloSelecionado.startAutomaticTimer) {
            onPomodoro();
        } else {
            if (disabledControlsButtons.buttonPlay === true) {
                setDisabledControlsButtons((previousInfo) => ({ ...previousInfo, buttonPlay: false }));
            }
        }
    };

    function handleButtonLongPause() {
        if (controlAllPomodoro.cyclesFinished !== controlAllPomodoro.whenStartPauseLong) {
            setAlerts((previousInfo) => ({ ...previousInfo, alertDecisionLongPause: true }));
        }
    };

    function handleOnCancelAlertDecisionLongPause() {
        setAlerts((previousInfo) => ({ ...previousInfo, alertDecisionLongPause: false }));
        previousTypeTimerRef.current = currentTypeTimer;

        switch (previousTypeTimerRef.current) {
            case "Pomodoro":
                setControlAllPomodoro((previousInfo) => ({ ...previousInfo, minutes: cicloSelecionado.timer }));
                break;
            case "Pausa Curta":
                setControlAllPomodoro((previousInfo) => ({ ...previousInfo, minutes: cicloSelecionado.timerPauseShort }));
                break;
            case "Pausa Longa":
                setControlAllPomodoro((previousInfo) => ({ ...previousInfo, minutes: cicloSelecionado.timerPauseLong }));
                break;
        }
    };

    function handleOnConfirmAlertDecisionLongPause() {
        setIsTimeSelected(true);
        setAlerts((previousInfo) => ({ ...previousInfo, alertDecisionLongPause: false }));
        setControlAllPomodoro((previousInfo) => ({ ...previousInfo, minutes: cicloSelecionado.timerPauseLong }))

        if (controlAllPomodoro.startAutomaticPause) {
            onPomodoro();
        } else {
            if (disabledControlsButtons.buttonPlay === true) {
                setDisabledControlsButtons((previousInfo) => ({ ...previousInfo, buttonPlay: false }));
                setDisabledTimesButtons({ buttonPomodoro: true, buttonShortPause: true, buttonLongPause: true });
            }
        }

        setCurrentTypeTimer("Pausa Longa");
        handleZeroCycles();
    };

    function handleCompleteCycle() {
        setControlAllPomodoro((previousInfo) => ({ ...previousInfo, cyclesFinished: previousInfo.cyclesFinished + 1 }))

        if (controlAllPomodoro.cyclesFinished === 4) {
            setAlerts((previousInfo) => ({ ...previousInfo, alertFinishedAllCycles: true }));
            handleZeroCycles();
        }
    }

    function handleZeroCycles() {
        setControlAllPomodoro((previousInfo) => ({ ...previousInfo, cyclesFinished: 0 }));
        previousTypeTimerRef.current = null;
    }

    useEffect(() => {
        if (isTimeRunning === true && isTimeSelected === true) {
            setDisabledTimesButtons({ buttonPomodoro: true, buttonShortPause: true, buttonLongPause: true });
        }
    }, [isTimeRunning, isTimeSelected]);

    useEffect(() => {
        async function isFocusedLoad() {
            loadNotification()
        }

        isFocusedLoad();
    }, [isFocused])

    async function loadNotification() {
        const audio = new Audio.Sound()
        try {
            await audio.loadAsync(require('./notification.mp3'));
            setAudio(audio);
        } catch (error) {
            console.log('Erro ao carregar a notificação por áudio: ', error);
        }
    };

    async function playNotification() {
        if (audio) {
            try {
                await audio.playAsync()
            } catch (error) {
                console.error('Erro ao reproduzir o som:', error);
            }
        }
    };

    async function stopNotification() {
        if (audio) {
            try {
                await audio.stopAsync()
            } catch (error) {
                console.error('Erro ao parar o som:', error);
            }
        }
    };

    useEffect(() => {
        let tempo;

        if (controlAllPomodoro.onEndOffTime === true && startAutomaticAfterFirstTime === true) {
            tempo = setInterval(() => {
                if (controlAllPomodoro.seconds > 0) {
                    setControlAllPomodoro((previousInfo) => ({
                        ...previousInfo,
                        seconds: previousInfo.seconds - 1
                    }));
                } else if (controlAllPomodoro.minutes > 0) {
                    setControlAllPomodoro(previousInfo => ({
                        ...previousInfo,
                        minutes: previousInfo.minutes - 1,
                        seconds: 59,
                    }));
                } else {
                    setIsTimeRunning(false);
                    setIsTimeSelected(false);
                    playNotification();

                    setControlAllPomodoro(prevData => ({ ...prevData, onEndOffTime: false }));
                    if (currentTypeTimer === "Pomodoro") {
                        previousTypeTimerRef.current = "Pomodoro";
                        if (controlAllPomodoro.whenStartPauseLong === controlAllPomodoro.cyclesFinished) {
                            setCurrentTypeTimer("Pausa Longa");
                            setPauseLongRequired(true);
                        }
                    } else if (currentTypeTimer === "Pausa Curta" && previousTypeTimerRef.current === "Pomodoro") {
                        handleCompleteCycle();
                        setCycleFinished(true);
                        previousTypeTimerRef.current = "Pausa Curta";
                    } else if (currentTypeTimer === "Pausa Longa" && previousTypeTimerRef.current === "Pomodoro") {
                        handleCompleteCycle();
                        setCycleFinished(true);
                        previousTypeTimerRef.current = "Pausa Longa";
                    } else if (currentTypeTimer === "Pausa Longa" && previousTypeTimerRef.current === null) {
                        setCycleFinished(true);
                    }

                    if (currentTypeTimer === "Pausa Longa" && previousTypeTimerRef.current === "Pomodoro" && controlAllPomodoro.whenStartPauseLong !== controlAllPomodoro.cyclesFinished) {
                        setAlerts((previousInfo) => ({ ...previousInfo, alertDecisionLongPause: true }));
                    }
                }
            }, 1000);
        } else {
            clearInterval(tempo);
        }

        return () => {
            clearInterval(tempo);
        };
    }, [controlAllPomodoro.minutes, controlAllPomodoro.seconds, controlAllPomodoro.onEndOffTime, isTimeRunning, isTimeSelected]);

    return (
        <ContentContainer>
            <Fragment>
                <SectionRow>
                    <SectionCycles>
                        <TitleCycles>Ciclos:</TitleCycles>
                        {Array(5).fill(0).map((_, index) => (<Ionicons key={index} name="time-outline" size={35} color={index < controlAllPomodoro.cyclesFinished ? '#168B9D' : '#B8B8B8'} />))}
                    </SectionCycles>
                </SectionRow>

                <SectionRow>
                    <PomodoroButtonSettings text={"Pausa longa"} disabled={disabledTimesButtons.buttonLongPause} onPress={() => handleButtonLongPause()} />
                    <PomodoroButtonSettings text={"Pomodoro"} disabled={disabledTimesButtons.buttonPomodoro} onPress={() => handleButtonPomodoro()} />
                    <PomodoroButtonSettings text={"Pausa curta"} disabled={disabledTimesButtons.buttonShortPause} onPress={() => handleButtonShortPause()} />
                </SectionRow>

                <SectionClock>
                    <CircleClock>
                        <NumberClock>{`${String(controlAllPomodoro.minutes).padStart(2, '0')}:${String(controlAllPomodoro.seconds).padStart(2, '0')}`}</NumberClock>
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
                        )} disabled={disabledControlsButtons.buttonReload} onPress={() => reloadPomodoro()}
                    />

                    <PomodoroButtonAction
                        icon={(
                            <Ionicons
                                name="play-circle-outline"
                                size={35}
                                color={"white"}
                            />
                        )} disabled={disabledControlsButtons.buttonPlay} onPress={() => onPomodoro()}
                    />

                    <PomodoroButtonAction
                        icon={(
                            <Ionicons
                                name="stop-circle-outline"
                                size={35}
                                color={"white"}
                            />
                        )} disabled={disabledControlsButtons.buttonStop} onPress={() => offPomodoro()}
                    />
                </SectionRow>
            </Fragment>

            <AlertComponent
                state={alerts.alertFinishedAllCycles} setVisible={setAlerts}
                title={PomodoroMocks.pomodoroClock.alerts.finishAllCycles.title} message={PomodoroMocks.pomodoroClock.alerts.finishAllCycles.description}
                onConfirm={() => setAlerts((previousInfo) => ({ ...previousInfo, alertFinishedAllCycles: false }))}
                isInformation={true}
            />

            <AlertComponent
                state={alerts.alertDecisionLongPause} setVisible={setAlerts}
                title={PomodoroMocks.pomodoroClock.alerts.decisionLongPausa.title} message={PomodoroMocks.pomodoroClock.alerts.finishAllCycles.description}
                onCancel={handleOnCancelAlertDecisionLongPause} onConfirm={handleOnConfirmAlertDecisionLongPause}
            />

            <AlertComponent
                state={alerts.alertRequiredLongPause} setVisible={setAlerts}
                title={PomodoroMocks.pomodoroClock.alerts.requiredLongPause.title} message={PomodoroMocks.pomodoroClock.alerts.requiredLongPause.description}
                onConfirm={() => setAlerts((previousInfo) => ({ ...previousInfo, alertRequiredLongPause: false }))}
                isInformation={true}
            />
        </ContentContainer>
    );
}

export default PomodoroClock;