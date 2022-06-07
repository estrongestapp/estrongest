import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import './styles.css';

import {
    BottomNavigation,
    BottomNavigationAction
} from '@mui/material';
import {
    FitnessCenter,
    Book,
    Favorite,
    Church
} from '@mui/icons-material';

export default function Footer() {
    const [value, setValue] = useState(useLocation().pathname.substring(1))
    const navigate = useNavigate();

    const handleChange = (event, newValue) => {
        setValue(newValue);
        navigate(newValue);
    };

    return (
        <Container>
            <BottomNavigation value={value} onChange={handleChange}>
                <BottomNavigationAction
                    label='Físico'
                    value='fisico'
                    icon={<FitnessCenter />}
                />
                <BottomNavigationAction
                    label='Intelectual'
                    value='intelectual'
                    icon={<Book />}
                />
                <BottomNavigationAction
                    label='Emocional'
                    value='emocional'
                    icon={<Favorite />}
                />
                <BottomNavigationAction
                    label='Espiritual'
                    value='espiritual'
                    icon={<Church />}
                />
            </BottomNavigation>
        </Container>
    );
}

const Container = styled.footer`
    width: 100vw;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1;
`;
