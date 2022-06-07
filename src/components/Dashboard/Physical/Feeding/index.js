import styled from 'styled-components';

import HealthyFood from './HealthyFood';
import SoftDrink from './SoftDrink';
import Water from './Water';

export default function Feeding() {
    return (
        <Container>
            <HealthyFood />
            <SoftDrink />
            <Water />
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 50px;
`;
