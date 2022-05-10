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

import {useNavigation} from '@react-navigation/native';
import StatusBar from "../../components/StatusBar";
import { UserContext } from '../../context/UserContext';
import Input from '../../components/Input';
import Api from '../../Api';
import { Alert } from 'react-native';
import IconExit from '../../assets/fi-rr-arrow-small-left.svg';
import {phoneMask, validateEmail, validatePassWord} from '../../Functions';

export default({navigation}) => {
    const { dispatch: userDispatch } = useContext(UserContext);
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassWord] = useState('');
    const [confirmatioPassword, setConfirmationPassWord] = useState('');

    const [errorName, setErrorName] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPhone, setErrorPhone] = useState('');
    const [errorPassword, setErrorPassWord] = useState('');
    const [errorConfirmatioPassword, setErrorConfirmationPassWord] = useState(''); 

    const handleSignClick = async () => {
        setErrorName(null)
        setErrorEmail(null)
        setErrorPassWord(null)
        setErrorConfirmationPassWord(null)
        if (name != "" && email != "" && password != "" && confirmatioPassword != ""){
            if(validateEmail(email)){
                if (password.length == 8){
                    if(validatePassWord(password)){
                        if(password == confirmatioPassword){
                            
                            let res = await Api.signUp(name, email, password, phone.replace(/[^0-9]/g,''))
                            
                            if(!res.error){
                                userDispatch({
                                    type: 'setUser',
                                    payload:{
                                        name: name,
                                        email: email,
                                        phone: phone
                                    }
                                });
                                
                                Alert.alert("Sucesso", "Faça Login", [
                                    { text : "Ok", onPress : () => navigation.navigate('SignIn')}]);
                            }else{
                                Alert.alert("Erro", res.error, [
                                    { text : "Ok", onPress : () => navigation.navigate('SignIn')}]);
                            }
                        }else{
                            setErrorConfirmationPassWord("Defina a mesma senha")
                        }
                    }else{
                        setErrorPassWord("A senha deve conter pelo menos 1 letra minúscula, 1 letra maiúscula, 1 número e 1 caractere especial")
                    }
                }else{
                    setErrorPassWord("A senha deve conter 8 digitos")
                }
            }else{
                setErrorEmail("Preencha seu email corretamente")
            }
        }else{
            if(name == '')
                setErrorName("Preencha seu nome")
            if(email == '')
                setErrorEmail("Preencha seu email")
            if(password == '')
                setErrorPassWord("Preencha sua senha")
            if(confirmatioPassword == '')
                setErrorConfirmationPassWord("Confirme sua senha")
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
                <Input  
                    placeholder = "Senha"
                    value = {password}
                    onChangeText = { t => {
                        setPassWord(t)
                        setErrorPassWord(null)
                    }}
                    password = {true}
                    maxLength = {8}
                    errorMessage = {errorPassword}
                />
                <Input  
                    placeholder = "Confirmar senha"
                    value = {confirmatioPassword}
                    onChangeText = { t => {
                        setConfirmationPassWord(t)
                        setErrorConfirmationPassWord(null)
                    }}
                    password = {true}
                    maxLength = {8}
                    errorMessage = {errorConfirmatioPassword}
                />
                
            </AreaForm>

            <AreaButton>
                    <CustomButton onPress = {handleSignClick}>
                        <CustomButtonText>
                            Cadastrar
                        </CustomButtonText>
                    </CustomButton> 
                </AreaButton>
            
        </Container>
    );
}