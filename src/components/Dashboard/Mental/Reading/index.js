import styled from 'styled-components';
import { useContext } from 'react';

import InformationContext from '../../../../contexts/InformationContext';

import AddPages from './AddPages';
import WeekProgress from './WeekProgress';

export default function Reading() {
    const { information, changeInformation } = useContext(InformationContext);

    function addMinutes(minutes) {
        const minutesBefore = information?.intelectual?.leitura || 0;

        changeInformation({
            ...information,
            intelectual: {
                ...information?.intelectual,
                leitura: minutesBefore + Number(minutes),
            },
        });
    }

    return (
        <Container>
            <AddPages progress={information?.intelectual?.leitura || 0} addMinutes={addMinutes} />
            <WeekProgress progress={information?.intelectual?.leitura || 0} />
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 50px;
`;
