import styled from 'styled-components';

import { Typography } from '@mui/material';
import { CircularProgressbar } from 'react-circular-progressbar';

export default function WeekProgress({ progress }) {
    return (
        <Container>
            <Title>
                Páginas essa semana
            </Title>
            <ProgressContainer>
                <CircularProgressbar
                    value={progress}
                    maxValue={50}
                    text={`${progress} pág`}
                />
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
`;

const ProgressContainer = styled.div`
    width: 200px;
    margin: 0 auto;
`;
