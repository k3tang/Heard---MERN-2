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
import { deleteTopic } from "../../../store/topics";

function Modal2({topic}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

const dispatch = useDispatch();
const history = useHistory()
const leaveChat = (e) =>{

  dispatch(deleteTopic(topic._id))
  setTimeout(()=>{
    history.push("/topic-index")
  },1000)


}
  return (
    <>
      <Button size="xs" onClick={onOpen}>Delete Thread</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
   
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Keep Thread Open
            </Button>
            <Button variant="ghost" onClick={(e)=>leaveChat(e)}>I've been heard(delete)</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export default Modal2;
