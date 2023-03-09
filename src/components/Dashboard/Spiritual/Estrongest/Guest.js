import styled from 'styled-components';
import { useState, useContext } from 'react';
import moment from 'moment';

import InformationContext from '../../../../contexts/InformationContext';

import {
    Typography,
    FormControlLabel,
    RadioGroup,
    Radio,
    TextField,
    Button
} from '@mui/material';

import GuestInfo from './GuestInfo';

const week = moment().utc(true).week();

export default function Guest() {
    const { information, changeInformation } = useContext(InformationContext);
    const [temporary, setTemporary] = useState();
    const [guestName, setGuestName] = useState('');
    const [guestPhone, setGuestPhone] = useState('');

    function temporaryActive(status) {
        if (status === 'no') {
            setGuestName('');
            setGuestPhone('');
            changeStatus(true);
        }
        setTemporary(status === 'yes');
    }

    function changeStatus(clear) {
        const visitanteProgress = information?.espiritual?.visitante || {};
        visitanteProgress[week] = clear === true ? false : { name: guestName, phone: guestPhone };
        setTemporary(null);

        changeInformation({
            ...information,
            espiritual: {
                ...information?.espiritual,
                visitante: visitanteProgress,
            },
        });
    }

    function getProgress() {
        const visitante = information?.espiritual?.visitante || {};
        return `${week}` in visitante ? visitante[week] : null;
    }

    return (
        <Container>
            <Title>
                Você trouxe um visitante para a reunião ESTRONG(EST) dessa semana?
            </Title>
            <RadioGroup
                row
                sx={{ justifyContent: 'center' }}
                onChange={(event) => temporaryActive(event.target.value)}
            >
                <FormControlLabel value='yes' control={<Radio />} label='Sim' checked={temporary === true || !!getProgress()} />
                <FormControlLabel value='no' control={<Radio />} label='Não' checked={getProgress() === false && temporary !== true} />
            </RadioGroup>
            <Details
                temporary={temporary}
                guestName={guestName}
                setGuestName={setGuestName}
                guestPhone={guestPhone}
                setGuestPhone={setGuestPhone}
                changeStatus={changeStatus}
                getProgress={getProgress}
            />
        </Container>
    );
}

function Details({ temporary, guestName, setGuestName, guestPhone, setGuestPhone, changeStatus, error, getProgress }) {
    if (temporary) {
        return (
            <>
                <AddBox>
                    <TextField
                        type='text'
                        variant='outlined'
                        label='Nome'
                        sx={{ width: '65%' }}
                        value={guestName}
                        onChange={(event) => setGuestName(event.target.value)}
                        /*error={error.subject ? true : false}
                        helperText={error.subject}*/
                    />
                    <TextField
                        type='number'
                        variant='outlined'
                        label='Telefone'
                        sx={{ width: '30%' }}
                        value={guestPhone}
                        onChange={(event) => setGuestPhone(event.target.value)}
                        /*error={error.grade ? true : false}
                        helperText={error.grade}*/
                    />
                </AddBox>
                <SaveButton variant="contained" onClick={changeStatus}>
                    Salvar
                </SaveButton>
            </>
        );
    } else if (getProgress()) {
        return (
            <>
                <GuestInfo
                    id={0}
                    visitante={getProgress()}
                />
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

const AddBox = styled.div`
    width: 80%;
    display: flex;
    justify-content: space-between;
`;

const SaveButton = styled(Button)`
    background-color: #BF211E !important;
    font-size: 15;
    height: 30;
`;
