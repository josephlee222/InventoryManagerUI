// Navbar component

import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Box, Flex, Text, Button, IconButton, useDisclosure, HStack, VStack } from "@chakra-ui/react";
import { ColorModeSwitcher } from '../../ColorModeSwitcher';


export default function Navbar(props) {
    var type = props.type

    var navbarItems = type == "admin" ? ["Home", "Profile", "Settings", "Admin"] : type == "normal" ? ["Home", "Profile", "Settings"] : []
    const {isOpen, onOpen, onClose} = useDisclosure()

    return (
        <>
        <Box>
            <Flex m={"1rem"} alignItems="center">
                <IconButton aria-label="Toggle mobile navigation" onClick={isOpen ? onClose : onOpen} icon={isOpen ? <CloseIcon /> : <HamburgerIcon />} display={{md: "none"}} size={"md"}/>
                <Box ml={{md: "0", base: "1rem"}} flexGrow={{md: "initial", base: "1"}}>InventoryManager</Box>
                <HStack ml={"1rem"} display={{md: "initial", base: "none"}} flexGrow={1}>
                    {navbarItems.map(item => <Button variant={"ghost"}>{item}</Button>)}
                </HStack>
                <ColorModeSwitcher/>
            </Flex>
            <VStack align={"stretch"} display={{md: "none", base: isOpen ? "initial" : "none"}}>
                {navbarItems.map(item => <Button w={"100%"} borderRadius="0" variant={"ghost"}>{item}</Button>)}
            </VStack>
        </Box>
        </>
    )
}