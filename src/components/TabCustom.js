import React from "react";
import styled from 'styled-components/native';

import HomeIcon from '../assets/fi-rr-home.svg'
import CalendarIcon from '../assets/fi-rr-calendar.svg'
import StarIcon from '../assets/fi-rr-star.svg'

import HomeFilledIcon from '../assets/homeFilled.svg'
import CalendarFilledIcon from '../assets/calendarFilled.svg'
import StarFilledIcon from '../assets/starFilled.svg'
import Home from "../screens/Home";

const TabArea = styled.View`
    height: 60px;
    background-color: #221f29;
    elevation: 10;
    flex-direction: row;
`;
const TabItem = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export default ({state, navigation}) => {

    const goTo = (screenName) => {
        navigation.navigate(screenName)
    }

    return(
        <TabArea>
            
            <TabItem  onPress = {() => goTo('Favorites')}>
                {
                    state.index === 0 
                    ? 
                    <StarFilledIcon width = "25" height = "25"fill = "#FF0043"/>
                    :
                    <StarIcon  width = "23" height = "23"fill = "#FF0043"/>
                }
            </TabItem>

            <TabItem onPress = {() => goTo('Home')}>
                {
                    state.index === 1 
                    ?
                    <HomeFilledIcon width = "25" height = "25"fill = "#FF0043"/>
                    :
                    <HomeIcon  width = "23" height = "23"fill = "#FF0043"/>
                }
            </TabItem>

            <TabItem  onPress = {() => goTo('Schedule')}>
                {
                    state.index === 2 
                    ?
                    <CalendarFilledIcon width = "25" height = "25"fill = "#FF0043"/>
                    :
                    <CalendarIcon width = "23" height = "23"fill = "#FF0043"/>
                }
                
            </TabItem>

        </TabArea>
    )
}