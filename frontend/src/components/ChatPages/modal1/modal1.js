import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input

} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useDisclosure } from "@chakra-ui/react";
import { useParams} from 'react-router-dom'
import {editTopic} from '../../../store/topics'
import {useState} from 'react'
import "../ChatBox/chatbox.css"

function Modal1({topic}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {topicId} = useParams()
const dispatch = useDispatch();

const [title, setTitle] = useState(topic.title)
const [mood, setMood] = useState(topic.mood)

const saveTitle = (e) =>{
  let updatedTopic = {...topic}
  updatedTopic.title = title;
  updatedTopic.mood = mood;

  dispatch(editTopic(updatedTopic))
  
  onClose();
}
  return (
    <>
      <Button 
      size="xs" 
      textTransform={"uppercase"}
      onClick={onOpen}>
        Edit
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>

              <Input value={title} onChange={(e) => setTitle(e.target.value)}></Input>
              <select
                className="edit-topic-dropdown"
                name="mood"
                id="mood"
                value={mood}
                onChange={(e) => setMood(e.target.value)}
              >
                <option value="angry">Angry</option>
                <option value="loved">Loved</option>
                <option value="anxious">Anxious</option>
                <option value="happy">Happy</option>
                <option value="sad">Sad</option>
              </select>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" textTransform={"uppercase"} mr={3} onClick={onClose}>
              Discard Changes
            </Button>
            <Button colorScheme="gray" textTransform={"uppercase"} onClick={(e) => saveTitle(e)}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export default Modal1;
