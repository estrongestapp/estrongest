import styled from 'styled-components';
import { useContext } from 'react';
import moment from 'moment';

import InformationContext from '../../../../contexts/InformationContext';

import {
    Typography,
    FormControlLabel,
    RadioGroup,
    Radio, 
} from '@mui/material';


export default function Relationship() {
    const { information, changeInformation } = useContext(InformationContext);
    const week = moment().utc(true).week();

    function changeStatus(status) {
        const namoroProgress = information?.emocional?.namoro || {};
        namoroProgress[week] = status === 'yes';

        changeInformation({
            ...information,
            emocional: {
                ...information?.emocional,
                namoro: namoroProgress,
            },
        });
    }

    function getProgress() {
        const namoro = information?.emocional?.namoro || {};
        return `${week}` in namoro ? namoro[week] : null;
    }

    return (
        <Container>
            <Title>
                Você teve intimidade física com outra pessoa essa semana?
            </Title>
            <RadioGroup
                row
                sx={{ justifyContent: 'center' }}
                onChange={(event) => changeStatus(event.target.value)}
            >
                <FormControlLabel value='yes' control={<Radio />} label='Sim' checked={getProgress() === true} />
                <FormControlLabel value='no' control={<Radio />} label='Não' checked={getProgress() === false} />
            </RadioGroup>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

const Title = styled(Typography)`
    font-size: 24px !important;
    text-align: center;
`;
