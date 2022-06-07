import styled from 'styled-components';
import { useContext } from 'react';

import InformationContext from '../../../../contexts/InformationContext';

import AddMinutes from './AddMinutes';
import WeekProgress from './WeekProgress';

export default function Exercise() {
    const { information, changeInformation } = useContext(InformationContext);

    function addMinutes(minutes) {
        const minutesBefore = information?.fisico?.exercicio || 0;

        changeInformation({
            ...information,
            fisico: {
                ...information?.fisico,
                exercicio: minutesBefore + Number(minutes),
            },
        });
    }

    return (
        <Container>
            <AddMinutes progress={information?.fisico?.exercicio || 0} addMinutes={addMinutes} />
            <WeekProgress progress={information?.fisico?.exercicio || 0} />
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 50px;
`;
