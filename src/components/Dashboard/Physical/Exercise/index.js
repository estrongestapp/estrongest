import styled from 'styled-components';
import { useContext } from 'react';
import moment from 'moment';

import InformationContext from '../../../../contexts/InformationContext';

import AddMinutes from './AddMinutes';
import WeekProgress from './WeekProgress';

export default function Exercise() {
    const { information, changeInformation } = useContext(InformationContext);
    const week = moment().utc(true).week();

    function addMinutes(minutes) {
        const exerciseProgress = information?.fisico?.exercicio || {};
        const minutesBefore = exerciseProgress[week] || 0;
        exerciseProgress[week] = minutesBefore + Number(minutes);
        
        changeInformation({
            ...information,
            fisico: {
                ...information?.fisico,
                exercicio: exerciseProgress,
            },
        });
    }

    function getProgress() {
        const exercicio = information?.fisico?.exercicio || {};
        return `${week}` in exercicio ? exercicio[week] : 0;
    }

    return (
        <Container>
            <AddMinutes progress={getProgress()} addMinutes={addMinutes} />
            <WeekProgress progress={getProgress()} />
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 50px;
`;
