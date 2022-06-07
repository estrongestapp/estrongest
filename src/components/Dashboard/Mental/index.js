import { useState } from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import TabPanel from '../TabPanel';
import Study from './Study';
import Reading from './Reading';
import Grade from './Grade';

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function Mental() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label='Estudo' {...a11yProps(0)} />
                    <Tab label='Leitura' {...a11yProps(1)} />
                    <Tab label='Nota' {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Study />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Reading />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Grade />
            </TabPanel>
        </Box>
    );
}