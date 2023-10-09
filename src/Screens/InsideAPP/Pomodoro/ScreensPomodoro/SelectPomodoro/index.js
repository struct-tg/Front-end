import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Image } from 'react-native';
import { ContentContainer, ViewContainer, Title, ContainerImageInitial } from "../../../../../Styles/DefaultStyles";
import { getAllPomodoro, getPomodoroByID } from "../../../../../Services/Requisicoes/Pomodoro";
import { AutenticacaoContext } from "../../../../../Contexts/UserContext.js";
import { useIsFocused } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import CardPomodoro from "../../Components/CardPomodoro";

const SelectPomodoro = () => {
    const [pomodoros, setPomodoros] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation();
    const { username, tokenJWT } = useContext(AutenticacaoContext);
    const isFocused = useIsFocused();

    useEffect(() => {
        async function fetchPomodoros() {
            try {
                const result = await getAllPomodoro(tokenJWT)
                if (result) {
                    setPomodoros(result);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false)
            }
        }
        fetchPomodoros();
    }, [isFocused]);

    const onSelect = async (idPomodoro) => {
        const result = await getPomodoroByID(idPomodoro, tokenJWT)
        if (result) {
            navigation.navigate('ClockPomodoro', { cicloSelecionado: result })
        } else {
            console.log('Algo deu errado na selecao de um pomodoro.');
        }
    }

    return (
        <ContentContainer>
            <ViewContainer>
                {pomodoros.length <= 0
                    ?
                    (<Fragment>
                        <Title>{`Para utilizar o sistema Pomodoro, você configurar algum ciclo.`}</Title>
                        <ContainerImageInitial>
                            <Image
                                source={require('./SelectPomodoro.png')}
                                style={{ width: "100%", height: "55%" }}
                                resizeMode="cover"
                            />
                        </ContainerImageInitial>
                    </Fragment>
                    )
                    :
                    (<Fragment>
                        <Title>{`Selecione o Pomodoro que você vai utilizar, ${username}!`}</Title>
                        <FlatList
                            data={pomodoros}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) =>
                                <CardPomodoro
                                    time={item.timer}
                                    shortStop={item.timerPauseShort}
                                    longStop={item.timerPauseLong}
                                    onSelect={() => onSelect(item.id)}
                                    isModify={false}
                                />}
                        />
                    </Fragment>
                    )
                }
            </ViewContainer>
        </ContentContainer>
    )
}

export default SelectPomodoro

