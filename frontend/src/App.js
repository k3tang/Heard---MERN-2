import { Switch, Redirect, Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import LoginForm from "./components/SessionForms/LoginForm";
import SignupForm from "./components/SessionForms/SignupForm";
import HomePage from "./components/HomePage/index";
import { getCurrentUser } from './store/session';
import LandingPage from './components/LandingPage';
import NavBar from './components/NavBar';
import UserPreferences from "./components/UserPreferences";
import ListenStart from './components/ListenStart/index.js';
import ShareStart from "./components/ShareStart/index";
import ConfessionCreate from './components/ConfessionCreate';
import ConfessionShow from './components/ConfessionShow';
import TopicCreate from './components/TopicCreate';
import UserProfile from './components/UserProfile';

import ChatPage from './components/ChatPages/ChatPage';
import ChatPage1 from './components/ChatPages/ChatPage1/ChatPage1';
import TopicIndex from './components/TopicIndex';

import AnotherConfession from './components/AnotherConfession'
import "./index.css"


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return loaded && (
    <>
    <div id='entire-container'>
      <NavBar />
      <Switch>
        <AuthRoute exact path="/" component={LandingPage} />
        <AuthRoute exact path="/login" component={LoginForm} />
        <AuthRoute exact path="/signup" component={SignupForm} />
        <ProtectedRoute exact path="/home" component={HomePage} />
        <ProtectedRoute exact path="/account" component={UserProfile} />
        <ProtectedRoute exact path="/settings" component={UserPreferences} />
        <ProtectedRoute exact path="/listen" component={ListenStart} />
        <ProtectedRoute exact path="/share" component={ShareStart} />
        <ProtectedRoute exact path="/confession-create" component={ConfessionCreate} />
        <ProtectedRoute exact path="/confession-show" component={ConfessionShow} />

        <Route exact path="/topic-create" component={TopicCreate} />
        <Route exact path="/topic-index" component={TopicIndex} />

        <Route exact path="/talk" component={ChatPage1}/>
          <Route exact path="/chats/:chatId" component={ChatPage}/>

        <ProtectedRoute exact path="/confession-next" component={AnotherConfession} />


      <Redirect to="/" />
      </Switch>
      </div>
    </>
  );
}

export default App;
