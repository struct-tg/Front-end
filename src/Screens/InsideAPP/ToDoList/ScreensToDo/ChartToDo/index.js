import React, { useState, useEffect, useContext, Fragment } from 'react';
import { View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { BarChart } from "react-native-chart-kit";
import { AutenticacaoContext } from '../../../../../Contexts/UserContext';
import { ContainerImageInitial, ContentContainer, Title, ViewContainer } from "../../../../../Styles/DefaultStyles/index.js";
import useMocks from '../../../../../Mocks';
import chartResume from "../../../../../Services/Requests/Tasks/Charts/index.js";
import deviceDimensions from '../../../../../Device/DeviceInformation';
import SpinnerComponent from "../../../../../Components/Spinner/index.js";
import ResponsiveImage from "react-native-responsive-image";

const ChartToDo = () => {
    const [chartData, setChartData] = useState([]);

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() - 6);

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    const [dateStart, setDateStart] = useState(formattedDate);
    const [dateEnd, setDateEnd] = useState(formatDate(new Date()));

    const [isLoading, setIsLoading] = useState(true);
    const { tokenJWT } = useContext(AutenticacaoContext);
    const { ToDoMocks } = useMocks();
    const isFocused = useIsFocused();

    const desiredHeight = deviceDimensions.height * 0.35;
    const desiredWidth = deviceDimensions.width * 0.95;

    useEffect(() => {
        async function fetchDatas() {
            try {
                const result = await chartResume(tokenJWT, dateStart, dateEnd)
                console.log(result);
                if (result) {
                    const percentData = result.map(item => item.percent);
                    const percentDataInPercentage = percentData.map(element => element * 100);
                    setChartData(percentDataInPercentage);
                } else {
                    console.log('Não há dados');
                }
            } catch (error) {
                console.log('algo deu erro');
            } finally {
                setIsLoading(false);
            }
        }
        fetchDatas();
    }, [isFocused]);

    const data = {
        labels: ['Finalizadas', 'Pendentes', 'Atrasadas'],
        datasets: [
            {
                data: [...chartData],
            }
        ]
    };

    return (
        <ContentContainer>
            {isLoading
                ?
                (<SpinnerComponent state={isLoading} text={'Carregando...'} />)
                :
                (<ViewContainer>
                    {chartData[0] == 0 && chartData[1] == 0 && chartData[2] == 0
                        ?
                        (<Fragment>
                            <Title>{ToDoMocks.ToDoChartScreen.title}</Title>
                            <ContainerImageInitial>
                                <ResponsiveImage
                                    source={ToDoMocks.ToDoChartScreen.image.content}
                                    initWidth={ToDoMocks.ToDoChartScreen.image.width}
                                    initHeight={ToDoMocks.ToDoChartScreen.image.height}
                                    resizeMode={ToDoMocks.ToDoChartScreen.image.rezide}
                                />
                            </ContainerImageInitial>
                        </Fragment>
                        )
                        :
                        (<ViewContainer>
                            <Title>{ToDoMocks.ToDoChartScreen.titleDatas}</Title>
                            <View style={{ flexGrow: 1, alignItems: "center", justifyContent: "space-around" }}>
                                <BarChart
                                    data={data}
                                    width={desiredWidth}
                                    height={desiredHeight}
                                    yAxisSuffix='%'
                                    chartConfig={{
                                        barPercentage: 1,
                                        backgroundGradientFrom: '#106482',
                                        backgroundGradientTo: '#106482',
                                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    }}
                                    strokeWidth={15}
                                    style={{
                                        borderRadius: 10,
                                    }}
                                />
                            </View>
                        </ViewContainer>

                        )
                    }
                </ViewContainer>
                )
            }

        </ContentContainer>
    )
}

export default ChartToDo;