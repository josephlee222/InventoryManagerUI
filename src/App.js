import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from "react-router-dom"
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';

import Navbar from './components/Navbar';
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import { getLocalUser } from './api/Auth';

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
          <Route path="/" element={ <Home/> } />
          <Route path="dashboard" element={ <Dashboard/> } />
        </Routes>
      </div>
    </ChakraProvider>
  );
}

export default App;
