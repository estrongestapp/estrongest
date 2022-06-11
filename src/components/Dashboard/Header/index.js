import styled from 'styled-components';
import { useContext } from 'react';

import InformationContext from '../../../contexts/InformationContext';
import calculationHelper from './calculationHelper';

import { Typography } from '@mui/material';

export default function Header() {
    const { information } = useContext(InformationContext);

    function calculatePoints() {
        const fisico = information?.fisico || {};
        const intelectual = information?.intelectual || {};
        const emocional = information?.emocional || {};
        const espiritual = information?.espiritual || {};

        const fisicoPoints = calculationHelper.fisico(fisico);
        const intelectualPoints = calculationHelper.intelectual(intelectual);
        const emocionalPoints = calculationHelper.emocional(emocional);
        const espiritualPoints = calculationHelper.espiritual(espiritual);

        return fisicoPoints + intelectualPoints + emocionalPoints + espiritualPoints;
    }

    return (
        <Container>
            <Points>
                Pontos essa semana: {calculatePoints()}/100
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
