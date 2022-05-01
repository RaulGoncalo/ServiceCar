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
import {validatePassword} from '../../Functions';

export default({navigation}) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmatioNewPassword, setConfirmationNewPassword] = useState('');

    const [errorNewPassword, setErrorNewPassword] = useState('');
    const [errorConfirmatioNewPassword, setErrorConfirmationNewPassword] = useState(''); 


   const handleSalvePassaworClick = () => {

    setErrorNewPassword(null)
    setErrorConfirmationNewPassword(null)

        if (newPassword != "" && confirmatioNewPassword != ""){
                if (newPassword.length == 8){
                    if(validatePassWord(newPassword)){
                        if(newPassword == confirmatioNewPassword){                                
                                //criar api para salvar a nova senha
                        }else{
                            setErrorConfirmationNewPassword("Defina a mesma senha")
                        }
                    }else{
                        setErrorNewPassword("A senha deve conter pelo menos 1 letra minúscula, 1 letra maiúscula, 1 número e 1 caractere especial")
                    }
                }else{
                    setErrorNewPassword("A senha deve conter 8 digitos")
                }
        }else{
            if(newPassword == '')
                setErrorNewPassword("Preencha sua senha")
            if(confirmatioNewPassword == '')
                setErrorConfirmationNewPassword("Confirme sua senha")
        }
    }

    return(
        <Container>
            <StatusBar/>
            <AreaHeader>
                <Header onPress = {() => navigation.navigate('SingIn')}>
                    <IconExit width = "30" height = "30px" fill = "#fff"/>
                    <TituloHeader>Voltar</TituloHeader>
                </Header>
            </AreaHeader>
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

            <AreaButton>
                    <CustomButton onPress = {handleSalvePassaworClick}>
                        <CustomButtonText>
                            Salvar
                        </CustomButtonText>
                    </CustomButton> 
                </AreaButton>
            
        </Container>
    );
}