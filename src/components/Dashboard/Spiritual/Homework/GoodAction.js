import styled from 'styled-components';
import { useContext } from 'react';
import moment from 'moment';

import InformationContext from '../../../../contexts/InformationContext';

import { Typography, IconButton } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import { CircularProgressbar } from 'react-circular-progressbar';

export default function GoodAction() {
    const { information, changeInformation } = useContext(InformationContext);
    const week = moment().utc(true).week();

    function addOne() {
        const boaAcaoProgress = information?.espiritual?.boaAcao || {};
        const timesBefore = boaAcaoProgress[week] || 0;
        boaAcaoProgress[week] = timesBefore + 1;
        
        changeInformation({
            ...information,
            espiritual: {
                ...information?.espiritual,
                boaAcao: boaAcaoProgress,
            },
        });
    }

    function getProgress() {
        const boaAcao = information?.espiritual?.boaAcao || {};
        return `${week}` in boaAcao ? boaAcao[week] : 0;
    }

    return (
        <Container>
            <Title>
                Quantas boas ações você fez essa semana? <br />
                <small>Clique em + toda vez que fizer</small>
            </Title>
            <ProgressContainer>
                <CircularProgressbar
                    value={getProgress()}
                    maxValue={3}
                    text={`${getProgress()}`}
                />
                <IconButton onClick={addOne} disabled={getProgress() > 2}>
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
