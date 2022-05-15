import React from 'react';
import {
    Container,
    Title,
    AreaHeader,
    AreaIcon,
} from './styles';
import StatusBar from '../../components/StatusBar';
import IconMenu from '../../assets/fi-rr-menu-burger';

export default () => {
    return(
        <Container>
            <StatusBar/>
            <AreaHeader>
                <AreaIcon>
                    <IconMenu width = "28px" height = "28px" fill = "#ff0043"/>
                </AreaIcon>
                <Title>
                    Home
                </Title>
            </AreaHeader>
        </Container>
    );
}