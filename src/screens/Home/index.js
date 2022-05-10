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

    useEffect(()=>{
        getCompanies()
    })

    const getCompanies = async () => {
        const token = await AsyncStorage.getItem('token');
        const res = await Api.listCompanies(token);

        if(res.status == 201){
             setCompanies(res.data)
             setLoading(false)
        }
    }


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
                    
                    {/*loading && <IconLoading size = "large" color = "#fff" width = "28px" height = "28px"/> */}

                    {
                        companies.map((companie) =>{
                            return <Card data = {companie} key ={companie.id}/>
                        })
                    }
                
            </Scroll>
        </Container>
    );
}