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
import { useDispatch, useSelector } from "react-redux";
import { useDisclosure } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { editTopic } from "../../store/topics";

import { _getCurrentUser } from "../../store/session";

function FlagModal({ topic }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { topicId } = useParams();
  const dispatch = useDispatch();
  const currentUser = useSelector(_getCurrentUser)

  const flagThread = (e) => {

    let updatedTopic = {...topic};
    updatedTopic.flagged.isFlagged = true;
    updatedTopic.flagged['flaggedBy'] = currentUser._id

    dispatch(editTopic(updatedTopic));
    onClose();
  };
  return (
    <>
      <Button size="xs" textTransform={"uppercase"} cursor="pointer" onClick={onOpen}>
        Report Topic
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader paddingTop={"5vw"}>Are you sure you want to flag this thread?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
   
         
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" textTransform={"uppercase"} mr={3} onClick={onClose}>
             No, It's Ok
            </Button>
            <Button colorScheme="red" textTransform={"uppercase"} onClick={(e) => flagThread(e)}>
              Flag Thread
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export default FlagModal;
