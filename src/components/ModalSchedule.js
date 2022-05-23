import React from 'react';
import { Modal, TouchableWithoutFeedback } from 'react-native';
import ModalContentSchedule from './ModalContentSchedule';
import styled from 'styled-components/native';

const OutsideModal = styled.View`
    flex: 1;
    background-color: rgba(0, 0, 0, 0.4);

    align-items:center;
    justify-content: flex-end;
`;

const InsideModal = styled.View`
    width: 95%;
    min-height: 240px;
    max-height: 640px;
    padding: 10px;
    background-color: #221f29;
    border-top-right-radius :  16px;
    border-top-left-radius :  16px;
`;

export default (props) => {
     
    return(
        <Modal
            animationType = 'slide'
            transparent = {true}
            visible ={props.modalActive}
            onRequestClose = {props.modalCancel}
        >
            <TouchableWithoutFeedback onPress={props.modalCancel}>
                <OutsideModal>
                    <TouchableWithoutFeedback>
                        <InsideModal>
                           <ModalContentSchedule service = {props.data} onRequestClose = {props.modalCancel}/>
                        </InsideModal>
                    </TouchableWithoutFeedback>
                </OutsideModal>
            </TouchableWithoutFeedback>            
        </Modal>
    ); 
}

