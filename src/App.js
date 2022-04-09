import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom"
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';

import Navbar from './components/Navbar';
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import Place from './pages/place';
import Area from './pages/area';
import Machine from './pages/machine';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
        <div className="App">
          <Routes>
            <Route exact path="/" element={ <Home/> } />
            <Route path="dashboard" element={ <Dashboard/> } />
            <Route path="/place/" element={ <Place/> }/>
            <Route path="/place/:id" element={ <Place/> }/>
            <Route path="/area/" element={ <Area/> }/>
            <Route path="/area/:id" element={ <Area/> }/>
            <Route path="/machine/" element={ <Machine/> }/>
            <Route path="/machine/:id" element={ <Machine/> }/>
          </Routes>
        </div>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
