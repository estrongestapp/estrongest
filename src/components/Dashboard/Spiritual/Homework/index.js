import styled from 'styled-components';

import Reading from './Reading';

export default function Homework() {
    return (
        <Container>
            <Reading />
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 50px;
`;
