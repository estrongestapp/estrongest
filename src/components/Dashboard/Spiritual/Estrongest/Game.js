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
    const week = moment().utc(true).week();

    function changeStatus(status) {
        const gameProgress = information?.espiritual?.game || {};
        gameProgress[week] = status === 'yes';

        changeInformation({
            ...information,
            espiritual: {
                ...information?.espiritual,
                game: gameProgress,
            },
        });
    }

    function getProgress() {
        const game = information?.espiritual?.game || {};
        return `${week}` in game ? game[week] : null;
    }

    return (
        <Container>
            <Title>
                Você venceu o game dessa semana?
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
