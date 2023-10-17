import React, { useContext } from "react";
import { Image, View } from "react-native";
import { ContentContainer, ViewContainer, Title, ContainerImageInitial } from "../../../../../Styles/DefaultStyles/index.js";
import { AutenticacaoContext } from "../../../../../Contexts/UserContext";
import { ProgressChart, LineChart } from "react-native-chart-kit";
import deviceDimensions from "../../../../../Device/DeviceInformation.js";

const ChartHome = () => {
    const { username } = useContext(AutenticacaoContext);

    const desiredHeight = deviceDimensions.height * 0.3;
    const desiredWidth = deviceDimensions.width * 0.9;

    const data = {
        labels: ['ED', 'LP', 'SI', 'BD', 'LBD'],
        data: [0.7, 0.55, 0.3, 0.8, 0.1,],
    };

    const dataGraficoDois = {
        labels: ["ED", "LP", "SI", "BD", "LBD"],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43],
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, 
                strokeWidth: 6 
            }
        ],
        legend: ["A quantidade de tarefas atrasadas"] 
    };

    const chartConfig = {
        backgroundGradientFrom: '#106482',
        backgroundGradientTo: '#106482',
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    };

    return (
        <ContentContainer>
            <ViewContainer>
                <View style={{ alignItems: "center" }}>
                    <ProgressChart
                        data={data}
                        width={desiredWidth}
                        height={desiredHeight}
                        chartConfig={chartConfig}
                        strokeWidth={15}
                        style={{
                            borderRadius: 10,
                            display: 'flex',
                            justifyContent: 'space-around'
                        }}
                    />
                </View>

                <View style={{ alignItems: "center" }}>
                    <LineChart
                        data={dataGraficoDois}
                        width={desiredWidth}
                        height={desiredHeight}
                        verticalLabelRotation={30}
                        chartConfig={chartConfig}
                        style={{
                            borderRadius: 10,
                        }}
                        bezier
                    />
                </View>
            </ViewContainer>
        </ContentContainer>
    );
}

export default ChartHome;