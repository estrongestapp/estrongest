import styled from 'styled-components';
import { useState } from 'react';

import { Typography, TextField, IconButton } from '@mui/material';
import { AddCircle } from '@mui/icons-material';

export default function AddMinutes({ progress, addMinutes }) {
    const [minutesToAdd, setMinutesToAdd] = useState('');

    function handleClick() {
        addMinutes(minutesToAdd);
        setMinutesToAdd('');
    }

    return (
        <Container>
            <Title>
                Deseja adicionar quantos minutos de exercício?
            </Title>
            <InputContainer>
                <TextField
                    type='number'
                    variant='outlined'
                    value={minutesToAdd}
                    onChange={(event) => setMinutesToAdd(event.target.value)}
                    sx={{
                        width: 100,
                    }}
                />
                <IconButton onClick={handleClick} disabled={progress >= 180}>
                    <AddCircle
                        size='inherit'
                        sx={{
                            color: '#BF211E',
                            fontSize: 30,
                        }}
                    />
                </IconButton>
            </InputContainer>
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

const InputContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
`;
