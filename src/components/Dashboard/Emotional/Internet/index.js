import styled from 'styled-components';
import { useContext } from 'react';
import moment from 'moment';

import InformationContext from '../../../../contexts/InformationContext';

import AddMinutes from './AddMinutes';
import WeekProgress from './WeekProgress';

export default function Internet() {
    const { information, changeInformation } = useContext(InformationContext);
    const week = moment().utc(true).week();
    const today = moment().utc(true).toISOString().substring(0, 10);

    function addMinutes(minutes, type) {
        const internetProgress = information?.emocional?.internet || {};

        if (`${week}` in internetProgress) {
            const minutesBefore = internetProgress[week][today] || 0;
            if (type === 'add') {
                const newProgress = minutesBefore + Number(minutes);
                internetProgress[week][today] = newProgress;
            } else {
                const newProgress = minutesBefore - Number(minutes);
                internetProgress[week][today] = newProgress <= 0 ? 0 : newProgress;
            }
        } else {
            internetProgress[week] = {};
            internetProgress[week][today] = Number(minutes);
        }

        changeInformation({
            ...information,
            emocional: {
                ...information?.emocional,
                internet: internetProgress,
            },
        });
    }

    function getProgress() {
        const internet = information?.emocional?.internet || {};
        const thisWeekProgress = `${week}` in internet ? internet[week] : {};

        if (`${today}` in thisWeekProgress) {
            return thisWeekProgress[today];
        } else {
            return 0;
        }
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
