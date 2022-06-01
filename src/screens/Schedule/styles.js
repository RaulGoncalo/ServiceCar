import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.ScrollView`
    background-color: #1E1923;
    flex: 1;
`;

export const  ListCars = styled.View`
`;

export const Title = styled.Text`
    font-weight: bold;
    font-size: 22px;
    color: #fff;
    margin:0px 0px 0px 16px;
`;

export const AreaHeader = styled.View`
    flex-direction: row;
    width:100%;
    justify-content: flex-start;
    align-items: center;
    background-color: #221f29;
    height: 80px;

    elevation: 10;
`;

export const Select = styled.TouchableOpacity`
    padding: 10px;
    width: 100%;
    height: 56px;
    flex: 1;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;

export const TextSelect = styled.Text`
    font-weight: 500;
    font-size: 16px;
    color: #fff;
    flex: 1;
    
    margin: 0px 0px 0px 10px;
`;
