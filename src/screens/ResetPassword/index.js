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
    IconLoading,
} from './styles';

import StatusBar from "../../components/StatusBar";
import Input from '../../components/Input';
import Api from '../../Api';
import { Alert } from 'react-native';
import IconExit from '../../assets/fi-rr-arrow-small-left.svg';
import {validateEmail, validatePassword} from '../../Functions';

export default({navigation}) => {
    const [email, setEmail] = useState('');
    const [errorEmail, setErrorEmail] = useState('');

    const [code, setCode] = useState('');
    const [codeError, setCodeError] = useState('');

    const [newPassword, setNewPassword] = useState('');
    const [confirmatioNewPassword, setConfirmationNewPassword] = useState('');

    const [errorNewPassword, setErrorNewPassword] = useState('');
    const [errorConfirmatioNewPassword, setErrorConfirmationNewPassword] = useState(''); 

    const [isValid, setIsValid] = useState(false);
    const [isValidResetPassword, setIsValidResetPassword] = useState(false);
    const [loading, setLoading] = useState(false)
 
    const heandleRequestCode = async () =>{   
        alert("Código sendo enviado")
        setLoading(true)

        if (email !== "") {

            if(validateEmail(email)){
               const res = await Api.requestCode(email)

               if(res.status == 200){
                    setIsValid(true)
                    setLoading(false)
               }else{
                    alert("Problemas com seu e-mail verifique")
                    setLoading(false)
               }
            }else(
                setEmailError("E-mail inválido")
            )
        }else{
            setEmailError("Preenche o campo a cima")
        }

    }

    const hendleSendCode = async () =>{
        
        setLoading(true)

        if (code !== "") {
            const res = await Api.validateCode(code)
            
            if(res.status == 200){
                setIsValidResetPassword(true)
                setLoading(false)
            }else{
                alert("Problemas com seus dados verifique")
                setLoading(false)
            }
        }else{
            setCodeError("Preenche o campo a cima")
        }
    }

    const heandleSendNewPassword = async () =>{
        if (newPassword !== "" && confirmatioNewPassword !== "") {
            if(validatePassword(newPassword) && newPassword.length == 8){
                if(newPassword === confirmatioNewPassword){
                    setLoading(true)
                    const res = await Api.resetPassword(email, newPassword)
                    if(res.status == 201){
                        setLoading(false)
                        alert("Senha alterada com sucesso, façalogin")
                        navigation.navigate('SignIn')
                        
                    }else{
                        setLoading(false)
                        alert("Erro ao salvar")
                        navigation.navigate('SignIn')
                    }
                }else{
                    setErrorConfirmationNewPassword("Senhas diferentes")
                }
            }else{
                setErrorNewPassword("A senha deve conter pelo menos 1 letra minúscula, 1 letra maiúscula, 1 número e 1 caractere especial")
            }
        }else{
            if (errorNewPassword === "")
                setErrorNewPassword("Preenche o campo a cima")
            if (errorConfirmatioNewPassword === "")
                setErrorConfirmationNewPassword("Preenche o campo a cima")
        }
    }

    const handleChooseFunction = () =>{
        if(isValid && !isValidResetPassword){
            hendleSendCode()
        }else if(isValidResetPassword){
            heandleSendNewPassword()
        }else{
            heandleRequestCode()
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
            {
                loading?
                <IconLoading size = "large" color = "#FFFFFF"/>
                :
                    !isValidResetPassword?
                        !isValid ?
                            <AreaForm>
                                <SubTitulo>Enviarémos um e-mail com um código para você</SubTitulo>
                                
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
                            :
                            <AreaForm>
                                <SubTitulo>Insira o código, para trocar sua senha</SubTitulo>
                                
                                <Input 
                                    placeholder = "Código"
                                    value = {code}
                                    onChangeText = { t => {
                                        setCode(t)
                                        setCodeError(null)
                                    }}
                                    keyboardType = {"numeric"}
                                    errorMessage = {codeError}
                                    maxLength = {8}
                                />
                                
                            </AreaForm>
                    :
                    <AreaForm>
                        <SubTitulo>Crie sua nova senha</SubTitulo>
                        
                        <Input  
                            placeholder = "Nova senha"
                            value = {newPassword}
                            onChangeText = { t => {
                                setNewPassword(t)
                                setErrorNewPassword(null)
                            }}
                            password = {true}
                            maxLength = {8}
                            errorMessage = {errorNewPassword}
                        />

                        <Input  
                            placeholder = "Confirmar senha"
                            value = {confirmatioNewPassword}
                            onChangeText = { t => {
                                setConfirmationNewPassword(t)
                                setErrorConfirmationNewPassword(null)
                            }}
                            password = {true}
                            maxLength = {8}
                            errorMessage = {errorConfirmatioNewPassword}
                        />
                    </AreaForm>
                }
                {
                    loading?
                    null
                    :
                    <AreaButton>
                        <CustomButton onPress = {handleChooseFunction}>
                            <CustomButtonText>
                                Enviar
                            </CustomButtonText>
                        </CustomButton> 
                    </AreaButton>
                }
        </Container>
    );
}