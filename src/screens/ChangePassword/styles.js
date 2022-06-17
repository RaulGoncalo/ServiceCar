import React from 'react';
import styled from 'styled-components/native';

export const Container =  styled.View`
    flex : 1;
    background-color: #1E1923;
`;

export const AreaHeader = styled.View`
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: #221f29;

    elevation: 10;
`;

export const Header = styled.TouchableOpacity`
    margin-top: 20px;
    margin-bottom:20px;
    margin-left: 10px;
    flex-direction: row;
`;

export const TituloHeader = styled.Text`
    font-weight: bold;
    font-size: 20px;
    color: #fff;
    margin-left: 10px;
`;

export const AreaForm = styled.ScrollView`
    flex:1;
    padding: 20px;
`;


export const SubTitulo = styled.Text`
    font-family: 'poppins-regular';
    font-size: 20px;
    color: #fff;
    margin-bottom:32px;
`;

export const AreaButton = styled.View`
    justify-content: flex-end;
    width:100%;
    padding: 20px;
`;

export const CustomButton = styled.TouchableOpacity`
    height: 55px;
    background-color: #ff0043;
    border-radius: 8px;
    justify-content: center;
    align-items : center;
    width: 100%;
    margin-bottom: 20px;
    
`;

export const CustomButtonText = styled.Text`
    font-size: 20px;
    font-family: 'poppins-regular';
    color: #fff;
`;
