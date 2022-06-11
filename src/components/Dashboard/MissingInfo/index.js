import styled from 'styled-components';
import { useContext } from 'react';
import moment from 'moment';

import InformationContext from '../../../contexts/InformationContext';

import { Typography } from '@mui/material';

export default function MissingInfo() {
    const { information } = useContext(InformationContext);
    const week = moment().utc(true).week();

    function missing() {
        let fisico = information?.fisico || {};
        let intelectual = information?.intelectual || {};
        let emocional = information?.emocional || {};
        let espiritual = information?.espiritual || {};

        fisico = fisico[week] || {};
        intelectual = intelectual[week] || {};
        emocional = emocional[week] || {};
        espiritual = espiritual[week] || {};
    }

    return (
        <Container>
            <Title>
                Clique em algum dos botões abaixo para começar a navegar
            </Title>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
`;

const Title = styled(Typography)`
    font-size: 24px !important;
    text-align: center;
`;