import React from 'react';
import {
    Container,
    Title,
    AreaHeader,
} from './styles';
import StatusBar from '../../components/StatusBar';


export default () => {
    return(
        <Container>
            <StatusBar/>
            <AreaHeader>
                <Title>
                    Agenda
                </Title>
            </AreaHeader>
        </Container>
    );
}