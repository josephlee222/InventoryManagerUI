import { FaAngleLeft, FaEllipsisV } from 'react-icons/fa'
import { 
    Box, 
    Text, 
    Flex, 
    IconButton, 
    Grid, 
    GridItem, 
    Skeleton, 
    SkeletonText, 
    Button, 
    MenuButton, 
    MenuList, 
    MenuItem, 
    Menu, 
    useDisclosure} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getLocalUser } from '../api/Auth';
import { getMachine } from '../api/Machine';
import { getParts } from '../api/Part';
import SimpleDialog from '../components/SimpleDialog';

function Machine() {
    const { id } = useParams()
    const [ machine , setMachine ] = useState(false)
    const [ parts, setParts ] = useState(false)
    const navigate = useNavigate()
    const { onOpen, onClose, isOpen } = useDisclosure()

    if (!getLocalUser()) {
        return <Navigate to={"/"}/>
    }

    if (!id) {
        alert("Invaild machine ID")
    }

    if (!machine) {
        getMachine(id).then(
            (data) => {
                setMachine(data.result[0])
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

    if (!parts) {
        getParts(id).then(
            (data) => {
                setParts(data.result)
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

    document.title =  machine.name + " - InventoryManager"

    return (
        <Box mx={{base: "1rem", md: "5%"}}>
            <Flex mb={"1rem"} alignItems="center">
                <IconButton icon={<FaAngleLeft/>} size="lg" mr="1rem" onClick={() => {navigate(-1)}}/>
                <Text fontSize="4xl" fontWeight={"bold"}>Machine</Text>
            </Flex>
            <Grid gap={4} templateColumns={{base: "repeat(1, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)"}}>
                <GridItem colSpan={1}>
                    <Box borderRadius={"lg"} borderWidth="1px" width={"100%"} p={"1rem"}>
                        {/* Skeleton elements */}
                        <Skeleton isLoaded={machine} mb="0.5rem">
                            <Text fontWeight={"bold"} fontSize={"xl"} w="100%">{machine && machine.name}</Text>
                        </Skeleton>
                        <SkeletonText isLoaded={machine} noOfLines={4}>
                            <Text>{machine && machine.description}</Text>
                        </SkeletonText>
                    </Box>
                </GridItem>
                <GridItem colSpan={{base: 1, md: 2, lg: 3}}>
                    {!parts && <Skeleton h={"96px"} w={"100%"} mb="1rem"/>}
                    {!parts && <Skeleton h={"96px"} w={"100%"} mb="1rem"/>}
                    {!parts && <Skeleton h={"96px"} w={"100%"} mb="1rem"/>}
                    {!parts && <Skeleton h={"96px"} w={"100%"} mb="1rem"/>}
                    {parts && parts.map(item => {
                        return (
                            <Box borderRadius={"lg"} borderWidth="1px" width={"100%"} height={"96px"} p={"1rem"} mb="0.5rem">
                                <Flex alignItems={"center"} h="100%">
                                    <Box flexGrow={1}>
                                        <Text fontWeight={"bold"}>{item.name}</Text>
                                        <Text color={item.days_until_best_before < 1 ? "red" : ""}>
                                            Part | {item.days_until_best_before < 1 ? "Part Expired" : "Expires on " + item.best_before_date}
                                        </Text>
                                    </Box>
                                    <Box>
                                        <Button mr={"0.5rem"} onClick={onOpen}>Renew</Button>
                                        <Menu>
                                            <MenuButton as={IconButton} icon={<FaEllipsisV/>}/>
                                            <MenuList>
                                                <MenuItem key={"viewPartTemplate"}>View Part Template</MenuItem>
                                                <MenuItem key={"editPart"}>Edit</MenuItem>
                                                <MenuItem color={'red'} key={"deletePart"}>Delete</MenuItem>
                                            </MenuList>
                                        </Menu>
                                    </Box>
                                </Flex>
                            </Box>
                        )
                    })}
                    {parts.length === 0 && <Text w={"100%"} fontWeight="bold" textAlign="center">No parts inside</Text>}
                </GridItem>
            </Grid>
            <SimpleDialog title="Renew part?" description="Renew the part and reset the expiry date?" isOpen={isOpen} onClose={onClose} confirmText="Renew"/>
        </Box>
    )
}

export default Machine