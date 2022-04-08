import { FaAngleLeft, FaEllipsisV } from 'react-icons/fa'
import { Box, Text, Flex, IconButton, Grid, GridItem, Skeleton, SkeletonText, Button, MenuButton, MenuList, MenuItem, Menu } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getLocalUser } from '../api/Auth';
import { getPlace } from '../api/Place';
import { getAreas } from '../api/Area';

function Place() {
    const { id } = useParams()
    const [ place , setPlace ] = useState(false)
    const [ areas, setAreas ] = useState(false)
    const navigate = useNavigate()

    if (!getLocalUser()) {
        navigate("")
    }

    if (!id) {
        alert("Invaild place ID")
    }

    if (!place) {
        getPlace(id).then(
            (data) => {
                setPlace(data.result[0])
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

    if (!areas) {
        getAreas(id).then(
            (data) => {
                setAreas(data.result)
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

    return (
        <Box mx={{base: "1rem", md: "5%"}}>
            <Flex mb={"1rem"} alignItems="center">
                <IconButton icon={<FaAngleLeft/>} size="lg" mr="1rem" onClick={() => {navigate(-1)}}/>
                <Text fontSize="4xl" fontWeight={"bold"}>Place</Text>
            </Flex>
            <Grid gap={4} templateColumns={{base: "repeat(1, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)"}}>
                <GridItem colSpan={1}>
                    <Box borderRadius={"lg"} borderWidth="1px" width={"100%"} p={"1rem"}>
                        {/* Skeleton elements */}
                        <Skeleton isLoaded={place} mb="0.5rem">
                            <Text fontWeight={"bold"} fontSize={"xl"} w="100%">{place && place.name}</Text>
                        </Skeleton>
                        <SkeletonText isLoaded={place} noOfLines={4}>
                            <Text>{place && place.description}</Text>
                        </SkeletonText>
                    </Box>
                </GridItem>
                <GridItem colSpan={{base: 1, md: 2, lg: 3}}>
                    {!areas && <Skeleton h={"96px"} w={"100%"} mb="1rem"/>}
                    {!areas && <Skeleton h={"96px"} w={"100%"} mb="1rem"/>}
                    {!areas && <Skeleton h={"96px"} w={"100%"} mb="1rem"/>}
                    {!areas && <Skeleton h={"96px"} w={"100%"} mb="1rem"/>}
                    {areas && areas.map(item => {
                        return (
                            <Box borderRadius={"lg"} borderWidth="1px" width={"100%"} height={"96px"} p={"1rem"} mb="0.5rem">
                                <Flex alignItems={"center"} h="100%">
                                    <Box flexGrow={1}>
                                        <Text fontWeight={"bold"}>{item.name}</Text>
                                        <Text>Area (Placeholder)</Text>
                                    </Box>
                                    <Box>
                                        <Button mr={"0.5rem"}>View</Button>
                                        <Menu>
                                            <MenuButton as={IconButton} icon={<FaEllipsisV/>}/>
                                            <MenuList>
                                                <MenuItem key={"editArea"}>Edit</MenuItem>
                                                <MenuItem color={'red'} key={"deleteArea"}>Delete</MenuItem>
                                            </MenuList>
                                        </Menu>
                                    </Box>
                                </Flex>
                            </Box>
                        )
                    })}
                    {areas.length == 0 && <Text w={"100%"} fontWeight="bold" textAlign="center">No areas available</Text>}
                </GridItem>
            </Grid>
        </Box>
    )
}

export default Place