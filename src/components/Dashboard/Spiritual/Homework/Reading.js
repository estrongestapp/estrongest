import styled from 'styled-components';
import { useContext } from 'react';
import moment from 'moment';

import InformationContext from '../../../../contexts/InformationContext';

import {
    Typography,
    FormGroup,
    FormControlLabel,
    Checkbox,
} from '@mui/material';

export default function Game() {
    const { information, changeInformation } = useContext(InformationContext);
    const week = moment().utc(true).week();

    function getWeekdays() {
        const monday = moment().utc(true).day(1);
        const friday = moment().utc(true).day(5);

        const weekdays = [];
        for (let day = monday; day.isSameOrBefore(friday); day.add(1, 'days')) {
            weekdays.push(day.format('DD/MM'));
        }

        return weekdays;
    }

    function changeStatus(target) {
        const tarefaProgress = information?.espiritual?.tarefa || {};
        if (`${week}` in tarefaProgress) {
            tarefaProgress[week][target.value] = target.checked;
        } else {
            tarefaProgress[week] = {};
            tarefaProgress[week][target.value] = target.checked;
        }

        changeInformation({
            ...information,
            espiritual: {
                ...information?.espiritual,
                tarefa: tarefaProgress,
            },
        });
    }

    function verifyChecked(weekday) {
        const tarefa = information?.espiritual?.tarefa || {};
        const thisWeekProgress = tarefa[week] || {};

        if (thisWeekProgress[weekday]) {
            return thisWeekProgress[weekday];
        } else {
            return false;
        }
    }

    return (
        <Container>
            <Title>
                Quais tarefas vocês fez essa semana?
            </Title>
            <FormGroup onChange={(event) => changeStatus(event.target)}>
                {getWeekdays().map((weekday, index) => 
                    <FormControlLabel
                        key={index}
                        control={<Checkbox value={weekday} checked={verifyChecked(weekday)} />}
                        label={weekday}
                    />
                )}
            </FormGroup>
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
