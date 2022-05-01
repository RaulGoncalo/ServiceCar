import React, {useState} from "react";
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
import Input from '../../components/Input';
import Api from '../../Api';
import { Alert } from 'react-native';
import IconExit from '../../assets/fi-rr-arrow-small-left.svg';
import {validateEmail} from '../../Functions';

export default({navigation}) => {
    const [email, setEmail] = useState('');
    const [errorEmail, setErrorEmail] = useState('');

   const handleSendClick = () => {
       if(email !=""){
            if(validateEmail(email)){
                //criar api de enviar email e validar
            }else{
                setErrorEmail("Digite um e-mail válido")
            }
       }else{
            setErrorEmail("Digite seu e-mail")
       }
   }

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
                <SubTitulo>Enviarémos um e-mail para você confirmar</SubTitulo>
                
                <Input 
                    placeholder = "E-mail"
                    value = {email}
                    onChangeText = { t => {
                        setEmail(t)
                        setErrorEmail(null)
                    }}
                    keyboardType = {"email-address"}
                    errorMessage = {errorEmail}
                    maxLength = {100}
                />
                
            </AreaForm>

            <AreaButton>
                    <CustomButton onPress = {handleSendClick}>
                        <CustomButtonText>
                            Enviar
                        </CustomButtonText>
                    </CustomButton> 
                </AreaButton>
            
        </Container>
    );
}