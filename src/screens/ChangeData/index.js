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
import {phoneMask, validateEmail} from '../../Functions';

export default({navigation, route}) => {
    
    const [name, setName] = useState(route.params.name);
    const [email, setEmail] = useState(route.params.email);
    const [phone, setPhone] = useState(phoneMask(route.params.phone));

    const [errorName, setErrorName] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPhone, setErrorPhone] = useState('');


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
                    placeholder = "Nome completo"
                    value = {name}
                    onChangeText = { t => {
                        setName(t)
                        setErrorName(null)
                        
                    }}
                    maxLength = {100}
                    errorMessage = {errorName}
                />
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
                <Input 
                    placeholder = "Telefone"
                    value = {phone}
                    onChangeText = { t => {
                        setPhone(phoneMask(t))
                        setErrorPhone(null)
                    }}
                    maxLength = {16}
                    keyboardType = {"numeric"}
                    errorMessage = {errorPhone}
                />
            </AreaForm>

            <AreaButton>
                    <CustomButton >
                        <CustomButtonText>
                            Salvar
                        </CustomButtonText>
                    </CustomButton> 
                </AreaButton>
            
        </Container>
    );
}