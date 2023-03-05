import styled from 'styled-components';
import { useContext, useState } from 'react';
import moment from 'moment';

import InformationContext from '../../../../contexts/InformationContext';

import {
    Typography,
    FormControlLabel,
    RadioGroup,
    Radio,
    TextField,
    Button,
} from '@mui/material';

const week = moment().utc(true).week();

export default function Ministry() {
    const { information, changeInformation } = useContext(InformationContext);
    const ministerio = information?.espiritual?.ministerio || {};
    const [temporary, setTemporary] = useState(!!ministerio[week]);
    const [description, setDescription] = useState(ministerio[week] || '');

    function temporaryActive(status) {
        if (status === 'no') {
            setDescription('');
            changeStatus(true);
        }
        setTemporary(status === 'yes');
    }

    function changeStatus(clear) {
        const ministerioProgress = information?.espiritual?.ministerio || {};
        ministerioProgress[week] = clear === true ? '' : description;

        changeInformation({
            ...information,
            espiritual: {
                ...information?.espiritual,
                ministerio: ministerioProgress,
            },
        });
    }

    return (
        <Container>
            <Title>
                Você participou de algum ministério essa semana?
            </Title>
            <RadioGroup
                row
                sx={{ justifyContent: 'center' }}
                onChange={(event) => temporaryActive(event.target.value)}
            >
                <FormControlLabel value='yes' control={<Radio />} label='Sim' checked={temporary === true} />
                <FormControlLabel value='no' control={<Radio />} label='Não' checked={temporary === false} />
            </RadioGroup>
            <Details
                temporary={temporary}
                information={information}
                description={description}
                setDescription={setDescription}
                changeStatus={changeStatus}
            />
        </Container>
    );
}

function Details({ temporary, information, description, setDescription, changeStatus }) {
    const ministerio = information?.espiritual?.ministerio || {};

    if (temporary || (`${week}` in ministerio && ministerio[week])) {
        return (
            <>
                <Typography>
                    Escreva o que você fez:
                </Typography>
                <TextField
                    type='text'
                    variant='outlined'
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    sx={{
                        width: '100%',
                    }}
                />
                <SaveButton variant="contained" onClick={changeStatus}>
                    Salvar
                </SaveButton>
            </>
        );
    } else {
        return null;
    }
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

const Title = styled(Typography)`
    font-size: 24px !important;
    text-align: center;
`;

const SaveButton = styled(Button)`
    background-color: #BF211E !important;
    font-size: 15;
    height: 30;
`;
