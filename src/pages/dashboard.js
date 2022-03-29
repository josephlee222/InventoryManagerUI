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
    SimpleGrid,
    Skeleton,
} from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';

function Dashboard() {
    const [loading, setLoading] = useState(true)

    if (localStorage.getItem("user") === null) {
        return <Navigate to={'/'}/>
    }

    

    return (
        <Box mx={{base: "1rem", md: "5%"}}>
            <Text fontSize="4xl" fontWeight={"bold"} mb={"1rem"}>Dashboard</Text>
            <SimpleGrid columns={[1, null, 4]} spacing='1rem'>
                {loading && <Skeleton h={"256px"} w={"100%"}/>}
                {loading && <Skeleton h={"256px"} w={"100%"}/>}
                {loading && <Skeleton h={"256px"} w={"100%"}/>}
                {loading && <Skeleton h={"256px"} w={"100%"}/>}
            </SimpleGrid>
        </Box>
    )
}

export default Dashboard