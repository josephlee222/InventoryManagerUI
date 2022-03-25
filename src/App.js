import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  theme,
  Container,
  Button,
} from '@chakra-ui/react';
import { FaKey, FaUser } from 'react-icons/fa';

import Navbar from './components/Navbar';
import FormInput from './components/FormInput';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Navbar/>
      <Container mt={"1rem"}>
        <Box borderRadius={"lg"} borderWidth="1px" width={{md: "500px", base: "100%"}}>
          <Text fontSize="xl" fontWeight={"bold"} m={"1rem"} w="100%">Login</Text>
          <FormInput placeholder="Username" title="Username" icon={<FaUser/>}/>
          <FormInput placeholder="Password" title="Password" type="password" icon={<FaKey/>}/>
          <Box m={"1rem"}>
            <Button mr="0.5rem">Login</Button>
            <Button variant={"ghost"}>Register</Button>
          </Box>
        </Box>
      </Container>
    </ChakraProvider>
  );
}

export default App;
