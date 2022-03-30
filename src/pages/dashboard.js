import React, { useState } from 'react';

import {
    Box,
    Text,
    SimpleGrid,
    Skeleton,
    InputGroup,
    InputLeftElement,
    Input,
} from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';
import { getLocalUser } from '../api/Auth';
import { getPlaces } from '../api/Places';
import { SearchIcon } from '@chakra-ui/icons';

function Dashboard() {
    const [places, setPlaces] = useState(null)
    const [search, setSearch] = useState("")

    function handleSearchInput(input) {
        setSearch(input)
    }

    if (!getLocalUser()) {
        return <Navigate to={"/"}/>
    }

    getPlaces().then(
        (data) => {
            setPlaces(data.result)
        }
    ).catch(
        (error) => {
            if (error.response.status === 401) {
                return <Navigate to={"/"}/>
            } else {
                alert("Unknown error " + error.response.status)
            }
        }
    )

    return (
        <Box mx={{base: "1rem", md: "5%"}}>
            <Text fontSize="4xl" fontWeight={"bold"} mb={"1rem"}>Dashboard</Text>
            <Box mb="1rem">
                <InputGroup>
                    <InputLeftElement pointerEvents={"none"} children={<SearchIcon/>}/>
                    <Input placeholder={"Search for places"} onChange={(event) => {handleSearchInput(event.target.value)}} isDisabled={!places}/>
                </InputGroup>
            </Box>
            <SimpleGrid columns={[1, null, 4]} spacing='1rem'>
                {!places && <Skeleton h={"256px"} w={"100%"}/>}
                {!places && <Skeleton h={"256px"} w={"100%"}/>}
                {!places && <Skeleton h={"256px"} w={"100%"}/>}
                {!places && <Skeleton h={"256px"} w={"100%"}/>}
                {places && places.map(item => {
                    return (
                        <Box borderRadius={"lg"} borderWidth="1px" width={"100%"} height={"256px"} p={"1rem"}>
                            <Text fontSize="xl" fontWeight={"bold"} mb={"1rem"} w="100%">{item.name}</Text>
                            <Text w="100%">{item.description}</Text>
                        </Box>
                    )
                })}
            </SimpleGrid>
        </Box>
    )
}

export default Dashboard