import styled from 'styled-components';

import Reading from './Reading';
import GoodAction from './GoodAction';

export default function Homework() {
    return (
        <Container>
            <Reading />
            <GoodAction />
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 50px;
`;
