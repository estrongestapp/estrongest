import styled from 'styled-components';
import { useContext } from 'react';
import moment from 'moment';

import InformationContext from '../../../../contexts/InformationContext';

import AddPages from './AddPages';
import WeekProgress from './WeekProgress';

export default function Reading() {
    const { information, changeInformation } = useContext(InformationContext);
    const week = moment().utc(true).week();

    function addPages(pages) {
        const leituraProgress = information?.intelectual?.leitura || {};
        const pagesBefore = leituraProgress[week] || 0;
        leituraProgress[week] = pagesBefore + Number(pages);
        
        changeInformation({
            ...information,
            intelectual: {
                ...information?.intelectual,
                leitura: leituraProgress,
            },
        });
    }

    function getProgress() {
        const leitura = information?.intelectual?.leitura || {};
        return `${week}` in leitura ? leitura[week] : 0;
    }

    return (
        <Container>
            <AddPages progress={getProgress()} addPages={addPages} />
            <WeekProgress progress={getProgress()} />
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 50px;
`;
