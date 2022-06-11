import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import BlockedOnSunday from './BlockedOnSunday';

export default function Dashboard() {
    return (
        <Container>
            <BlockedOnSunday>
                <Header />
                <Outlet />
                <Footer />
            </BlockedOnSunday>
        </Container>
    );
}

const Container = styled.main`
    width: 100%;
    min-height: 100vh;
    padding: 70px 25px;
`;
