import styled from 'styled-components';

import ColdShower from './ColdShower';

export default function Feeding() {
    return (
        <Container>
            <ColdShower />
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 50px;
`;
