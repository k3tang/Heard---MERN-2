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
  Text,
  CheckboxGroup
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import React from 'react'
import {useHistory, useParams} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { getCurrentUser, _getCurrentUser } from '../../../store/session'
import {fetchChatsbyUser, getAllChats, getCurrentChat, receiveCurrentChat} from '../../../store/chat'
// import io from 'socket.io-client';
// let socket,
// const serverUrl = "http://localhost:5000";

function MyTopicsDrawer({topics}) {



//    useEffect(() => {
//     socket = io(serverUrl);

//     socket.on('receiveGreet', (data) => {
//       console.log('data::', data);
//     });
//   }, []);

//     return () => {
//     socket.disconnect();
//     socket.off();
//   };
// };

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
 
   console.log('topics', topics)
useEffect(()=>{
   if(currentUser) dispatch(fetchChatsbyUser(currentUser._id))
  },[currentUser])

  const moveChats=(chatId)=>{
    console.log('what are the chats', chats)
    const chat = chats.find(chat => chat?._id === chatId)
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
              borderRadius={"3px"}
            >
              <Stack>
                {chats?.map((chat) => {
                  {
                    console.log("WHAT ARE THE CHATS??", chats);
                  }

                  return (
                    <Box
                      key={chat?._id}
                      onClick={() => moveChats(chat?._id)}
                      cursor="pointer"
                      bg={chatId === chat?._id ? "blue" : "white"}
                      color={chatId === chat?._id ? "white" : "blue"}
                      px={3}
                      py={2}
                    >
                      <Text> {chat?.title}</Text>
                    </Box>
                  );
                })}
              </Stack>

              <Stack>
                <Text>My Chat Requests:</Text>
                {topics
                  ?.filter((topic) => topic.userId === currentUser?._id)
                  .map((topic) => {
                    return (
                      <Box
                        key={topic?._id}
                        // onClick={()=> moveChats(chat?._id)}

                        bg="white"
                        color="#6C6D6F"
                        px={2.5}
                        py={2}
                      >
                        <Text> {topic.title}</Text>
                      </Box>
                    );
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