// Navbar component

import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Box, Flex, Text, Button, IconButton, useDisclosure, HStack } from "@chakra-ui/react";
import { ColorModeSwitcher } from '../ColorModeSwitcher';


function Navbar(props) {
    var isLoggedIn = props.isLoggedIn
    var isAdmin = props.isAdmin

    var navbarItems = isAdmin ? ["Home", "Profile", "Settings", "Admin"] : ["Home", "Profile", "Settings"]
    console.log(navbarItems)
    const {isOpen, onOpen, onClose} = useDisclosure()

    return (
        <>
        <Box>
            <Flex m={"1rem"} alignItems="center">
                <IconButton aria-label="Toggle mobile navigation" icon={isOpen ? <CloseIcon /> : <HamburgerIcon />} display={{md: "none"}} size={"md"}/>
                <Box ml={{md: "0", base: "1rem"}} flexGrow={{md: "initial", base: "1"}}>InventoryManager</Box>
                <HStack ml={"1rem"} display={{md: "initial", base: "none"}} flexGrow={1}>
                    {navbarItems.map(item => <Button variant={"ghost"}>{item}</Button>)}
                </HStack>
                <ColorModeSwitcher/>
            </Flex>
        </Box>
        </>
    )
}

export default Navbar