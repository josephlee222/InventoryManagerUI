import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Container,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import Navbar from './components/navbar';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Navbar/>
    </ChakraProvider>
  );
}

export default App;
