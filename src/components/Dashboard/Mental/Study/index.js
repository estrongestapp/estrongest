import styled from 'styled-components';
import { useContext } from 'react';
import moment from 'moment';

import InformationContext from '../../../../contexts/InformationContext';

import AddMinutes from './AddMinutes';
import WeekProgress from './WeekProgress';

export default function Study() {
    const { information, changeInformation } = useContext(InformationContext);
    const week = moment().utc(true).week();

    function addMinutes(minutes) {
        const estudoProgress = information?.intelectual?.estudo || {};
        const minutesBefore = estudoProgress[week] || 0;
        estudoProgress[week] = minutesBefore + Number(minutes);
        
        changeInformation({
            ...information,
            intelectual: {
                ...information?.intelectual,
                estudo: estudoProgress,
            },
        });
    }

    function getProgress() {
        const estudo = information?.intelectual?.estudo || {};
        return `${week}` in estudo ? estudo[week] : 0;
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
