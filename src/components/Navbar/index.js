// Navbar component

import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { 
    Box,
    Flex, 
    Button, 
    IconButton, 
    useDisclosure, 
    HStack, 
    VStack, 
    Avatar, 
    Menu, 
    MenuButton, 
    MenuList, 
    MenuItem, 
    MenuDivider 
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { getLocalUser, logoutUser } from "../../api/Auth";
import { ColorModeSwitcher } from '../../ColorModeSwitcher';


export default function Navbar(props) {
    const type = props.type
    const isLoggedIn = type == "admin" || type == "normal"

    const navbarItems = type == "admin" ? [["Home", "dashboard"], ["Profile", "profile"], ["Settings", "settings"], ["Admin", "admin"]] : type == "normal" ? [["Home", "dashboard"], ["Profile", "profile"], ["Settings", "settings"]] : []
    const {isOpen, onOpen, onClose} = useDisclosure()
    const user = isLoggedIn ? getLocalUser() : null
    const navigate = useNavigate()

    return (
        <>
        <Box>
            <Flex m={"1rem"} alignItems="center">
                <IconButton aria-label="Toggle mobile navigation" onClick={isOpen ? onClose : onOpen} icon={isOpen ? <CloseIcon /> : <HamburgerIcon />} display={{md: "none"}} size={"md"}/>
                <Box ml={{md: "0", base: "1rem"}} flexGrow={{md: "initial", base: "1"}}>InventoryManager</Box>
                <HStack ml={"1rem"} display={{md: "initial", base: "none"}} flexGrow={1}>
                    {navbarItems.map(item => <Button variant={"ghost"} onClick={() => {navigate(item[1])}}>{item[0]}</Button>)}
                </HStack>
                {isLoggedIn && 
                    <Menu>
                        <MenuButton>
                            <Avatar mr={"1rem"} size={"sm"} name={user.username}/>
                        </MenuButton>
                        <MenuList>
                            <MenuItem>Profile</MenuItem>
                            <MenuItem color={"red"} onClick={() => {logoutUser(); navigate("/")}}>Logout</MenuItem>
                            {type == "admin" && <>
                                <MenuDivider/>
                                <MenuItem>Admin Settings</MenuItem>
                            </>}
                        </MenuList>
                    </Menu>
                }
                <ColorModeSwitcher/>
            </Flex>
            <VStack align={"stretch"} display={{md: "none", base: isOpen ? "initial" : "none"}}>
                {navbarItems.map(item => <Button w={"100%"} borderRadius="0" variant={"ghost"} onClick={() => {navigate(item[1])}}>{item[0]}</Button>)}
            </VStack>
        </Box>
        </>
    )
}