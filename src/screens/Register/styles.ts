import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const StatusBar = styled.StatusBar.attrs({backgroundColor:'#0075FF' })`

`;

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background};
`;

export const Header = styled.View`
    background-color: ${({theme}) => theme.colors.primary};
    width: 100%;
    height: ${RFValue(85)}px;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 18px;

`;
export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.medium};
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(18)}px;;

`;

export const Form = styled.View`

    flex: 1;
    
    width: 100%;

    padding: 24px;

    justify-content: space-between;

`;

export const Filds = styled.View`

`;

export const TransactionsType = styled.View`
flex-direction: row;
justify-content: space-between;
margin-top: 8px;
margin-bottom: 16px;
`;

