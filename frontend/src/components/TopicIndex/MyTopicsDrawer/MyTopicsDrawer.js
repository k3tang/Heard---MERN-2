import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
  Box,
  Text
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import React from 'react'
import {useHistory} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { getCurrentUser, _getCurrentUser } from '../../../store/session'
import {fetchChatsbyUser, getAllChats, getCurrentChat} from '../../../store/chat'


function MyTopicsDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const history = useHistory()
  const dispatch = useDispatch()
    const [user, setUser] = useState()
    const [userChats, setUserChats] = useState();
  const currentUser = useSelector(_getCurrentUser)
  

    const currentChat = useSelector(getCurrentChat)
  
    const [selectedChat, setSelectedChat] = useState();
    
    const storeChats = useSelector(getAllChats)
  
    
    useEffect(()=>{
        setUser(currentUser)
        setUserChats(storeChats)
      },[currentUser, storeChats])

  // useEffect(()=>{
  // setSelectedChat(currentChat)
  // },[currentChat])
 //
   //
useEffect(()=>{

   if(currentUser) dispatch(fetchChatsbyUser(currentUser._id))
  },[currentUser])

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
              bg="pink"
              w="100%"
              h="100%"
              overflowY="hidden"
            >
              {/* array ? (
              <Stack>
              [TBDARRAY].map((chat) => (
                <Box
                onClick={()=> moveChats(chat.id)}
                cursor="pointer"
                bg={selectedChat === chat ? 'blue' : 'white' }
                color={selectedChat === chat ? 'white' : 'blue' }
                px={3}
                py{2}
                > 
                <Text> {chat.title}</Text>

                </Box>
              )) 
              </Stack
          ): <></>
          */}
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