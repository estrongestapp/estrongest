import { Chip } from '@mui/material';

export default function GuestInfo({ visitante }) {
    return (
        <Chip
            label={`${visitante?.name}: ${visitante?.phone}`}
            variant="outlined"
        />
    );
}