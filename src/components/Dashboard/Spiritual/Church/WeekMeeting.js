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


export default function WeekMeeting() {
    const { information, changeInformation } = useContext(InformationContext);
    const week = moment().utc(true).week();

    function changeStatus(status) {
        const cultoProgress = information?.espiritual?.culto || {};
        cultoProgress[week] = status === 'yes';

        changeInformation({
            ...information,
            espiritual: {
                ...information?.espiritual,
                culto: cultoProgress,
            },
        });
    }

    function getProgress() {
        const culto = information?.espiritual?.culto || {};
        return `${week}` in culto ? culto[week] : null;
    }
    return (
        <Container>
            <Title>
                Você foi no culto de Domingo dessa semana?
            </Title>
            <RadioGroup
                row
                sx={{ justifyContent: 'center' }}
                onChange={(event) => changeStatus(event.target.value)}
            >
                <FormControlLabel value='yes' control={<Radio />} label='Sim' checked={getProgress() === true} disabled={true} />
                <FormControlLabel value='no' control={<Radio />} label='Não' checked={getProgress() === false} disabled={true} />
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
