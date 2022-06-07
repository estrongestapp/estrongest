import styled from 'styled-components';

import WeekMeeting from './WeekMeeting';
import Game from './Game';

export default function Estrongest() {
    return (
        <Container>
            <WeekMeeting />
            <Game />
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 50px;
`;
