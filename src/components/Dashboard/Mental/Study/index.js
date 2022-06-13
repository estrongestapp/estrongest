import styled from 'styled-components';
import { useContext } from 'react';
import moment from 'moment';

import InformationContext from '../../../../contexts/InformationContext';

import AddMinutes from './AddMinutes';
import WeekProgress from './WeekProgress';

export default function Study() {
    const { information, changeInformation } = useContext(InformationContext);
    const week = moment().utc(true).week();

    function addMinutes(minutes, type) {
        const estudoProgress = information?.intelectual?.estudo || {};
        const minutesBefore = estudoProgress[week] || 0;
        if (type === 'add') {
            const newProgress = minutesBefore + Number(minutes);
            estudoProgress[week] = newProgress >= 300 ? 300 : newProgress;
        } else {
            const newProgress = minutesBefore - Number(minutes);
            estudoProgress[week] = newProgress <= 0 ? 0 : newProgress;
        }
        
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
