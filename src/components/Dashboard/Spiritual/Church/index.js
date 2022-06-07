import styled from 'styled-components';

import WeekMeeting from './WeekMeeting';
import Ministry from './Ministry';
import Live from './Live';

export default function Church() {
    return (
        <Container>
            <WeekMeeting />
            <Ministry />
            <Live />
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 50px;
`;
