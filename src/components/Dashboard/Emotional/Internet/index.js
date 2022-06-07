import styled from 'styled-components';
import { useContext } from 'react';
import moment from 'moment';

import InformationContext from '../../../../contexts/InformationContext';

import AddMinutes from './AddMinutes';
import WeekProgress from './WeekProgress';

export default function Internet() {
    const { information, changeInformation } = useContext(InformationContext);
    const today = moment().utc(true).toISOString().substring(0, 10);

    function addMinutes(minutes) {
        const internet = information?.emocional?.internet || {};
        const minutesBefore = internet[today] || 0;

        internet[today] = minutesBefore + Number(minutes);

        changeInformation({
            ...information,
            emocional: {
                ...information?.emocional,
                internet,
            },
        });
    }

    function getTodayMinutes() {
        const internet = information?.emocional?.internet || {};

        if (Object.keys(internet).includes(today)) {
            return internet[today];
        } else {
            return 0;
        }
    }

    return (
        <Container>
            <AddMinutes progress={getTodayMinutes()} addMinutes={addMinutes} />
            <WeekProgress progress={getTodayMinutes()} />
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 50px;
`;
