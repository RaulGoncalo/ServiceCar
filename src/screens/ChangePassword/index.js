import React, {useState, useContext} from "react";
import {
    Container,
    CustomButton,
    CustomButtonText,
    SubTitulo,
    Header,
    TituloHeader,
    AreaHeader,
    AreaForm,
    AreaButton,
} from './styles';


import StatusBar from "../../components/StatusBar";
import { UserContext } from '../../context/UserContext';
import Input from '../../components/Input';
import Api from '../../Api';
import { Alert } from 'react-native';
import IconExit from '../../assets/fi-rr-arrow-small-left.svg';
import {validatePassword} from '../../Functions';

export default({navigation}) => {

    const [password, setPassword] = useState('');
    const [confirmatioPassword, setConfirmationPassword] = useState('');

    const [errorPassword, setErrorPassword] = useState('');
    const [errorConfirmatioPassword, setErrorConfirmationPassword] = useState(''); 


    return(
        <Container>
            <StatusBar/>
            <AreaHeader>
                <Header onPress = {() => navigation.goBack()}>
                    <IconExit width = "30" height = "30px" fill = "#fff"/>
                    <TituloHeader>Voltar</TituloHeader>
                </Header>
            </AreaHeader>
            <AreaForm>
                <SubTitulo>Preencha os campos abaixo</SubTitulo>
                
                <Input  
                    placeholder = "Senha"
                    value = {password}
                    onChangeText = { t => {
                        setPassword(t)
                        setErrorPassword(null)
                    }}
                    password = {true}
                    maxLength = {8}
                    errorMessage = {errorPassword}
                />
                <Input  
                    placeholder = "Confirmar senha"
                    value = {confirmatioPassword}
                    onChangeText = { t => {
                        setConfirmationPassword(t)
                        setErrorConfirmationPassword(null)
                    }}
                    password = {true}
                    maxLength = {8}
                    errorMessage = {errorConfirmatioPassword}
                />
            </AreaForm>

            <AreaButton>
                    <CustomButton >
                        <CustomButtonText>
                            Cadastrar
                        </CustomButtonText>
                    </CustomButton> 
                </AreaButton>
            
        </Container>
    );
}