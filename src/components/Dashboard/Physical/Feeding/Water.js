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
    const week = moment().utc(true).week();
    const today = moment().utc(true).toISOString().substring(0, 10);

    function changeStatus(status) {
        const aguaProgress = information?.fisico?.agua || {};
        if (`${week}` in aguaProgress) {
            aguaProgress[week][today] = status === 'yes';
        } else {
            aguaProgress[week] = {};
            aguaProgress[week][today] = status === 'yes';
        }

        changeInformation({
            ...information,
            fisico: {
                ...information?.fisico,
                agua: aguaProgress,
            },
        });
    }

    function getCheckedDay() {
        const agua = information?.fisico?.agua || {};
        const thisWeekProgress = `${week}` in agua ? agua[week] : {};

        if (`${today}` in thisWeekProgress) {
            return thisWeekProgress[today];
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
                <FormControlLabel
                    value='yes'
                    control={<Radio />}
                    label='Sim'
                    checked={getCheckedDay() === true}
                    /*disabled={moment().utc(true).day() === 6}*/
                    disabled={true}
                />
                <FormControlLabel
                    value='no'
                    control={<Radio />}
                    label='Não'
                    checked={getCheckedDay() === false}
                    /*disabled={moment().utc(true).day() === 6}*/
                    disabled={true}
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
