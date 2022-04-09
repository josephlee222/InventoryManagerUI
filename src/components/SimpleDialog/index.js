import {
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    Button,
} from '@chakra-ui/react'

function SimpleDialog(props) {
    const title = props.title
    const description = props.description
    const cancelText = props.cancelText ? props.cancelText : "Cancel"
    const confirmText = props.confirmText ? props.confirmText : "Okay"
    const confirmAction = props.confirmAction
    const isDanger = props.isDanger
    const isOpen = props.isOpen
    const onClose = props.onClose

    return (
        <>
            <AlertDialog isOpen={isOpen} onClose={onClose}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize={"lg"} fontWeight="bold">
                            {title}
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            {description}
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button onClick={onClose} mr='0.5rem'>{cancelText}</Button>
                            <Button color={isDanger ? "red" : "lightblue"}>{confirmText}</Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}

export default SimpleDialog