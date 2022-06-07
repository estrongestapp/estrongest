import styled from 'styled-components';
import { useContext } from 'react';

import InformationContext from '../../../../contexts/InformationContext';

import { Typography, IconButton } from '@mui/material';
import { AddCircle } from '@mui/icons-material';

export default function SoftDrink() {
    const { information, changeInformation } = useContext(InformationContext);

    function addOne() {
        const timesBefore = information?.fisico?.refri || 0;

        changeInformation({
            ...information,
            fisico: {
                ...information?.fisico,
                refri: timesBefore + 1,
            },
        });
    }

    return (
        <Container>
            <Title>
                Você bebeu refrigerante essa semana? <br />
                <small>Clique em + toda vez que beber</small>
            </Title>
            <ProgressContainer>
                <p>
                    {information?.fisico?.refri || 0}
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
