import styled from 'styled-components';
import { useState } from 'react';
import moment from 'moment';

import { Typography, TextField, IconButton, Tooltip } from '@mui/material';
import { AddCircle, RemoveCircle } from '@mui/icons-material';

export default function AddMinutes({ progress, addMinutes }) {
    const [minutesToAdd, setMinutesToAdd] = useState('');

    function handleClick(type) {
        addMinutes(minutesToAdd, type);
        setMinutesToAdd('');
    }

    return (
        <Container>
            <Title>
                Quanto tempo de uso de internet por lazer hoje?
            </Title>
            <InputContainer>
                <Tooltip title='Remover'>
                    <IconButton onClick={() => handleClick('remove')} disabled={progress <= 0}>
                        <RemoveCircle
                            size='inherit'
                            sx={{
                                color: '#BF211E',
                                fontSize: 30,
                            }}
                        />
                    </IconButton>
                </Tooltip>
                <TextField
                    type='number'
                    variant='outlined'
                    value={minutesToAdd}
                    onChange={(event) => setMinutesToAdd(event.target.value)}
                    sx={{
                        width: 100,
                    }}
                    disabled={moment().utc(true).day() === 6}
                />
                <Tooltip title='Adicionar'>
                    <IconButton onClick={() => handleClick('add')} disabled={moment().utc(true).day() === 6}>
                        <AddCircle
                            size='inherit'
                            sx={{
                                color: '#BF211E',
                                fontSize: 30,
                            }}
                        />
                    </IconButton>
                </Tooltip>
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
