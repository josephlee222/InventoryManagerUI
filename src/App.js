import React from 'react';
import { Routes, Route } from "react-router-dom"
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';

import Navbar from './components/Navbar';
import Home from './home';

function App() {

  return (
    <ChakraProvider theme={theme}>
      <Navbar/>
      <div className="App">
        <Routes>
          <Route path="/" element={ <Home/> } />
        </Routes>
      </div>
    </ChakraProvider>
  );
}

export default App;
