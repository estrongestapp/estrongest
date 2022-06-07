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

export default function Water() {
    const { information, changeInformation } = useContext(InformationContext);
    const today = moment().utc(true).toISOString().substring(0, 10)

    function changeStatus(status) {
        const agua = information?.fisico?.agua || {};

        agua[today] = status === 'yes';

        changeInformation({
            ...information,
            fisico: {
                ...information?.fisico,
                agua,
            },
        });
    }

    function getCheckedDay() {
        const agua = information?.fisico?.agua || {};

        if (Object.keys(agua).includes(today)) {
            return agua[today];
        } else {
            return null;
        }
    }

    return (
        <Container>
            <Title>
                Você bebeu 2 litros de água hoje?
            </Title>
            <RadioGroup
                row
                sx={{ justifyContent: 'center' }}
                onChange={(event) => changeStatus(event.target.value)}
            >
                <FormControlLabel value='yes' control={<Radio />} label='Sim' checked={getCheckedDay() === true} />
                <FormControlLabel value='no' control={<Radio />} label='Não' checked={getCheckedDay() === false} />
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
