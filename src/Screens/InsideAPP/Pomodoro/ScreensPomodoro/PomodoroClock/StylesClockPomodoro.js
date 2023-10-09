import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: #2aabbf;
    padding: 24px;
`;

export const ViewContainer = styled.View`
    justify-content: space-between;
`;

export const SectionRow = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex: 0.1;
`;

export const SectionCycles = styled.View`
    flex-grow: 0.8;
    background-color: white;
    border: 2px solid black;
    border-radius: 10px;
    padding: 5px;
    justify-content: space-between;
    flex-direction: row;
`;

export const TitleCycles = styled.Text`
    font-size: 20px;
    font-weight: bold;
    align-self: center;
`;

export const SectionClock = styled.View`
    flex: .65;
    justify-content: center;
    align-items: center;
`;

export const CircleClock = styled.View`
    height: 66%; /* Altura será calculada automaticamente */
    aspect-ratio: 1;
    border-radius: 200px;
    border: 3px #000 solid;
    align-items: center;
    justify-content: center;
    background-color: white;
`;

export const NumberClock = styled.Text`
    font-size: 30px;
    font-weight: bold;
`;

export const TitlePomdoro = styled.Text`
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    color: white;
`;
