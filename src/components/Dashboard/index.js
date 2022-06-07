import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';

export default function Dashboard() {
    return (
        <Container>
            <Header />
            <Outlet />
            <Footer />
        </Container>
    );
}

const Container = styled.main`
    width: 100%;
    min-height: 100vh;
    padding: 70px 25px;
`;
