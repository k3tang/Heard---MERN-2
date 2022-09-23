import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,

} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useDisclosure } from "@chakra-ui/react";
import { useParams, useHistory } from 'react-router-dom'
import { deleteChat } from "../../../store/chat";

function Modal2() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {chatId} = useParams()
const dispatch = useDispatch();
const history = useHistory()
const leaveChat = (e) =>{
  dispatch(deleteChat(chatId))
  setTimeout(()=>{
    history.push("/topic-index")
  },1000)


}
  return (
    <>
      <Button onClick={onOpen}>Leave Chat</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Hope you feel better</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
   
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              keep chatting?
            </Button>
            <Button variant="ghost" onClick={(e)=>leaveChat(e)}>I've been heard</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export default Modal2;
