import React, {useState} from 'react';
import styled from 'styled-components/native';
import {StyleSheet} from 'react-native';
import Eye from '../assets/fi-rr-eye.svg';
import EyeCrossed from '../assets/fi-rr-eye-crossed.svg';


export default ({
    placeholder,
    value,
    onChangeText,
    password,
    maxLength,
    keyboardType,
    errorMessage,
    multiline
}) => {
    const  [toggle, setToggle] = useState(password)
    
    return(      
        <>  
            <AreaInput>
                <Input 
                    placeholder = {placeholder}
                    value = {value}
                    onChangeText = {onChangeText}
                    secureTextEntry = {toggle}
                    maxLength = {maxLength}
                    keyboardType = {keyboardType}
                    placeholderTextColor = '#fff'
                    multiline = {multiline}
                    style = {multiline ? styles.textAlignDesc : styles.textAlign}
                    autoCapitalize = {"none"}
                                
                />
                {
                    password ? 
                        <ButtonToggle onPress = { () => {setToggle(!toggle)}}>
                            {
                                toggle ? 
                                    <EyeCrossed width = "20px" height = "20px" fill = "#FFF"/> 
                                    :
                                    <Eye width = "20px" height = "20px" fill = "#FFF"/>
                            }
                        </ButtonToggle>
                    :
                        <></>
                }
                
            </AreaInput>
            <TextErro>{errorMessage}</TextErro>
    </>  
            
    );
}

const styles = StyleSheet.create({
    textAlignDesc:{
        textAlignVertical: 'top',
    },
    textAlign:{
        textAlign: 'left',
    }
})
const AreaInput = styled.View`
    flex-direction: row;
    width: 100%;
    height: 50px;
    border: 2px;
    border-radius: 8px;
    border-color:  #FFFFFF;
    justify-content: flex-start;
    align-items: center;
    padding-left: 5px;
    padding-right: 10px;
`;
const ButtonToggle = styled.TouchableOpacity`
    width: 30px;
    height: 30px;
    justify-content: center;
    align-items: center;
`;
const Input = styled.TextInput`
    flex: 1;
    height: ${props => props.multiline ? '150px' : '55px'};
    padding: 5px;
    font-size: 18px;
    color: #ffffff;
`;

const TextErro = styled.Text`
    font-family: 'Poppins-Regular';
    font-size: 10px;
    color: red;
    margin-left:10px;
    margin-bottom: 8px;
`;