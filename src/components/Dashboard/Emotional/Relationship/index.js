import styled from 'styled-components';
import { useContext } from 'react';

import InformationContext from '../../../../contexts/InformationContext';

import {
    Typography,
    FormControlLabel,
    RadioGroup,
    Radio, 
} from '@mui/material';


export default function Relationship() {
    const { information, changeInformation } = useContext(InformationContext);

    function changeStatus(status) {
        changeInformation({
            ...information,
            emocional: {
                ...information?.emocional,
                namoro: status === 'yes',
            },
        });
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
                <FormControlLabel value='yes' control={<Radio />} label='Sim' checked={information?.emocional?.namoro === true} />
                <FormControlLabel value='no' control={<Radio />} label='Não' checked={information?.emocional?.namoro === false} />
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
