import styled from 'styled-components';
import { useContext } from 'react';
import moment from 'moment';

import InformationContext from '../../../contexts/InformationContext';
import calculatePoints from './calculationHelper';

import { Typography } from '@mui/material';

import Menu from './Menu';

const START_DATE = process.env.REACT_APP_START_DATE;

export default function Header() {
    const { information } = useContext(InformationContext);
    const startWeek = moment(START_DATE).utc(true).week();
    const week = moment().utc(true).week();
    const sequencialWeek = week < startWeek ? week + startWeek + 1 : week - startWeek;
    const multiplier = moment().day(0).month() + 1;

    return (
        <Container>
            <Menu />
            <Box>
                <Points>
                    Pontos essa semana: {calculatePoints(information, week) * multiplier}/{100 * multiplier}
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
