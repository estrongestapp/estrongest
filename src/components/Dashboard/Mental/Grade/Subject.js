import { Chip } from '@mui/material';

export default function Subject({ id, test, handleDelete }) {
    return (
        <Chip
            label={`${test.materia}: ${test.nota}`}
            variant="outlined"
            onDelete={() => handleDelete(id)}
        />
    );
}