import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import React from 'react'
import {useHistory} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { getCurrentUser } from '../../../store/session'
import {fetchChatsbyUser} from '../../../store/chat'


function MyTopicsDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const history = useHistory()
  const dispatch = useDispatch()
    const [user, setUser] = useState()
    const [userChats, setUserChats] = useState();
  const currentUser = useSelector((state)=>{
        if (!state) return null;
        else if (!state.session?.user) return null;
        else return state.session.user
  })

   const storeChats = useSelector((state)=>{
        if (!state) return null;
        else if (!state.chats) return null;
        else return state.chats
  })

useEffect(()=>{
    // dispatch(getCurrentUser())
    console.log('curent user', currentUser)
   if(currentUser) dispatch(fetchChatsbyUser(currentUser._id))
  },[currentUser])

useEffect(()=>{
    setUser(currentUser)
    setUserChats(storeChats)
  },[currentUser, storeChats])

  return (
    <>
      <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
        My Chats
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>My Topics</DrawerHeader>

          <DrawerBody>
            
          </DrawerBody>

          <DrawerFooter>
       
            <Button colorScheme='blue' onClick={()=> history.push("/topic-create")}>New Topic Request</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default MyTopicsDrawer