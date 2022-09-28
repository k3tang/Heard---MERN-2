import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { _getCurrentUser } from "../../store/session";
import ConfessionListing from "../UserProfile/confessionListing";
import bottleLogo from "../../assets/bottle pic.png";
import { getAllTopics, fetchTopicsbyUser } from "../../store/topics";

function UserTopics() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user._id);
  const uTopics = useSelector((state) => state.confessions.user);
  const [isLoading, setIsLoading] = useState(true);
  const topics = useSelector(getAllTopics);
  const [myTopics, setMyTopics] = useState();

  useEffect(() => {
    const myTopics = Object.values(topics).filter(
      (topic) => topic.userId === user
    );
    setMyTopics(myTopics);
  }, [topics, user]);

  useEffect(() => {
    dispatch(fetchTopicsbyUser(user));
    const timer = setTimeout(function () {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [topics.length]);

  const mapConfessions = () => {
    return myTopics.map((topic) => (
      <ConfessionListing key={topic._id} conf={topic} />
    ));
  };

  return (
    <>
      <div className="user-confession-container">
        {isLoading ? (
          <div className="loading-container">
            <img className="logo-timer" src={bottleLogo}></img>
            <h1 className="loading-title">
              {" "}
              Quietly gathering your secrets...{" "}
            </h1>
          </div>
        ) : (
          <>
            <h1 className="user-conf-header">All your confessions</h1>
            <div className="mapped-conf">{mapConfessions()}</div>
          </>
        )}
      </div>
    </>
  );
}

export default UserTopics;
