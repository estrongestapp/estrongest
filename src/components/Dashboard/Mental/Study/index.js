import styled from 'styled-components';
import { useContext } from 'react';

import InformationContext from '../../../../contexts/InformationContext';

import AddMinutes from './AddMinutes';
import WeekProgress from './WeekProgress';

export default function Study() {
    const { information, changeInformation } = useContext(InformationContext);

    function addMinutes(minutes) {
        const minutesBefore = information?.intelectual?.estudo || 0;

        changeInformation({
            ...information,
            intelectual: {
                ...information?.intelectual,
                estudo: minutesBefore + Number(minutes),
            },
        });
    }

    return (
        <Container>
            <AddMinutes progress={information?.intelectual?.estudo || 0} addMinutes={addMinutes} />
            <WeekProgress progress={information?.intelectual?.estudo || 0} />
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 50px;
`;
