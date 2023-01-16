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
        const reuniaoProgress = information?.espiritual?.reuniao || {};
        reuniaoProgress[week] = status === 'yes';

        changeInformation({
            ...information,
            espiritual: {
                ...information?.espiritual,
                reuniao: reuniaoProgress,
            },
        });
    }

    function getProgress() {
        const reuniao = information?.espiritual?.reuniao || {};
        return `${week}` in reuniao ? reuniao[week] : null;
    }

    return (
        <Container>
            <Title>
                Você foi na reunião do ESTROGNEST essa semana?
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
