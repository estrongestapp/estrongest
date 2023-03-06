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

export default function ColdShower() {
    const { information, changeInformation } = useContext(InformationContext);
    const week = moment().utc(true).week();
    const today = moment().utc(true).toISOString().substring(0, 10);

    function changeStatus(status) {
        const banhoProgress = information?.fisico?.banho || {};
        if (`${week}` in banhoProgress) {
            banhoProgress[week][today] = status === 'yes';
        } else {
            banhoProgress[week] = {};
            banhoProgress[week][today] = status === 'yes';
        }

        changeInformation({
            ...information,
            fisico: {
                ...information?.fisico,
                banho: banhoProgress,
            },
        });
    }

    function getCheckedDay() {
        const banho = information?.fisico?.banho || {};
        const thisWeekProgress = `${week}` in banho ? banho[week] : {};

        if (`${today}` in thisWeekProgress) {
            return thisWeekProgress[today];
        } else {
            return null;
        }
    }

    return (
        <Container>
            <Title>
                Você tomou um banho gelado de pelo menos 30 segundos essa manhã?
            </Title>
            <RadioGroup
                row
                sx={{ justifyContent: 'center' }}
                onChange={(event) => changeStatus(event.target.value)}
            >
                <FormControlLabel
                    value='yes'
                    control={<Radio />}
                    label='Sim'
                    checked={getCheckedDay() === true}
                    disabled={moment().utc(true).day() === 6}
                />
                <FormControlLabel
                    value='no'
                    control={<Radio />}
                    label='Não'
                    checked={getCheckedDay() === false}
                    disabled={moment().utc(true).day() === 6}
                />
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
