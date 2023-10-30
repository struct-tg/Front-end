import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';
import deviceDimensions from "../../Device/DeviceInformation";

const imageWidth = deviceDimensions.width * 0.8;
const imageHeight =  deviceDimensions.width  * 0.3; 

export const ContentContainer = styled(SafeAreaView)`   
    flex: 1;
    justify-content: space-between;
    background-color: #27A9BD;
    padding: 0 24px;
`;

export const ViewContainer = styled.View`   
    flex: 0.95;
    justify-content: space-around;
`;

export const UppercaseTitle = styled.Text`   
    text-align: center;
    font-size: ${RFValue(28, deviceDimensions.height)}px;
    color: white;
    font-weight: bold;
    text-transform: uppercase;
`;

export const Title = styled.Text`
    text-align: center;
    font-size: ${RFValue(24, deviceDimensions.height)}px;
    font-weight: bold;
    color: #ffffff;
`;

export const Text = styled.Text`
    color: white;
    font-size: ${RFValue(18, deviceDimensions.height)}px;
`;

export const TextModal = styled.Text`
    font-size: ${RFValue(18, deviceDimensions.height)}px;
    text-align: justify;
    color: #FFFFFF;
`;

export const ViewSettings = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const ViewBlock = styled.View`
    flex-direction: row;
    justify-content: flex-end;
`;

export const LinkNavigators = styled.Text`
    color: white;
    text-align: center;
`;

export const ContainerScroll = styled.View`
    min-height: 25%;
    max-height: 25%;
    border-radius: 10px;
    padding: 5px 10px;
    border: 3px solid #FFFFFF; 
`;

export const TitleContainerScroll = styled.Text`
    font-size: ${RFValue(18, deviceDimensions.height)}px;
    font-weight: bold;
    color: #FFFFFF;
    align-self: center;
`;

export const ContainerImageInitial = styled.View`
    flex: 0.9;
    justify-content: center;
    align-items: center;
`;

export const InlineTextSwitch = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const ContainerImage = styled.Image`   
    width: ${imageWidth}px;
    height: ${imageHeight}px;
    alignSelf: center;
    justifyContent: center;
    alignItems: center;
`;

export const ContainerCenter = styled.View`   
    justify-content: space-evenly;
    align-items: center;
`;

export const ContainerButton = styled.View`   
    align-items: center;
`;