import React, {useState, useContext} from "react";
import {Alert} from "react-native";
import {
    Container,
    AreaWelcome,
    SubTitle,
    InputArea,
    SignMessageButton,
    SignMessageButtonTextForget,
    SignMessageButtonText2,
    SignMessageButtonForget,
    InputAreaRegister,
    CustomButton,
    CustomButtonText,
} from './styles';
import Api from "../../Api"
import StatusBar from "../../components/StatusBar";
import Input from "../../components/Input.js";
import SvgLoading from '../../assets/svgLogin.svg';
import { useNavigation } from "@react-navigation/native";
import {validatePassword, validateEmail} from "../../Functions";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default() => {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');


    const handleSing = async () => {
    
       if(email != "" && email != null && password != "" && password != null){
            if(validateEmail(email)){
                if(validatePassword(password)){
                    
                    let res = await Api.signIn(email, password)
                    console.log(res)

                    if(!res.error){
                        await AsyncStorage.setItem('token', res.token);
                        Alert.alert("Login ok: ","login feito com sucesso" , [
                            { text : "Ok"}]);
                    }else{
                        Alert.alert("Erro: ", res.error, [
                            { text : "Ok"}]);
                    }
                }else{
                    setErrorPassword("Lembre! A senha deve ter 8 digitos contendo: uma letra maiuscula, uma minuscula, um numero e um caracter especial ")
                }
            }else{
                setErrorEmail("Email incorreto")
            }
       }else{
           if(email == "" || email == null)
                setErrorEmail("Digite seu e-mail")
            if(password == "" || email == null)
                setErrorPassword("Digite sua senha")
       }
    }

    const handleSingUp = () => {
        navigation.navigate('SingUp')
    }

    const handleResetPass = () => {
        navigation.navigate('ForgetPassword')
    }

    return(
        <Container>
            <StatusBar/>
            <AreaWelcome>
                <SvgLoading width = "280" heigth = "240"/>
            </AreaWelcome>

            <InputArea>
                <SubTitle>Entre com seu login:</SubTitle>
                <Input
                    placeholder = "E-mail"
                    value = {email}
                    onChangeText = { t => {
                        setEmail(t)
                        setErrorEmail(null)
                    }}
                    keyboardType = {"email-address"}
                    errorMessage = {errorEmail}
                />
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
            

                <SignMessageButtonForget onPress = {handleResetPass}>
                    <SignMessageButtonTextForget>Esqueceu a senha?</SignMessageButtonTextForget>
                </SignMessageButtonForget>

                <CustomButton onPress = {handleSing}>
                    <CustomButtonText>
                        Entrar
                    </CustomButtonText>
                </CustomButton>
            </InputArea>


            <InputAreaRegister >
                <SignMessageButton onPress = {handleSingUp}>
                    <SignMessageButtonText2>Cadastre-se</SignMessageButtonText2>
                </SignMessageButton>
            </InputAreaRegister>


        </Container>
    );
}