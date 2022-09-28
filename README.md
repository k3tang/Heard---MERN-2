# Heard

[Click here to view!](https://heard--app.herokuapp.com/)

## Background
--- 
Heard is an application that aims to foster a safe, anonymous community of secret sharers and secret bearers. Users can choose to share a confession or start a message thread about a specific topic. The application design takes a mobile-focused approach as most of the interactions will likely take place sporadically throughout the day on an accessible device. 


## Features 
---
### User Authentication - Login/Signup 

Heard features a fully functional user authentication system, complete with a demo user login and error handling for incomplete entries. Upon successful login, the user will be redirected to a home page where the user can choose to participate in the application as a listener or create confessions or message threads. 

<img width="350" alt="Screen Shot 2022-09-27 at 9 49 23 AM" src="https://user-images.githubusercontent.com/107089418/192587580-7cb3dd42-b8f9-4626-9483-f76ade558ce6.png">
<img width="350" alt="Screen Shot 2022-09-27 at 9 49 35 AM" src="https://user-images.githubusercontent.com/107089418/192587576-aad07c04-440e-4291-93d8-8454974fc00a.png">

### Confessions - Creation and Display

On Heard, users can anonymously share their deepest secrets with our confessions tab, where they're sent to our MongoDatabase and stored until randomly selected to be seen by another user. Once seen confessions are then deleted, never to be seen again. If a user ever regrets a confession, they can be deleted on their profile where only they can see it.  

<img  width="350" alt="Gathering Secrets Loading Animations" src="https://user-images.githubusercontent.com/101153713/192821901-17dde078-f9ce-47d7-a5ab-399b00b2db26.png">
<img  width="350" alt="Random Confession Exapmle" src="https://user-images.githubusercontent.com/101153713/192822026-ca3adcbf-9268-4c18-b05f-efe7192d060e.png">

```
    useEffect(() => {
        dispatch(fetchConfessions())
        setTimeout(function () {
            setIsLoading(false);
        }, 3000)
        setTimeout(function () {
            setShowConfession(false);
            history.push(`/confession-next`)
        }, 13000)
        // .then(console.log(confessions))
    },[]);
    let posts = confessions[0];
    let total = posts.length;
    let random = Math.floor(Math.random()*total);
    let randomConfession = posts[random];
    
  ```
