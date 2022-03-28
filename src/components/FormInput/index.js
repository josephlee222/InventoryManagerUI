import { Text, InputGroup, InputLeftElement, Input, Box } from "@chakra-ui/react";

export default function FormInput(props) {
    var title = props.title
    var placeholder = props.placeholder
    var icon = props.icon
    var type = props.type
    var isDisabled = props.isDisabled
    var name = props.name
    var onChange = props.onChange

    return (
        <Box mb="1rem">
            <Text fontWeight={"bold"} mb="0.5rem">{title}</Text>
            <InputGroup>
                <InputLeftElement pointerEvents={"none"} children={icon}/>
                <Input name={name} placeholder={placeholder} type={type} onChange={onChange} isDisabled={isDisabled}></Input>
            </InputGroup>
        </Box>
    )
}