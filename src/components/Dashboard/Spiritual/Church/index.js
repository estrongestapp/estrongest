import styled from 'styled-components';

import WeekMeeting from './WeekMeeting';
import Ministry from './Ministry';

export default function Church() {
    return (
        <Container>
            <WeekMeeting />
            <Ministry />
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 50px;
`;
