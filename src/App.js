import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  theme,
  Container,
  Button,
  Progress,
} from '@chakra-ui/react';
import { FaKey, FaUser } from 'react-icons/fa';

import Navbar from './components/Navbar';
import FormInput from './components/FormInput';
import { loginUser } from './api/Auth';

function App() {

  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  function handleUsernameChange(input) {
    setUsername(input)
  }

  function handlePasswordChange(input) {
    setPassword(input)
  }

  function login() {
    setLoading(true)

    loginUser(username, password).then(
      data => {
        if (data.status == 200) {
          // Login success
          setLoading(false)
        } else if (data.status == 401) {
          // Incorrect username or password
          setLoading(false)
        }
      }
    )
    
  }

  return (
    <ChakraProvider theme={theme}>
      <Navbar/>
      <Container mt={"1rem"}>
        <Box borderRadius={"lg"} borderWidth="1px" width={{md: "500px", base: "100%"}} p={"1rem"}>
          <form>
            <Text fontSize="xl" fontWeight={"bold"} mb={"1rem"} w="100%">Login</Text>
            <FormInput onChange={(event) => {handleUsernameChange(event.target.value)}} isDisabled={loading} placeholder="Username" title="Username" icon={<FaUser/>}/>
            <FormInput onChange={(event) => {handlePasswordChange(event.target.value)}} isDisabled={loading} placeholder="Password" title="Password" type="password" icon={<FaKey/>}/>
            {loading && <Progress mb={'1rem'} isIndeterminate/>}
            <Box>
              <Button mr="0.5rem" onClick={login}>Login</Button>
              <Button variant={"ghost"}>Register</Button>
            </Box>
          </form>
          
        </Box>
      </Container>
    </ChakraProvider>
  );
}

export default App;
