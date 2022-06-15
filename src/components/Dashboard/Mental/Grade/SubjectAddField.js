import styled from 'styled-components';

import { TextField } from '@mui/material';

export default function SubjectAddField({ subjectName, setSubjectName, grade, setGrade, error }) {
    return (
        <Container>
            <TextField
                type='text'
                variant='outlined'
                label='Matéria'
                sx={{ width: '60%' }}
                value={subjectName}
                onChange={(event) => setSubjectName(event.target.value)}
                error={error.subject ? true : false}
                helperText={error.subject}
            />
            <TextField
                type='number'
                variant='outlined'
                label='Nota'
                sx={{ width: '30%' }}
                value={grade}
                onChange={(event) => setGrade(event.target.value)}
                error={error.grade ? true : false}
                helperText={error.grade}
            />
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: space-between;
`;
