import { useState } from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import TabPanel from '../TabPanel';
import Exercise from './Exercise';
import Feeding from './Feeding';
import ColdShower from './Shower';

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function Physical() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label='Exercício' {...a11yProps(0)} />
                    <Tab label='Alimentação' {...a11yProps(1)} />
                    <Tab label='Banho' {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Exercise />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Feeding />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <ColdShower />
            </TabPanel>
        </Box>
    );
}
