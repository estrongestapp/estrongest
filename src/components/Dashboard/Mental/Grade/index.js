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

import AddSubjects from './AddSubjects';

export default function Grade() {
    const { information, changeInformation } = useContext(InformationContext);
    const week = moment().utc(true).week();

    function changeStatus(status) {
        const notasProgress = information?.intelectual?.notas || {};
        notasProgress[week] = status === 'yes' ? [] : false;

        changeInformation({
            ...information,
            intelectual: {
                ...information?.intelectual,
                notas: notasProgress,
            },
        });
    }

    function getProgress() {
        const notas = information?.intelectual?.notas || {};
        return `${week}` in notas ? notas[week] : null;
    }

    return (
        <Container>
            <Title>
                Você tirou nota baixa essa semana?
            </Title>
            <RadioGroup
                row
                onChange={(event) => changeStatus(event.target.value)}
                sx={{ justifyContent: 'center' }}
            >
                <FormControlLabel value='yes' control={<Radio />} label='Sim' checked={getProgress()?.length >= 0} />
                <FormControlLabel value='no' control={<Radio />} label='Não' checked={getProgress() === false} />
            </RadioGroup>
            {getProgress()?.length >= 0 && <AddSubjects subjects={getProgress()} />}
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
