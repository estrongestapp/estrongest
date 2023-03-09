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
    Chip,
} from '@mui/material';

const week = moment().utc(true).week();

export default function Ministry() {
    const { information, changeInformation } = useContext(InformationContext);
    const ministerio = information?.espiritual?.ministerio || {};
    const [temporary, setTemporary] = useState();
    const [description, setDescription] = useState(ministerio[week] === null ? null : ministerio[week]);

    function temporaryActive(status) {
        if (status === 'no') {
            setDescription(false);
            changeStatus(true);
        } else {
            setDescription('');
        }
        setTemporary(status === 'yes');
    }

    function changeStatus(clear) {
        const ministerioProgress = information?.espiritual?.ministerio || {};
        ministerioProgress[week] = clear === true ? false : description;
        setTemporary(null);

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
                <FormControlLabel value='yes' control={<Radio />} label='Sim' checked={description || temporary === true} />
                <FormControlLabel value='no' control={<Radio />} label='Não' checked={description === false && temporary !== true} />
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

    if (temporary) {
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
    } else if (`${week}` in ministerio && ministerio[week]) {
        return (
            <Description description={description} />
        );
    } else {
        return null;
    }
}

function Description({ description }) {
    return (
        <Chip
            label={`${description}`}
            variant="outlined"
        />
    );
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
