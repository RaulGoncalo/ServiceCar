import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.View`
    background-color: #1E1923;
    flex: 1;
`;

export const BodyListFavorites = styled.ScrollView`
    padding: 20px;
`;

export const Title = styled.Text`
    font-weight: bold;
    font-size: 24px;
    color: #fff;
    margin-left: 10px;
`;

export const Subtitle = styled.Text`
    font-weight: 400;
    font-size: 18px;
    color: #fff;
    margin-left: 10px;
`;

export const AreaHeader = styled.View`
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    background-color: #221f29;
    height: 80px;

    elevation: 10;
`;

export const AreaIcon = styled.TouchableOpacity`
    margin-top: 20px;
    margin-bottom:20px;
    margin-left: 24px;
    flex-direction: row;
`;