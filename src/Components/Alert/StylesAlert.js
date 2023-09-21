import styled from 'styled-components/native';

export const Overlay = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const AlertContainer = styled.View`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
`;

export const AlertTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const AlertMessage = styled.Text`
  font-size: 16px;
  text-align: justify;
  margin: 5px 0;
  color: gray;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Button = styled.TouchableOpacity`
  padding: 5px 25px;
  border-radius: 6px;
  background-color: ${(props) => (props.isConfirm ? '#10e689' : '#FF3B30')};
`;

export const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  text-align: center;
`;