import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import IconDollar from '../assets/fi-rr-dollar';
import IconNext from '../assets/fi-rr-angle-small-right';
import IconPrevious from '../assets/fi-rr-angle-small-left';
import IconClose from '../assets/fi-rr-angle-down';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../Api';
import { useNavigation } from '@react-navigation/native';



const Body = styled.View`
    width: 100%;
    max-height: 100%;
    margin-bottom: 16px;
`;

const HeaderService = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
`;


const Title = styled.Text`
    font-weight: 700;
    font-size: 22px;
    color: #fff;
`;


const AreaValue = styled.View`
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;

const TextInfo = styled.Text`
    font-weight: 700;
    font-size: 18px;
    color: #fff;
`;

const AreaDes = styled.View`
    justify-content: center;
    align-items: center;  
`;


const Desc = styled.Text`
    text-align:justify;
    font-weight: 300;
    font-size: 16px;
    color: #fff;
    margin-top:10px;
    margin-bottom:10px;
    
`;

const AreaDate = styled.View`
    padding: 20px;
`;

const AreaMonth = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;


const AreaIconNext = styled.TouchableOpacity`
`;

const AreaIconPrevious = styled.TouchableOpacity``;

const MonthTitle = styled.Text`
    font-weight: 700;
    font-size: 18px;
    color: #fff;  
`;


const AreaMonthTitle = styled.View`
    width: 150px;
    justify-content: center;
    align-items:center;
    margin: 0px 15px 0px 15px;
`;

const AreaDay = styled.ScrollView`
`;

const ButtonSelectDay = styled.TouchableOpacity`
    flex-direction: column;

    justify-content: center;
    align-items: center;

    border: 1px #fff;
    height: 72px;
    width: 54px;

    border-radius: 8px;
    margin: 10px 10px 0px 0px;
`;

const DayWeek = styled.Text`
    font-weight: 500;
    font-size: 14px;
    color: #fff;
`;

const Day = styled.Text`
    font-weight: 500;
    font-size: 14px;
    color: #fff;
`;

const Close = styled.View`
    flex-direction: row;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 16px;
    padding: 5px;
`;

const AreaIconClose = styled.TouchableOpacity`
    padding: 5px;
`;

const ScheduleButton = styled.TouchableOpacity`
    height: 45px;

    background-color: #ff043f;
    border-radius: 8px;

    justify-content: center;
    align-items: center;
`;

const ScheduleButtonText = styled.Text`
    font-weight: 500;
    font-size: 14px;
    color: #fff;
`;
const AreaHour = styled.View`
    justify-content: center;
    align-items: center;
    padding: 20px;
`;

const HourTitle = styled.Text`
    font-weight: 700;
    font-size: 18px;
    color: #fff;  
    margin-bottom: 10px;
`;


const ScrollHour = styled.ScrollView`
    
`;

const HourItem = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;

    border: 1px #fff;
    height: 45px;
    width: 120px;

    border-radius: 8px;
    margin: 0px 10px 20px 10px;
`;

const HourItemText = styled.Text`
    font-weight: 500;
    font-size: 14px;
    color: #fff;
`;

const IconLoading = styled.ActivityIndicator`
    margin: 30px 0px 30px 0px;
`;


const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
]

const days = [
    'Dom',
    'Seg',
    'Ter',
    'Qua',
    'Qui',
    'Sex',
    'Sab'
]



export default ({service, onRequestClose}) => {
    const navigation = useNavigation();

    const [selectedYear, setSelectedYear] = useState(0);
    const [ currentYear, setCurruntYear] =useState(0);

    const [selectedMonth, setSelectedMonth] = useState(0);
    const [ currentMonth, setCurruntMonth] =useState(0);

    const [selectedDay, setSelectedDay] = useState(0);
    const [selectedHour, setSelectedHou] = useState(null);
    
    const [listDays, setListDay] = useState([]);
    const [listHours, setListHours] = useState([]); 

    const [isLoading, setIsloading] = useState(false);

    const [error, setError] = useState('');

    useEffect(() =>{
        
        let daysAvailable = new Array()

        for(let i = parseInt(service.fromday); i <= service.today; i++){
            daysAvailable.push(i);
        }

        if(service.daysservice){
            let dayIsMonth = new Date(selectedYear, selectedMonth +1, 0).getDate();
            let newListDay = [];

            let monthOfToday = new Date().getMonth()
            let todaySDay = new Date().getDate();

            
            //se o mês selecionado for o mesmo mês de hoje, atribui a i o dia de hoje, caso contrario i é igual ao primeiro dia do mes
            let i = monthOfToday === selectedMonth ? todaySDay+1 : 1

            for( i; i <= dayIsMonth; i++){
                
                let d = new Date(selectedYear, selectedMonth, i);
                let day = d.getDay(); 
                isValid = false;

                let monthUnavailable  = selectedMonth < 10 ? '0'+(selectedMonth) : selectedMonth;
                let dayUnavailable = i < 10 ? '0'+1 : i;
                let unavailableDaysFront = selectedYear + "-" + monthUnavailable + "-" + dayUnavailable

                for(let l = 1; l <= daysAvailable.length; l++){
                    if(l === day){
                        isValid = true
                        break;
                    }  
                }

                newListDay.push({
                    status: service.unavailableDays.find((item) => item === unavailableDaysFront) ? false : isValid,
                    weekDay: days[day],
                    dayNumber: i,
                });
                
            };

            setListDay(newListDay);
            setListHours([])
            setSelectedDay(0)
        }
    },[service, selectedMonth, selectedYear])

    useEffect( ()=>{
        const getListhour = async () =>{
            if(service && selectedDay > 0){
                setIsloading(true)

                const token = await AsyncStorage.getItem('token');

                const data = {
                    idCompanie: service.idempresa,
                    idService: service.idservico,
                    date: selectedYear + "-" + selectedMonth + "-" + selectedDay
                }

                const res = await Api.getHoursService(token, data)

                if(res.status === 201){
                    setIsloading(false);
                    const json = await res.json();
                    setListHours(json.horarios);
                }else{
                    alert("Erro ao buscar as informações")
                }
            }

        }

        getListhour();
    }, [service, selectedDay])

    useEffect(() => {
        let today = new Date();

        setSelectedYear(today.getFullYear());
        setCurruntYear(today.getFullYear());

        setCurruntMonth(today.getMonth())
        setSelectedMonth(today.getMonth());

        setSelectedDay( today.getDay());

    }, [])

    const handleLeftDateClick = () =>{
        let mountDate = new Date(selectedYear, selectedMonth, 1);
        mountDate.setMonth(mountDate.getMonth() - 1);
        setSelectedYear(mountDate.getFullYear());
        setSelectedMonth(mountDate.getMonth());
        setSelectedDay(0);
    }
    const handleRigthDateClick = () =>{
        let mountDate = new Date(selectedYear, selectedMonth, 1);
        mountDate.setMonth(mountDate.getMonth() + 1);
        setSelectedYear(mountDate.getFullYear());
        setSelectedMonth(mountDate.getMonth());
        setSelectedDay(0);
    }

    const handleClickSchedule = async () => {
        const token = await AsyncStorage.getItem('token');

        const data = {
            idCompanie: service.idempresa,
            idService: service.idservico,
            date: selectedYear + "-" + selectedMonth + "-" + selectedDay,
            hourSchedule: selectedHour,
        }

        if(selectedDay && selectedHour){

            const res = await Api.saveSchedule(token, data);

            if(res.status === 201){
                onRequestClose()
                alert("Agendamento realizado")
            }else{
                alert("Problema ao agendar")
                onRequestClose()
            }
        }else{
            setError("Escolha um dia e depois um horário")
        }
    }

    return(
        <Body>
            <Close>
                <AreaIconClose onPress = {()=> onRequestClose()}>
                    <IconClose  width = "24px" height = "24px" fill = "#fff"/>
                </AreaIconClose>
            </Close>

            <HeaderService>
                <Title>
                    {service.service}
                </Title>

                <AreaValue>
                    <IconDollar width = '24' height = '24' fill = "#ff0043"/>
                    <TextInfo>
                        {service.price}
                    </TextInfo> 
                </AreaValue>
            </HeaderService>
           
            <AreaDes>
                <Desc>
                    {service.descservice}
                </Desc>
            </AreaDes>


            <AreaDate>
                <AreaMonth>
                    <AreaIconPrevious onPress = {selectedMonth > currentMonth  || selectedYear > currentYear? handleLeftDateClick : null}>
                        <IconPrevious width = '34' height = '34' fill = '#fff'/>
                    </AreaIconPrevious>

                    <AreaMonthTitle>
                        <MonthTitle>
                            {months[selectedMonth] + " " + selectedYear}
                        </MonthTitle>
                    </AreaMonthTitle>

                    <AreaIconNext onPress = { handleRigthDateClick }>
                        <IconNext width = '34' height = '34' fill = '#fff'/>
                    </AreaIconNext>
                </AreaMonth>

                <AreaDay horizontal = {true} showsHorizontalScrollIndicator = {false}>
                    {
                        listDays.map((item, key)=>{
                            return <ButtonSelectDay 
                                    key = {key} 
                                    onPress = {() =>item.status ? setSelectedDay(item.dayNumber) : null} 
                                    style = {
                                        {
                                            opacity : item.status ? 1 : 0.3,
                                            backgroundColor: item.dayNumber === selectedDay ? '#ff0043' : null
                                        }
                                    }
                                >
                                    <DayWeek>
                                    {item.weekDay}
                                    </DayWeek>
                                    <Day>
                                        {item.dayNumber}
                                    </Day>
                            </ButtonSelectDay>
                        })
                    }
                    
                </AreaDay>
            </AreaDate>
            
            {
                isLoading ?

                <IconLoading size = "large" color = "#fff" width = "28px" height = "28px"/>
                :
                <AreaHour>
                        <HourTitle>
                            {listHours.length > 0 ? "Horários disponíveis" : "Selecione um dia"}
                        </HourTitle>
                    <ScrollHour horizontal = {true} showsHorizontalScrollIndicator = {false}>
                        {
                    
                            listHours ?
                                    listHours.map((item, key) => {
                                        return (
                                            <HourItem 
                                                key = {key} 
                                                onPress = {() =>{setSelectedHou(item)}}
                                                style = {{
                                                    backgroundColor: item === selectedHour ? "#ff0043" : null
                                                }}
                                            >
                                                <HourItemText>
                                                    {item.split("-")[0] + " - " + item.split("-")[1]}
                                                </HourItemText>
                                            </HourItem>
                                    
                                        )
                                    })
                                
                            :
                            <></>
                        }
                    </ScrollHour>
                </AreaHour>
            }

            <ScheduleButton onPress = {handleClickSchedule}>
                <ScheduleButtonText>
                    Agendar
                </ScheduleButtonText>
            </ScheduleButton>
            
        </Body>
    );
}

