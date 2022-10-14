import styled from 'styled-components';
import moment from 'moment';

import { Button } from '@mui/material';

export default function BlockedOnSunday({ children }) {
    const today = moment().utc(true);

    if (today.day() === 0) {
        return (
            <>
                <p>
                    Hoje é domingo! Volte amanhã para começar a preencher.
                </p>
                {/*<SendButton variant='contained' onClick={console.log('ui')}>
                    Enviar Pontos
                </SendButton>*/}
            </>
        );
    } else {
        return (
            <>
                {children}
            </>
        )
    }
}

const SendButton = styled(Button)`
    background-color: #BF211E !important;
    font-size: 15;
    height: 30;
    margin-top: 15px !important;
`;