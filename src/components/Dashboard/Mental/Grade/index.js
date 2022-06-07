import styled from 'styled-components';
import { useContext } from 'react';

import InformationContext from '../../../../contexts/InformationContext';

import {
    Typography,
    FormControlLabel,
    RadioGroup,
    Radio,
    Button,
} from '@mui/material';

import AddSubjects from './AddSubjects';

export default function Grade() {
    const { information, changeInformation } = useContext(InformationContext);

    function changeStatus(status) {
        changeInformation({
            ...information,
            intelectual: {
                ...information?.intelectual,
                notas: status === 'yes',
            },
        });
    }

    return (
        <Container>
            <Title>
                Você tirou nota baixa essa semana?
            </Title>
            <RadioGroup
                row
                /*value={lowGrade}*/
                onChange={(event) => changeStatus(event.target.value)}
                sx={{ justifyContent: 'center' }}
            >
                <FormControlLabel value='yes' control={<Radio />} label='Sim' checked={information?.intelectual?.notas === true} />
                <FormControlLabel value='no' control={<Radio />} label='Não' checked={information?.intelectual?.notas === false} />
            </RadioGroup>
            {/*lowGrade === 'yes' && <AddSubjects subjects={subjects} setSubjects={setSubjects} />*/}
        </Container>
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
