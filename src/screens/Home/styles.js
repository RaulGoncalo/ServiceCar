import React from 'react';
import styled from 'styled-components/native';
import {Picker} from '@react-native-picker/picker';


export const Container = styled.View`
    background-color: #1E1923;
    flex: 1;
`;

export const Scroll = styled.ScrollView`
    padding: 20px;
    margin-bottom: 20px;
`;

export const Title = styled.Text`
    font-weight: bold;
    font-size: 22px;
    color: #fff;
    margin:0px 0px 32px 0px;

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

export const Filter = styled.TouchableOpacity`
    border-bottom-width: 1.5px;
    border-radius: 8px;
    border-color: #ff0043;

    padding: 10px;
    width: 100%;
    height: 56px;
    flex: 1;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;


export const SelectionEspeciality = styled.View`
    flex-direction: row;
    align-items: center;

    border-bottom-width: 1.5px;
    border-bottom-color:  #FFF;
    border-radius: 32px;

    margin:15px 0px 64px 0px;          
`;

export const CustomPicker = styled(Picker)`
    width: 100%;
    height: 55px;
    color:  #fff;
    font-size: 10px;
`;

export const Text = styled.Text`
    font-weight: normal;
    font-size: 14px;
    color: #fff;
    flex: 1;
    
    margin: 0px 0px 0px 10px;
`;

export const IconLoading = styled.ActivityIndicator`
    margin: 30px 0px 0px 0px;
    
`;