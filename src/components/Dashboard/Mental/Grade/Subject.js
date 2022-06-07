import styled from 'styled-components';

import { TextField } from '@mui/material';

export default function Subject() {
    return (
        <Container>
            <TextField
                type='text'
                variant='outlined'
                label='Matéria'
                sx={{ width: '60%' }}
            />
            <TextField
                type='number'
                variant='outlined'
                label='Nota'
                sx={{ width: '30%' }}
            />
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: space-between;
`;
