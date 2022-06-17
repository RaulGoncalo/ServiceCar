import React, { useState, useEffect } from 'react';
import { RefreshControl, Alert } from 'react-native';
import {
    Container,
    Title,
    AreaHeader,
    AreaIcon,
    BodyListFavorites,
} from './styles';
import StatusBar from '../../components/StatusBar';
import IconMenu from '../../assets/fi-rr-menu-burger';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../../Api';
import Card from '../../components/Card';

import Modal from '../../components/Modal';
import ModalContentServices from '../../components/ModalContentServices';

import ModalProfile from './ModalHome/ModalProfile';
import ModalContentProfile from './ModalHome/ModalContentProfile';


export default ({navigation}) => {


    const [modalProfileVisible, setModalProfileVisible] = useState(false);
    const [isModalCompanieVisible, setIsModalCompanieVisible] = useState(false);

    const [refreshing, setRefreshing] = useState(false);

    const [companieSelected, setCompanieSelected] =useState([]);
    const [listFavorites, setListFavorites] = useState([]);


    const getListFavorites = async () => {
        const token = await AsyncStorage.getItem('token');
        const res = await Api.getListFavorites(token)

        if (res.status === 200) {
            const resJson = await res.json()
            setListFavorites(resJson.favorites)
        } else {
            alert("Erro ao buscar os favoritos")
        }
    }

    const onRefresh = () =>{
        setRefreshing(false)
        getListFavorites()
    }

    const handleLogout = () =>{
        Alert.alert("Sair?", "Deseja realmente sair?", 
        [
            {
                text: "Cancel",
                style: "cancel"
              },
              { text: "OK", onPress: async () => {
                await AsyncStorage.removeItem('token');
                navigation.reset({
                    routes: [{name: 'SignIn'}]
                })
              } }
        ]);
    }

    useEffect(() => {
        getListFavorites();
    }, [])

    return (
        <Container>
            <StatusBar />
            <AreaHeader>
                <AreaIcon onPress={() => setModalProfileVisible(true)}>
                    <IconMenu width="28px" height="28px" fill="#ff0043" />
                </AreaIcon>
            </AreaHeader>

            {
                listFavorites.length > 0 ? <Title>Favoritos</Title> : <Title>Nenhum favorito</Title>
            }

            <BodyListFavorites refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                {
                    
                    listFavorites.map((companie) =>{
                        return <Card 
                                    data = {companie}
                                    key ={companie.id} 
                                    showModal = {() => setIsModalCompanieVisible(!isModalCompanieVisible)} 
                                    setData = {() => setCompanieSelected(companie)}
                                />
                    })
                }
            </BodyListFavorites>

            <ModalProfile
                    modalActive={modalProfileVisible}
                    modalCancel={() => setModalProfileVisible(false)}
                    children = {<ModalContentProfile onRequestClose = {() => setModalProfileVisible(false)} logout = {handleLogout}/>}
            />

            <Modal 
                modalActive = {isModalCompanieVisible} 
                modalCancel ={() => setIsModalCompanieVisible(false)} 
                children = {<ModalContentServices  data = {companieSelected} onRequestClose = {() => setIsModalCompanieVisible(false)}/>}
            />

        </Container>
    );
}