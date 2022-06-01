import React, { useState, useEffect } from 'react';
import { RefreshControl } from 'react-native';
import {
    Container,
    Title,
    AreaHeader,
    ListCars,
    Select,
    TextSelect,
} from './styles';
import StatusBar from '../../components/StatusBar';
import IconDown from '../../assets/chevron-down';
import IconUp from '../../assets/chevron-up';
import Api from '../../Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CardServiceSchedule from '../../components/CardServiceScheduled';

export default () => {

    const [isVisiblePendents, setIsVisiblePendents] = useState(false);
    const [isVisiblePerformed, setIsVisiblePerformed] = useState(false);
    const [isVisibleCanceled, setIsVisibleCanceled] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const [listServicesScheduled, setListServicesScheduled] = useState([]);
    const [listServicesScheduledCanceled, setListServicesScheduledCanceled] = useState([]);


    const getServicesSchedule = async () => {

        const token = await AsyncStorage.getItem('token');
        const res = await Api.getScheduleds(token);

        if (res.status === 200) {
            const json = await res.json();
            setListServicesScheduled(json.scheduled)
            setListServicesScheduledCanceled(json.cancelados)
        } else {
            alert("Erro ao buscar seus agendamentos");
        }
    }

    useEffect(() => {
        getServicesSchedule();
    }, [isVisiblePendents, isVisibleCanceled, isVisiblePerformed])

    const onRefresh = () => {
        setRefreshing(false)
        getServicesSchedule()
    }

    
 

    return (
        <Container refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <StatusBar />
            <AreaHeader>
                <Title>
                    Agenda
                </Title>
            </AreaHeader>

            <Select onPress={() => setIsVisiblePendents(!isVisiblePendents)}>
                <TextSelect>
                    Agendados
                </TextSelect>
                {
                    isVisiblePendents
                        ?
                        <IconUp width="24px" height="24px" fill="#ff0043" />
                        :
                        <IconDown width="24px" height="24px" fill="#ff0043" />
                }
            </Select>

            <ListCars
                style={{
                    padding: isVisiblePendents ? 40 : 0
                }}
            >
                {
                    isVisiblePendents
                        ?
                        listServicesScheduled.map((item, index) => {
                            if (item.statusagenda == 0 || item.statusagenda == 1)
                                return <CardServiceSchedule key={index} data={item} cancelSchedule = {()=>{onRefresh, setIsVisiblePendents(false), setIsVisibleCanceled(true)}}/>
                        })
                        :
                        <></>
                }
            </ListCars>

            <Select onPress={() => setIsVisiblePerformed(!isVisiblePerformed)}>
                <TextSelect>
                    Realizados
                </TextSelect>
                {
                    isVisiblePerformed
                        ?
                        <IconUp width="24px" height="24px" fill="#ff0043" />
                        :
                        <IconDown width="24px" height="24px" fill="#ff0043" />
                }
            </Select>

            <ListCars
                style={{

                    padding: isVisiblePerformed ? 40 : 0
                }}
            >
                {
                    isVisiblePerformed
                        ?
                        listServicesScheduled.map((item, index) => {
                            if (item.statusagenda == 2)
                                return <CardServiceSchedule key={index} data={item}/>
                        })
                        :
                        <></>
                }
            </ListCars>

            <Select onPress={() => setIsVisibleCanceled(!isVisibleCanceled)}>
                <TextSelect>
                    Cancelados
                </TextSelect>
                {
                    isVisibleCanceled
                        ?
                        <IconUp width="24px" height="24px" fill="#ff0043" />
                        :
                        <IconDown width="24px" height="24px" fill="#ff0043" />
                }
            </Select>

            <ListCars style={{
                padding: isVisibleCanceled ? 40 : 0
            }}>
                {
                    isVisibleCanceled
                        ?
                        listServicesScheduledCanceled.map((item, index) => {
                            return <CardServiceSchedule key={index} data={item}/>
                        })
                        :
                        <></>
                }
            </ListCars>
        </Container>
    );
}