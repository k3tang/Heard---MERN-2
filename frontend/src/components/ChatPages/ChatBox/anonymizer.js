const anonymizer = (currentUser, storeMessages) => {
    const authorObj = {};
    authorObj[currentUser._id] = "You";
    let i = 1;
    for(let msg of storeMessages) {
      if(!authorObj[msg.sender]) {
        authorObj[msg.sender] = `User ${i}`;
        i += 1;
      }
    }
    return authorObj;
}
export default anonymizer;