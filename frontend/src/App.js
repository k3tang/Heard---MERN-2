import { Switch, Redirect } from 'react-router-dom';
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
import ListenStart from './components/ListenStart/index';
import ShareStart from "./components/ShareStart/index";
import ConfessionCreate from './components/ConfessionCreate';
import ConfessionShow from './components/ConfessionShow';
import TopicCreate from './components/TopicCreate';
import UserProfile from './components/UserProfile';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return loaded && (
    <>
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
        <ProtectedRoute exact path="/topic-create" component={TopicCreate} />
        {/* <ProtectedRoute exact path="/talk" component={ChatPage1}/>
          <ProtectedRoute exact path="/talk/:chatId" component={ChatPage}/> */}
      <Redirect to="/" />
      </Switch>
    </>
  );
}

export default App;
