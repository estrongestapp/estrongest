import { useState } from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import TabPanel from '../TabPanel';
import Estrongest from './Estrongest';
import Church from './Church';
import Homework from './Homework';

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function Spiritual() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label='Estrongest' {...a11yProps(0)} />
                    <Tab label='Igreja' {...a11yProps(1)} />
                    <Tab label='Tarefa' {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Estrongest />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Church />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Homework />
            </TabPanel>
        </Box>
    );
}
