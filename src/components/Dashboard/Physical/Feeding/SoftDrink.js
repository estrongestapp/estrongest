import styled from 'styled-components';
import { useContext } from 'react';
import moment from 'moment';

import InformationContext from '../../../../contexts/InformationContext';

import { Typography, IconButton } from '@mui/material';
import { AddCircle } from '@mui/icons-material';

export default function SoftDrink() {
    const { information, changeInformation } = useContext(InformationContext);
    const week = moment().utc(true).week();

    function addOne() {
        const refriProgress = information?.fisico?.refri || {};
        const timesBefore = refriProgress[week] || 0;
        refriProgress[week] = timesBefore + 1;
        
        changeInformation({
            ...information,
            fisico: {
                ...information?.fisico,
                refri: refriProgress,
            },
        });
    }

    function getProgress() {
        const refri = information?.fisico?.refri || {};
        return `${week}` in refri ? refri[week] : 0;
    }

    return (
        <Container>
            <Title>
                Você bebeu refrigerante essa semana? <br />
                <small>Clique em + toda vez que beber</small>
            </Title>
            <ProgressContainer>
                <p>
                    {getProgress()}
                </p>
                <IconButton onClick={addOne}>
                    <AddCircle
                        sx={{
                            color: '#BF211E',
                            fontSize: 30,
                        }}
                    />
                </IconButton>
            </ProgressContainer>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const Title = styled(Typography)`
    font-size: 24px !important;
    text-align: center;
    line-height: 25px !important;

    & small {
        font-size: 18px;
        font-weight: 300;
        color: #c4c4c4;
    }
`;

const ProgressContainer = styled.div`
    text-align: center;
    font-size: 72px;
`;
