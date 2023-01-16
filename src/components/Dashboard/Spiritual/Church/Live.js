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

export default function Live() {
    const { information, changeInformation } = useContext(InformationContext);
    const live = information?.espiritual?.live || {};
    const [temporary, setTemporary] = useState(!!live[week])
    const [description, setDescription] = useState(live[week] || '');

    function temporaryActive(status) {
        if (status === 'no') {
            setDescription('');
            changeStatus(true);
        }
        setTemporary(status === 'yes');
    }

    function changeStatus(clear) {
        const liveProgress = information?.espiritual?.live || {};
        liveProgress[week] = clear === true ? '' : description;

        changeInformation({
            ...information,
            espiritual: {
                ...information?.espiritual,
                live: liveProgress,
            },
        });
    }

    return (
        <Container>
            <Title>
                Você assistiu alguma live do Evangelho Simples essa semana?
            </Title>
            <RadioGroup
                row
                sx={{ justifyContent: 'center' }}
                onChange={(event) => temporaryActive(event.target.value)}
            >
                <FormControlLabel value='yes' control={<Radio />} label='Sim' checked={temporary === true} disabled={true} />
                <FormControlLabel value='no' control={<Radio />} label='Não' checked={temporary === false} disabled={true} />
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
    const live = information?.espiritual?.live || {};

    if (temporary || (`${week}` in live && live[week] && live[week])) {
        return (
            <>
                <Typography>
                    Qual live?
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
