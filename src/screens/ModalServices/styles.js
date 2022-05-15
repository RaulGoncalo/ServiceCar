import styled from 'styled-components/native';

export const OutsideModal = styled.View`
    flex: 1;
    background-color: rgba(0, 0, 0, 0.4);

    align-items:center;
    justify-content: flex-end;
`;

export const InsideModal = styled.View`
    flex: 0.7;
    width: 95%;
    padding: 10px;
    background-color: #221f29;
    border-top-right-radius :  16px;
    border-top-left-radius :  16px;
`;

export const Title = styled.Text`
    font-weight: bold;
    font-size: 22px;
    color: #fff;
    margin:0px 32px 0px 0px;

`;

export const AreaHeader = styled.View`
    flex-direction: row;
`;

export const Svg = styled.View`
    margin-top: 30px;
`;

export const AreaTitle = styled.View`
    flex-direction: column;    
    width: 220px;
    margin-top: 30px;
`;

export const Desc = styled.Text`

`;

export const Favorite = styled.View`
    flex: 1;
    max-width: 30px;
    flex-direction: column;
    margin-top: 10px;
    margin-right: 20px;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
`;

export const AreaIcon = styled.TouchableOpacity`
    flex-direction: column;
`;

export const Sevices = styled.ScrollView`
    flex-direction: column;
    padding: 10px;
    flex: 1;
    margin-top: 20px;
`;

export const SubTitle = styled.Text`
    font-weight: 600;
    font-size: 18px;
    color: #fff;
    margin:0px 0px 10px 0px;
`;

export const IconLoading = styled.ActivityIndicator`
    margin: 30px 0px 30px 0px;
    
`;