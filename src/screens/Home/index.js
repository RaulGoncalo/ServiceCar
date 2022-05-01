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
import IconMenu from '../../assets/fi-rr-menu-burger';
import IconFilter from '../../assets/fi-rr-filter';
import IconDown from '../../assets/chevron-down';
import IconUp from '../../assets/chevron-up';
import StatusBar from '../../components/StatusBar';
import Card from '../../components/Card';
import Api from '../../Api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default () => {
    const [isVisibleFilter, setIsVisibleFilter] = useState(false);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState("");

    const [companies, setCompanies] = useState([])

    const data = [
        'Elétrica',
        'Funilária',
        'Mecânica',
        'Pintura',
        'Outros',
    ]


    const handleIsVisible = () =>{
        setIsVisibleFilter(!isVisibleFilter)
    }

    const getCompanies = async () => {
        const token =AsyncStorage.getItem('token')

        const res = await Api.getCompanies(token)
        
        console.log(res)

        if(res.status == 201){
            
             setCompanies(res.data)
             setLoading(false)
        }else{
            alert("Problemas ao buscar empresas")
        }
    }

    useEffect(()=>{
        getCompanies()
        setLoading(true);
    }, [])

    return(
        <Container>
            <StatusBar/>
            <AreaHeader>
                <AreaIcon>
                    <IconMenu width = "28px" height = "28px" fill = "#ff0043"/>
                </AreaIcon>
            </AreaHeader>
            <Scroll>
                <Title>
                    Localize uma empresa
                </Title>

                <Filter 
                    onPress = {() => handleIsVisible()}
                    style={{borderBottomColor: isVisibleFilter ? '#1E1923' : '#ff0043'}}
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
                                    (specialty) => {
                                        setFilter(specialty)
                                        setLoading(true)
                                    }
                                }
                           >
                            <CustomPicker.Item   label = "Especialidade" value = ""/>
                                {data.map((item, index) =>{
                                    return <CustomPicker.Item   label = {item} value = {item} key ={index}/>
                                })}
                            </CustomPicker>


                        </SelectionEspeciality>
                        :
                        null
                    }
                    
                    {loading && <IconLoading size = "large" color = "#fff" width = "28px" height = "28px"/> }

                    <Card/>
                
            </Scroll>
        </Container>
    );
}