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

function Modal1({topic}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {topicId} = useParams()
const dispatch = useDispatch();

const [title, setTitle] = useState(topic.title)
// const [mood, setMood] = useState(topic.mood)

const saveTitle = (e) =>{
  let updatedTopic = topic
  updatedTopic.title = title
  dispatch(editTopic(updatedTopic))
  
  onClose();
}
  return (
    <>
      <Button size="xs" onClick={onOpen}>
        Edit
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* <form> */}
              <Input onChange={(e) => setTitle(e.target.value)}></Input>
              {/* <select
                className="confession-mood-dropdown"
                name="mood"
                id="mood"
                value={mood}
                onChange={setMood(mood)}
              >
                <option defaultValue value={topic.mood}>
                  {" "}
                  I'm feeling...
                </option>
                <option value="angry">Angry</option>
                <option value="loved">Loved</option>
                <option value="anxious">Anxious</option>
                <option value="happy">Happy</option>
                <option value="sad">Sad</option>
              </select>
            </form> */}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Discard Changes
            </Button>
            <Button variant="ghost" onClick={(e) => saveTitle(e)}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export default Modal1;
