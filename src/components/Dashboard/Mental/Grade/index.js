import styled from 'styled-components';
import { useContext } from 'react';
import moment from 'moment';

import InformationContext from '../../../../contexts/InformationContext';

import {
    Typography,
    FormControlLabel,
    RadioGroup,
    Radio,
    Button,
} from '@mui/material';

import AddSubjects from './AddSubjects';

export default function Grade() {
    const { information, changeInformation } = useContext(InformationContext);
    const week = moment().utc(true).week();
    const today = moment().utc(true).toISOString().substring(0, 10);

    function changeStatus(status) {
        const notasProgress = information?.intelectual?.notas || {};
        notasProgress[week] = status === 'yes';

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
                /*value={lowGrade}*/
                onChange={(event) => changeStatus(event.target.value)}
                sx={{ justifyContent: 'center' }}
            >
                <FormControlLabel value='yes' control={<Radio />} label='Sim' checked={getProgress() === true} />
                <FormControlLabel value='no' control={<Radio />} label='Não' checked={getProgress() === false} />
            </RadioGroup>
            {/*lowGrade === 'yes' && <AddSubjects subjects={subjects} setSubjects={setSubjects} />*/}
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
