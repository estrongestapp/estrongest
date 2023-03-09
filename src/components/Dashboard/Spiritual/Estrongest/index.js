import styled from 'styled-components';

import WeekMeeting from './WeekMeeting';
import Game from './Game';
import Guest from './Guest';

export default function Estrongest() {
    return (
        <Container>
            <WeekMeeting />
            <Game />
            <Guest />
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 50px;
`;
