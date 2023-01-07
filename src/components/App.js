import { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import InformationContext from '../contexts/InformationContext';

import Dashboard from './Dashboard';
import Physical from './Dashboard/Physical';
import Mental from './Dashboard/Mental';
import Emotional from './Dashboard/Emotional';
import Spiritual from './Dashboard/Spiritual';
import ChangePassword from './ChangePassword';

export default function App() {
  const [information, setInformation] = useState(JSON.parse(localStorage.getItem('info')));

  function changeInformation(newInformation) {
    setInformation(newInformation);
    localStorage.setItem('info', JSON.stringify(newInformation));
    localStorage.setItem('legacyInfo', JSON.stringify(newInformation));
  }

  return (
    <BrowserRouter>
      <InformationContext.Provider value={{ information, changeInformation }}>
        <Routes>
          <Route path='/' element={<Dashboard />}>
            <Route path='fisico' element={<Physical />} />
            <Route path='intelectual' element={<Mental />} />
            <Route path='emocional' element={<Emotional />} />
            <Route path='espiritual' element={<Spiritual />} />
          </Route>
          <Route path='senha' element={<ChangePassword />} />
        </Routes>
      </InformationContext.Provider>
    </BrowserRouter>
  );
}
