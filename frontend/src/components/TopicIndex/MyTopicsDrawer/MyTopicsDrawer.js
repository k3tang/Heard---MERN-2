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
import {fetchChatsbyUser, getAllChats, getCurrentChat, receiveCurrentChat} from '../../../store/chat'


function MyTopicsDrawer() {
  const {chatId} = useParams()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const history = useHistory()
  const dispatch = useDispatch()

  const currentUser = useSelector(_getCurrentUser)
  
  const currentChat = useSelector((state)=>getCurrentChat(state))
  
  
   const chats = useSelector((state)=>getAllChats(state))
  

    useEffect(() => {
      dispatch(getCurrentUser());
    }, []);
 
   //
useEffect(()=>{
   if(currentUser) dispatch(fetchChatsbyUser(currentUser._id))
  },[currentUser])

  const moveChats=(chatId)=>{
    const chat = chats.find(chat => chat._id === chatId)
    console.log('what is',chat)
    dispatch(receiveCurrentChat(chat));
     history.push(`/chats/${chatId}`)
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
                 {  chats?.map(chat => {
                 
             return <Box
                  key={chat._id}
                onClick={()=> moveChats(chat?._id)}
                cursor="pointer"
                bg={chatId === chat?._id ? 'blue' : 'white' }
                color={chatId === chat?._id ? 'white' : 'blue' }
                px={3}
                py={2}
                > 
                <Text> {chat?.title}</Text>
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
              New Topic Request
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default MyTopicsDrawer