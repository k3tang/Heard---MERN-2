export const getSender = (currentUser, users) =>{
  return users[0].id === currentUser.id ?  users[1].name : users[0].name
}