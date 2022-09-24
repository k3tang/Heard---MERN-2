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

import { getAllTopics } from '../../../store/topics'
import Modal2 from '../../ChatPages/modal2'
import Modal1 from "../../ChatPages/modal1";

function MyTopicsDrawer() {
  const {topicId} = useParams()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const history = useHistory()
  const dispatch = useDispatch()
  const [myTopics, setMyTopics] = useState();
  const currentUser = useSelector(_getCurrentUser)
  const topics = useSelector(getAllTopics())
  

    useEffect(() => {
      dispatch(getCurrentUser());
       const myTopics = Object.values(topics).filter(
         (topic) => (topic.userId = currentUser._id)
       );
       setMyTopics(myTopics)

    }, []);
 
   //
useEffect(()=>{
   if(currentUser) dispatch(fetchTopicsbyUser(currentUser._id))
  },[currentUser])

const moveTopics = (id) =>{
  history.push(`/topics/${id}`)
  
}

  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        My Chats
      </Button>
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
              borderRadius={'3px'}
            >
           
              <Stack>
                 {  myTopics?.map(topic => {
                 
             return <Box
                  key={topic._id}
                onClick={()=> moveTopics(topic?._id)}
                cursor="pointer"
                bg={topicId === topic?._id ? 'blue' : 'white' }
                color={topicId === topic?._id ? 'white' : 'blue' }
                px={3}
                py={2}
              
                > 
                <Text> {topic?.title}</Text>
                {topic && <Modal1 topic={topic}/> }
                <Modal2/>
                </Box>
                 })}
                           
              </Stack> 
                  
            </Box>
          </DrawerBody>

          <DrawerFooter>
            <Button
              colorScheme="blue"
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