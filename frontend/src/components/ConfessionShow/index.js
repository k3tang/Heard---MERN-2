import "./ConfessionShow.css";
import { useEffect, useState } from "react";
import { fetchConfessions, getConfessions } from "../../store/confessions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import bottleLogo from "../../assets/bottle pic.png";

import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { _getCurrentUser } from "../../store/session";

const ConfessionShow = () => {
  const dispatch = useDispatch();
  const confessions = useSelector(getConfessions);
  const [showConfession, setShowConfession] = useState(true);
  const history = useHistory();

  const currentUser = useSelector(_getCurrentUser);
  const [isLoading, setIsLoading] = useState(true);
  const [randomConfession, setRandomConfession] = useState("");

  useEffect(() => {
    dispatch(fetchConfessions());
    setTimeout(function () {
      setIsLoading(false);
    }, 3000);
    const timer = setTimeout(function () {
      setShowConfession(false);
      history.push(`/confession-next`);
    }, 13000);
    return () => {
      clearTimeout(timer);
    };
  }, [currentUser.moods.length]);

  let posts;

  const pulsePreferences = ()=>{
   const icon = document.getElementById("nav-profile-icon")
   icon.style.animationName = 'pulse'
   setTimeout(() => {
    icon.style.animationName = 'none'
   }, 12000);
  }
  useEffect(() => {
    if (confessions && currentUser) {
      let moods = [];
      for (let mood of currentUser.moods) {
        moods.push(mood.toUpperCase());
      }
      posts = confessions.filter((post) => {
        return moods.includes(post.mood.toUpperCase());
      });
      let total = posts.length;
      let random = Math.floor(Math.random() * total);
      setRandomConfession(posts[random]);
      if(!randomConfession) setTimeout(()=>{
        pulsePreferences();
      },3000) 
    }
 
  }, [isLoading, confessions.length]);

  const hideConfession = () => {
    document.getElementsByClassName("confession-content").style.display =
      "none";
  };

  return (
    <>
      <div className="confession-show-container">
        {isLoading ? (
          <div className="loading-container">
            <img className="logo-timer" src={bottleLogo}></img>
            <h1 className="loading-title"> gathering secrets... </h1>
          </div>
        ) : (
          <div
            className="confession-content"
            style={{ display: showConfession ? "block" : "none" }}
          >
            {randomConfession ? (
              <>
                <p className="confession-body">{randomConfession?.body}</p>
                <div className="circle-container">
                  <CountdownCircleTimer
                    isPlaying
                    duration={10}
                    size="50"
                    colors={["#d3e7ee", "#abd1da", "#7097a7", "#7097a7"]}
                    colorsTime={[10, 6, 3, 0]}
                    onComplete={() => ({ shouldRepeat: true, delay: 1 })}
                  ></CountdownCircleTimer>
                </div>
              </>
            ) : (
              <p className="no-confessions">{"Uh Oh"}<br/> {"It looks like there are no confessions that match your mood preferences. Check back later, or modify your preferences."}<br/>{"~ The Heard Team"}</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ConfessionShow;
