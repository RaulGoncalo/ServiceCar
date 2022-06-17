import React, { useState, useContext } from "react";
import {
    Container,
    CustomButton,
    CustomButtonText,
    SubTitulo,
    Header,
    TituloHeader,
    AreaHeader,
    AreaForm,
    IconLoading,
    AreaButton,
} from './styles';


import StatusBar from "../../components/StatusBar";
import { UserContext } from '../../context/UserContext';
import Input from '../../components/Input';
import Api from '../../Api';
import { Alert } from 'react-native';
import IconExit from '../../assets/fi-rr-arrow-small-left.svg';
import { phoneMask, validateEmail, validatePassword } from '../../Functions';

export default ({ navigation }) => {
    const { dispatch: userDispatch } = useContext(UserContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmatioPassword, setConfirmationPassword] = useState('');

    const [errorName, setErrorName] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPhone, setErrorPhone] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorConfirmatioPassword, setErrorConfirmationPassword] = useState('');

    const [isLoading, setIsloading] = useState(false);

    const handleSignClick = async () => {
        setErrorName(null)
        setErrorEmail(null)
        setErrorPassword(null)
        setErrorConfirmationPassword(null)
        if (name != "" && email != "" && password != "" && confirmatioPassword != "") {
            if (validateEmail(email)) {
                if (password.length == 8) {
                    if (validatePassword(password)) {
                        if (password == confirmatioPassword) {
                            setIsloading(true)
                            let res = await Api.signUp(name, email, password, phone.replace(/[^0-9]/g, ''))
                            console.log(res)
                            if (res.status === 204) {
                                userDispatch({
                                    type: 'setUser',
                                    payload: {
                                        name: name,
                                        email: email,
                                        phone: phone
                                    }
                                });
                                setIsloading(false)
                            } else {
                                setIsloading(false)
                                const json = res.json()
                                Alert.alert("Erro", json.error, [
                                    { text: "Ok", onPress: () => navigation.navigate('SignIn') }]);
                            }
                        } else {
                            setErrorConfirmationPassword("Defina a mesma senha")
                        }
                    } else {
                        setErrorPassword("A senha deve conter pelo menos 1 letra minúscula, 1 letra maiúscula, 1 número e 1 caractere especial")
                    }
                } else {
                    setErrorPassword("A senha deve conter 8 digitos")
                }
            } else {
                setErrorEmail("Preencha seu email corretamente")
            }
        } else {
            if (name == '')
                setErrorName("Preencha seu nome")
            if (email == '')
                setErrorEmail("Preencha seu email")
            if (password == '')
                setErrorPassword("Preencha sua senha")
            if (confirmatioPassword == '')
                setErrorConfirmationPassword("Confirme sua senha")
        }
    }


    return (
        <Container>
            <StatusBar />
            <AreaHeader>
                <Header onPress={() => navigation.goBack()}>
                    <IconExit width="30" height="30px" fill="#fff" />
                    <TituloHeader>Voltar</TituloHeader>
                </Header>
            </AreaHeader>
            {
                    isLoading
                    ?
                    <IconLoading size="large" color="#fff" width="28px" height="28px" />
                    :
                    <>
                        <AreaForm>
                            <SubTitulo>Preencha os campos abaixo</SubTitulo>

                            <Input
                                placeholder="Nome completo"
                                value={name}
                                onChangeText={t => {
                                    setName(t)
                                    setErrorName(null)

                                }}
                                maxLength={100}
                                errorMessage={errorName}
                            />
                            <Input
                                placeholder="E-mail"
                                value={email}
                                onChangeText={t => {
                                    setEmail(t)
                                    setErrorEmail(null)
                                }}
                                keyboardType={"email-address"}
                                errorMessage={errorEmail}
                                maxLength={100}
                            />
                            <Input
                                placeholder="Telefone"
                                value={phone}
                                onChangeText={t => {
                                    setPhone(phoneMask(t))
                                    setErrorPhone(null)
                                }}
                                maxLength={16}
                                keyboardType={"numeric"}
                                errorMessage={errorPhone}
                            />
                            <Input
                                placeholder="Senha"
                                value={password}
                                onChangeText={t => {
                                    setPassword(t)
                                    setErrorPassword(null)
                                }}
                                password={true}
                                maxLength={8}
                                errorMessage={errorPassword}
                            />
                            <Input
                                placeholder="Confirmar senha"
                                value={confirmatioPassword}
                                onChangeText={t => {
                                    setConfirmationPassword(t)
                                    setErrorConfirmationPassword(null)
                                }}
                                password={true}
                                maxLength={8}
                                errorMessage={errorConfirmatioPassword}
                            />

                        </AreaForm>

                        <AreaButton>
                            <CustomButton onPress={handleSignClick}>
                                <CustomButtonText>
                                    Cadastrar
                                </CustomButtonText>
                            </CustomButton>
                        </AreaButton>
                    </>
            }

        </Container>
    );
}