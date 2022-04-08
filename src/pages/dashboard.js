import React, { useState } from 'react';

import {
    Box,
    Text,
    Flex,
    SimpleGrid,
    Skeleton,
    InputGroup,
    InputLeftElement,
    Input,
    Menu,
    MenuButton,
    IconButton,
    MenuList,
    MenuItem,
    Button,
} from '@chakra-ui/react';
import { Navigate, useNavigate } from 'react-router-dom';
import { getLocalUser } from '../api/Auth';
import { getPlaces } from '../api/Place';
import { SearchIcon } from '@chakra-ui/icons';
import { FaEllipsisV } from 'react-icons/fa';

function Dashboard() {
    const [places, setPlaces] = useState(null)
    const [search, setSearch] = useState("")
    const navigate = useNavigate()

    function handleSearchInput(input) {
        setSearch(input)
    }

    if (!getLocalUser()) {
        return <Navigate to={"/"}/>
    }

    if (!places) {
        console.log("A")
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
    }

    document.title = "Dashboard - InventoryManager"
    
    return (
        <Box mx={{base: "1rem", md: "5%"}}>
            <Text fontSize="4xl" fontWeight={"bold"} mb={"1rem"}>Dashboard</Text>
            <Box mb="1rem">
                <InputGroup>
                    <InputLeftElement pointerEvents={"none"} children={<SearchIcon/>}/>
                    <Input placeholder={"Search for places"} onChange={(event) => {handleSearchInput(event.target.value)}} isDisabled={!places}/>
                </InputGroup>
            </Box>
            <SimpleGrid columns={{base: 1, md: 2, xl: 4}} spacing='1rem'>
                {!places && <Skeleton h={"256px"} w={"100%"}/>}
                {!places && <Skeleton h={"256px"} w={"100%"}/>}
                {!places && <Skeleton h={"256px"} w={"100%"}/>}
                {!places && <Skeleton h={"256px"} w={"100%"}/>}
                {places && places.map(item => {
                    return (
                        <Box borderRadius={"lg"} borderWidth="1px" width={"100%"} height={"256px"} p={"1rem"}>
                            <Flex flexDir={"column"} w="100%" h="100%">
                                <Text fontSize="xl" fontWeight={"bold"} mb={"1rem"} w="100%">{item.name}</Text>
                                <Text flexGrow={"1"}>{item.description}</Text>
                                <Flex>
                                    <Button flexGrow={"1"} onClick={() => {navigate("../place/" + item.id)}} mr="0.5rem">View Place</Button>
                                    <Menu>
                                        <MenuButton as={IconButton} icon={<FaEllipsisV/>}/>
                                        <MenuList>
                                            <MenuItem key={"editPlace"}>Edit</MenuItem>
                                            <MenuItem color={'red'} key={"deletePlace"}>Delete</MenuItem>
                                        </MenuList>
                                    </Menu>
                                </Flex>
                            </Flex>
                        </Box>
                    )
                })}
            </SimpleGrid>
        </Box>
    )
}

export default Dashboard