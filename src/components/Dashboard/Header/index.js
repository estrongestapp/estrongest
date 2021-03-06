import styled from 'styled-components';
import { useContext } from 'react';
import moment from 'moment';

import InformationContext from '../../../contexts/InformationContext';
import calculatePoints from './calculationHelper';

import { Typography } from '@mui/material';

import Menu from './Menu';

export default function Header() {
    const { information } = useContext(InformationContext);
    const week = moment().utc(true).week();

    return (
        <Container>
            <Menu />
            <Box>
                <Points>
                    Pontos essa semana: {calculatePoints(information, week)}/100
                </Points>
            </Box>
        </Container>
    );
}

const Container = styled.header`
    width: 100%;
    height: 60px;
    background-color: #0686C6;
    display: flex;
    align-items: center;
    padding: 0 15px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
`;

const Box = styled.div`
    width: 100%;
`;

const Points = styled(Typography)`
    font-size: 20px !important;
    color: #ffffff;
    text-align: center;
`;
