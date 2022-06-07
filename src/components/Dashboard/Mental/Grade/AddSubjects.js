import { Typography, IconButton } from '@mui/material';
import { AddCircle } from '@mui/icons-material';

import Subject from './Subject';

export default function AddSubjects({ subjects, setSubjects }) {
    function handleClick() {
        setSubjects([
            ...subjects,
            {
                subject: '',
                grade: '',
            }
        ]);
    }

    return (
        <>
            <Typography sx={{ fontSize: 20 }}>
                Em quais matérias?
            </Typography>
            {subjects.map((subject, index) => <Subject key={index} />)}
            <IconButton onClick={handleClick}>
                <AddCircle
                    size='inherit'
                    sx={{
                        color: '#BF211E',
                        fontSize: 30,
                    }}
                />
            </IconButton>
        </>
    );
}