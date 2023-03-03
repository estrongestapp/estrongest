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


export default function NewIdiom() {
    const { information, changeInformation } = useContext(InformationContext);
    const week = moment().utc(true).week();

    function changeStatus(status) {
        const idiomaProgress = information?.intelectual?.idioma || {};
        idiomaProgress[week] = status === 'yes';

        changeInformation({
            ...information,
            intelectual: {
                ...information?.intelectual,
                idioma: idiomaProgress,
            },
        });
    }

    function getProgress() {
        const idioma = information?.intelectual?.idioma || {};
        return `${week}` in idioma ? idioma[week] : null;
    }

    return (
        <Container>
            <Title>
                Você estudou 1 hora de alguma língua esrangeira essa semana?
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
