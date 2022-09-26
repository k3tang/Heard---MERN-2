import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Stack,
  Box,
  Text
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import React from 'react'
import {useHistory, useParams} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { getCurrentUser, _getCurrentUser } from '../../../store/session'

import { getAllTopics, fetchTopicsbyUser, deleteTopic } from '../../../store/topics'
import Modal2 from '../../ChatPages/modal2'
import Modal1 from "../../ChatPages/modal1";
import "./index.css"

function MyTopicsDrawer() {
  const {topicId} = useParams()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const history = useHistory()
  const dispatch = useDispatch()
  const [myTopics, setMyTopics] = useState();
  const currentUser = useSelector(_getCurrentUser)
  const topics = useSelector(getAllTopics)
  

    useEffect(() => {

       const myTopics = Object.values(topics).filter(
         (topic) => (topic.userId === currentUser._id)
       );
       setMyTopics(myTopics)

    }, [topics]);
 
   //
useEffect(()=>{
   if(currentUser) dispatch(fetchTopicsbyUser(currentUser._id))
  },[currentUser])

const moveTopics = (id) =>{

  history.push(`/topic/${id}`)
  
}

  return (
    <>
      <button ref={btnRef} className="chat-button" onClick={onOpen}>
        My Chats
      </button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>My Topics</DrawerHeader>

          <DrawerBody>
            <Box
              d="flex"
              flexDir="column"
              p={3}
              bg="#f6f6f6"
              w="100%"
              h="100%"
              overflowY="hidden"
              borderRadius='1vw'
              fontFamily="Lora"
            >
           
              <Stack>
                 {  myTopics?.map(topic => {
                 
             return <Box><Box
                  key={topic._id}
                onClick={()=> moveTopics(topic?._id)}
                cursor="pointer"
                bg={topicId === topic?._id ? 'lightgray' : 'white' }
                color={topicId === topic?._id ? 'white' : 'slategray' }
                borderRadius="1vw"
                px={3}
                py={2}
              
                > 
                <Text> {topic?.title}</Text>
                </Box>
                {topic && <Modal1 topic={topic}/> }
                <Modal2 topic={topic}/>
                </Box>
                 })}
                           
              </Stack> 
                  
            </Box>
          </DrawerBody>

          <DrawerFooter>
            <Button
              colorScheme="gray"
              textTransform="uppercase"
              boxShadow={
                "-1px -1px 7px #F5F5F5, -5px -4px 17px #FFFFFF, 1px 2px 5px #A0B0C5, 4px 6px 22px #C0CAD8;"
              }
              onClick={() => history.push("/topic-create")}
            >
              New Topic
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default MyTopicsDrawer