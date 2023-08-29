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
`;

export const SectionCycles = styled.View`
    flex-grow: 0.8;
    border: 2px solid black;
    border-radius: 10px;
    padding: 5px;
    justify-content: space-between;
    flex-direction: row;
`;

export const TitleCycles = styled.Text`
    font-size: 20px;
    font-weight: bold;
`;