import React, { useContext } from "react";
import { Image, View, Text } from "react-native";
import { ContentContainer, ViewContainer, Title, ContainerImageInitial } from "../../../../../Styles/DefaultStyles/index.js";
import { AutenticacaoContext } from "../../../../../Contexts/UserContext";
import { LineChart } from "react-native-chart-kit";
import deviceDimensions from "../../../../../Device/DeviceInformation.js";

const ChartHome = () => {
    const { username } = useContext(AutenticacaoContext);

    const desiredHeight = deviceDimensions.height * 0.3;
    const desiredWidth = deviceDimensions.width * 0.95;

    const dataGraficoDois = {
        labels: ["TESTE", "TESTE", "TESTE", "TESTE", "TESTE"],
        datasets: [
            {
                data: [0, 10, 20, 30, 40, 50],
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                strokeWidth: 6
            }
        ],
        legend: ["TESTE"]
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