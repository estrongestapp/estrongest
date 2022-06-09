import styled from 'styled-components';
import { useContext } from 'react';

import InformationContext from '../../../../contexts/InformationContext';

import { Typography, IconButton } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import { CircularProgressbar } from 'react-circular-progressbar';

export default function SoftDrink() {
    const { information, changeInformation } = useContext(InformationContext);

    function addOne() {
        const timesBefore = information?.espiritual?.boaAcao || 0;

        changeInformation({
            ...information,
            espiritual: {
                ...information?.espiritual,
                boaAcao: timesBefore + 1,
            },
        });
    }

    return (
        <Container>
            <Title>
                Quantas boas ações você fez essa semana? <br />
                <small>Clique em + toda vez que fizer</small>
            </Title>
            <ProgressContainer>
                <CircularProgressbar
                    value={information?.espiritual?.boaAcao || 0}
                    maxValue={3}
                    text={`${information?.espiritual?.boaAcao || 0}`}
                />
                <IconButton onClick={addOne} disabled={information?.espiritual?.boaAcao > 2}>
                    <AddCircle
                        sx={{
                            color: '#BF211E',
                            fontSize: 40,
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
    width: 150px;
    text-align: center;
    margin: 0 auto;
`;
