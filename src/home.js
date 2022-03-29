import React, { useState } from 'react';

import {
    ChakraProvider,
    Box,
    Text,
    theme,
    Container,
    Button,
    Progress,
    Alert,
    AlertIcon,
} from '@chakra-ui/react';
import FormInput from './components/FormInput';
import { FaKey, FaUser } from 'react-icons/fa';

import { loginUser } from './api/Auth';

function Home() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    function handleUsernameChange(input) {
        setUsername(input)
    }

    function handlePasswordChange(input) {
        setPassword(input)
    }

    function login() {
        if (username && password) {
        setLoading(true)
        setError(false)

        loginUser(username, password).then((data) => {
            if (data.status === 200) {
            // Successful login
            setLoading(false)
            localStorage.setItem("user", JSON.stringify(data.result))
            }
        }).catch((error) => {
            if (error.response.status === 401) {
            setLoading(false)
            setError("Incorrect username or password")
            } else {
            setLoading(false)
            setError("Unknown error occured")
            }
        })
        } else {
        setError("Username or password missing")
        }
    }

    return (
        <Container mt={"1rem"}>
        <Box borderRadius={"lg"} borderWidth="1px" width={{md: "500px", base: "100%"}} p={"1rem"}>
          <form>
            <Text fontSize="xl" fontWeight={"bold"} mb={"1rem"} w="100%">Login</Text>
            <FormInput onChange={(event) => {handleUsernameChange(event.target.value)}} isDisabled={loading} placeholder="Username" title="Username" icon={<FaUser/>}/>
            <FormInput onChange={(event) => {handlePasswordChange(event.target.value)}} isDisabled={loading} placeholder="Password" title="Password" type="password" icon={<FaKey/>}/>
            {loading && <Progress mb={"1rem"} isIndeterminate/>}
            {
              error &&
              <Alert status="error" variant={"subtle"} mb={"1rem"}>
                <AlertIcon/>
                {error}
              </Alert>
            }
            <Box>
              <Button mr="0.5rem" onClick={login}>Login</Button>
              <Button variant={"ghost"}>Register</Button>
            </Box>
          </form>
          
        </Box>
      </Container>
    )
}

export default Home