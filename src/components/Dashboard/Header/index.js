import styled from 'styled-components';

import { Typography } from '@mui/material';

export default function Header() {
    return (
        <Container>
            <Points>
                Pontos essa semana: 0/100
            </Points>
        </Container>
    );
}

const Container = styled.header`
    width: 100%;
    height: 60px;
    background-color: #0686C6;
    display: fixed;
    justify-content: center;
    align-items: center;
    padding: 0 15px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
`;

const Points = styled(Typography)`
    font-size: 20px !important;
    color: #ffffff;
    text-align: center;
`;
