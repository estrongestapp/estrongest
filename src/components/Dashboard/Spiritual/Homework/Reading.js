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


export default function Game() {
    const { information, changeInformation } = useContext(InformationContext);

    function getWeekDays() {
        const monday = moment().utc(true).day(1);
        const friday = moment().utc(true).day(5);
    }

    function changeStatus(status) {
        changeInformation({
            ...information,
            espiritual: {
                ...information?.espiritual,
                reading: status === 'yes',
            },
        });
    }

    return (
        <Container>
            <Title>
                Você venceu o reading dessa semana?
            </Title>
            <RadioGroup
                row
                sx={{ justifyContent: 'center' }}
                onChange={(event) => changeStatus(event.target.value)}
            >
                <FormControlLabel value='yes' control={<Radio />} label='Sim' checked={information?.espiritual?.reading === true} />
                <FormControlLabel value='no' control={<Radio />} label='Não' checked={information?.espiritual?.reading === false} />
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
