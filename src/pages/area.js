import { FaAngleLeft, FaEllipsisV } from 'react-icons/fa'
import { Box, Text, Flex, IconButton, Grid, GridItem, Skeleton, SkeletonText, Button, MenuButton, MenuList, MenuItem, Menu } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getLocalUser } from '../api/Auth';
import { getArea } from '../api/Area';
import { getMachines } from '../api/Machine';

function Area() {
    const { id } = useParams()
    const [ area , setArea ] = useState(false)
    const [ machines, setMachines ] = useState(false)
    const navigate = useNavigate()

    if (!getLocalUser()) {
        navigate("")
    }

    if (!id) {
        alert("Invaild area ID")
    }

    if (!area) {
        getArea(id).then(
            (data) => {
                setArea(data.result[0])
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

    if (!machines) {
        getMachines(id).then(
            (data) => {
                setMachines(data.result)
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

    document.title =  area.name + " - InventoryManager"

    return (
        <Box mx={{base: "1rem", md: "5%"}}>
            <Flex mb={"1rem"} alignItems="center">
                <IconButton icon={<FaAngleLeft/>} size="lg" mr="1rem" onClick={() => {navigate(-1)}}/>
                <Text fontSize="4xl" fontWeight={"bold"}>Area</Text>
            </Flex>
            <Grid gap={4} templateColumns={{base: "repeat(1, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)"}}>
                <GridItem colSpan={1}>
                    <Box borderRadius={"lg"} borderWidth="1px" width={"100%"} p={"1rem"}>
                        {/* Skeleton elements */}
                        <Skeleton isLoaded={area} mb="0.5rem">
                            <Text fontWeight={"bold"} fontSize={"xl"} w="100%">{area && area.name}</Text>
                        </Skeleton>
                        <SkeletonText isLoaded={area} noOfLines={4}>
                            <Text>{area && area.description}</Text>
                        </SkeletonText>
                    </Box>
                </GridItem>
                <GridItem colSpan={{base: 1, md: 2, lg: 3}}>
                    {!machines && <Skeleton h={"96px"} w={"100%"} mb="1rem"/>}
                    {!machines && <Skeleton h={"96px"} w={"100%"} mb="1rem"/>}
                    {!machines && <Skeleton h={"96px"} w={"100%"} mb="1rem"/>}
                    {!machines && <Skeleton h={"96px"} w={"100%"} mb="1rem"/>}
                    {machines && machines.map(item => {
                        return (
                            <Box borderRadius={"lg"} borderWidth="1px" width={"100%"} height={"96px"} p={"1rem"} mb="0.5rem">
                                <Flex alignItems={"center"} h="100%">
                                    <Box flexGrow={1}>
                                        <Text fontWeight={"bold"}>{item.name}</Text>
                                        <Text>Machine (Placeholder)</Text>
                                    </Box>
                                    <Box>
                                        <Button mr={"0.5rem"} onClick={() => navigate("../area/" + item.id)}>View</Button>
                                        <Menu>
                                            <MenuButton as={IconButton} icon={<FaEllipsisV/>}/>
                                            <MenuList>
                                                <MenuItem key={"editMachine"}>Edit</MenuItem>
                                                <MenuItem color={'red'} key={"deleteMachine"}>Delete</MenuItem>
                                            </MenuList>
                                        </Menu>
                                    </Box>
                                </Flex>
                            </Box>
                        )
                    })}
                    {machines.length == 0 && <Text w={"100%"} fontWeight="bold" textAlign="center">No machines available</Text>}
                </GridItem>
            </Grid>
        </Box>
    )
}

export default Area