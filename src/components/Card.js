import React from 'react';
import styled from 'styled-components/native';


export default (props) => {
    return(
        <Card>
            <Svg>

            </Svg>

            <Infos>
                <Title>
                    {props.data.name}
                </Title>
            </Infos>

            <IconGo>

            </IconGo>
        </Card>
    );
}

const Card = styled.View`
    background-color: #322B38;
    width: 100%;
    height: 120px;

    flex-direction: row;
    justify-content: space-between;

    padding: 10px;
`;



const Infos = styled.View``;

const IconGo = styled.View``;

const Svg = styled.View``;