import React, {useState, useEffect} from 'react';
import {
    Container,
    AreaHeader,
    AreaIcon,
    Scroll,
    Title,
    Filter,
    SelectionEspeciality,
    CustomPicker,
    Text,
    IconLoading,
} from './styles';

import IconFilter from '../../assets/fi-rr-filter';
import IconDown from '../../assets/chevron-down';
import IconUp from '../../assets/chevron-up';
import StatusBar from '../../components/StatusBar';
import Card from '../../components/Card';
import ModalServices from '../../components/ModalServices';
import Api from '../../Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RefreshControl} from 'react-native';

export default () => {
    const [isVisibleFilter, setIsVisibleFilter] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    const [filter, setFilter] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [listComponies, setListCompanies] = useState([]);
    const [companieSelected, setCompanieSelected] =useState([]);
    

    const data = [
        'Elétrica',
        'Funilária',
        'Mecânica',
        'Pintura',
    ]

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
      };

   async function getlistComponies  () {
        setIsloading(true)

        const token = await AsyncStorage.getItem('token');
        const res = await Api.companies(token, filter);

        if(res.status === 200){
            const json = await res.json()
            setListCompanies(json.data)
        }else{
            alert("Ocorreu um problema")
        }

        setIsloading(false)
    }

    const onRefresh = () =>{
        setRefreshing(false)
        getlistComponies()
    }
   

    useEffect(()=>{
        getlistComponies()
    },[filter])
 
    
    return(
        <Container>
            <StatusBar/>
            <AreaHeader>
                <Title>
                    Localize uma empresa
                </Title>
            </AreaHeader>
            <Scroll
                refreshControl = {<RefreshControl refreshing = {refreshing} onRefresh = {onRefresh} />}
            >
                

                <Filter 
                    onPress = {() => setIsVisibleFilter(!isVisibleFilter)}
                    style={{
                        borderBottomColor: isVisibleFilter ? '#1E1923' : '#ff0043',
                        marginBottom: isVisibleFilter ? 0 : 64
                    }}
                >
                    
                    <IconFilter width = "20px" height = "20px" fill = "#ff0043"/>

                    <Text>
                        Filtrar por especialidade
                    </Text>
                    {
                        isVisibleFilter 
                        ?
                        <IconUp width = "20px" height = "20px" fill = "#ff0043"/>
                        :
                        <IconDown width = "20px" height = "20px" fill = "#ff0043"/>
                    }
                </Filter>
                    {
                        isVisibleFilter 
                        ?
                        <SelectionEspeciality>
                           <CustomPicker
                                selectedValue = {filter}
                                onValueChange = {
                                    (t) => {
                                        setFilter(t)
                                        setIsVisibleFilter(false)
                                    }
                                }
                           >
                            <CustomPicker.Item   label = "Especialidade" value = {null}/>
                                {data.map((item, index) =>{
                                    return <CustomPicker.Item   label = {item} value = {item} key ={index}/>
                                })}
                            </CustomPicker>


                        </SelectionEspeciality>
                        :
                        null
                    }
                    
                    {isLoading && <IconLoading size = "large" color = "#fff" width = "28px" height = "28px"/>}

                    {
                        listComponies.map((companie) =>{
                            return <Card 
                                        data = {companie}
                                        key ={companie.id} 
                                        showModal = {toggleModal} 
                                        setData = {() => setCompanieSelected(companie)}
                                    />
                        })
                    }
                
            </Scroll>

            <ModalServices 
                modalActive = {isModalVisible} 
                modalCancel ={() => setModalVisible(false)} 
                data = {companieSelected}
            />
        </Container>
    );
}