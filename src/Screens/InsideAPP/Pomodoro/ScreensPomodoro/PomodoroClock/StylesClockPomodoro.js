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
    flex-grow: 1;
    background-color: rgba(255, 255, 255, 0.9);
    border: 2px solid #E0E0E0;
    border-radius: 5px;
    padding: 7px;
    justify-content: space-between;
    flex-direction: row;
    elevation: 20;
    shadowColor: white;
    shadowOpacity: 0.5;
    shadowRadius: 3px;
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
    height: 66%;
    aspect-ratio: 1;
    border-radius: 200px;
    border: 3px solid gray;
    shadowColor: black;
    shadowOpacity: 0.5;
    shadowRadius: 3px;
    elevation: 20;
    align-items: center;
    justify-content: center;
    background-color: white;
`;

export const NumberClock = styled.Text`
    font-size: 40px;
    font-weight: bold;
    color: gray;
`;

export const TitlePomdoro = styled.Text`
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    color: white;
`;
