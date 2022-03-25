import { Text, InputGroup, InputLeftElement, Input, Box } from "@chakra-ui/react";

export default function FormInput(props) {
    var title = props.title
    var placeholder = props.placeholder
    var icon = props.icon
    var type = props.type

    return (
        <Box mx={"1rem"} mb="1rem">
            <Text fontWeight={"bold"} type={type} mb="0.5rem">{title}</Text>
            <InputGroup>
                <InputLeftElement pointerEvents={"none"} children={icon}/>
                <Input placeholder={placeholder}></Input>
            </InputGroup>
        </Box>
    )
}