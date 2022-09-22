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
    const [user, setUser] = useState()
    const [userChats, setUserChats] = useState();
  const currentUser = useSelector(_getCurrentUser)
  

    const currentChat = useSelector((state)=>getCurrentChat(state))
  
    const [selectedChat, setSelectedChat] = useState();
    
    const storeChats = useSelector((state)=>getAllChats(state))
  
    
    useEffect(()=>{
        setUser(currentUser)
        setUserChats(Object.values(storeChats))
      },[currentUser, storeChats])

  useEffect(()=>{
  setSelectedChat(currentChat)
   setUserChats(Object.values(storeChats));
  },[currentChat])
 
   //
useEffect(()=>{
   if(currentUser) dispatch(fetchChatsbyUser(currentUser._id))
  },[currentUser,chatId])

  const moveChats=(chatId)=>{
    setSelectedChat(storeChats[chatId])
    dispatch(receiveCurrentChat(storeChats[chatId]));
     history.push(`/chats/${chatId}`)

  }
  console.log('storechats', storeChats, userChats)

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
                 {  userChats?.map(chat => {
                 
             return <Box
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