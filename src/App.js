import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from "react-router-dom"
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';

import Navbar from './components/Navbar';
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import { getLocalUser } from './api/Auth';
import Place from './pages/place';

function App() {
  const [navbarState, setNavbarState] = useState("guest")
  const location = useLocation()

  useEffect(() => {
    checkAuthState()
  }, [location])

  function checkAuthState() {
    const user = getLocalUser()
    if (user) {
      if (user.admin === 1) {
        setNavbarState("admin")
      } else {
        setNavbarState("normal")
      }
    } else {
      setNavbarState("guest")
    }
  }

  return (
    <ChakraProvider theme={theme}>
      <Navbar type={navbarState}/>
      <div className="App">
        <Routes>
          <Route exact path="/" element={ <Home/> } />
          <Route exact path="dashboard" element={ <Dashboard/> } />
          <Route exact path="place/" element={ <Place/> }/>
          <Route exact path="place/:id" element={ <Place/> }/>
        </Routes>
      </div>
    </ChakraProvider>
  );
}

export default App;
