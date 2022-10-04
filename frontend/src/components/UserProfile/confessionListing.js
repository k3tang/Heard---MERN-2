import "./index.css";
import {
  deleteConfession,
  fetchUserConfessions,
  getConfessions,
} from "../../store/confessions";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {Link} from 'react-router-dom'
import { deleteTopic, fetchTopicsbyUser } from "../../store/topics";

const ConfessionListing = ({ conf }) => {
  const dispatch = useDispatch();
  // const uConfessions = useSelector(getConfessions);
  const [confModal, setConfModal] = useState(false);
  const [displayTooltip, setDisplayTooltip] = useState(false)
  
  const handleFlagClick =(e) =>{
    if (!displayTooltip){
    setDisplayTooltip(true);

    } else {
      setDisplayTooltip(false)
    }
  }


  const handleDelete = () => {
    closeModal();
    if (conf.body) {
      dispatch(deleteConfession(conf._id)).then(
        dispatch(fetchUserConfessions(conf.userId))
      );
    } else {
      dispatch(deleteTopic(conf._id)).then(
        dispatch(fetchTopicsbyUser(conf.userId))
      );
      // closeModal();
    }
  };

  const closeModal = () => {
    let ele = document.getElementById("delete-conf-modal");
    ele.style.display = "none";
    let bg = document.getElementById("delete-modal-background");
    bg.style.display = "none";
    setConfModal(false);
  };


  if(!conf) return null;
  return (
    <>
      {conf?.body ? (
        <div className="listing-container">
          <div className={conf.mood}>{conf.body}</div>

          <div
            id="trash-icon"
            className="fa-solid fa-trash"
            onClick={() => setConfModal(true)}
          ></div>
        </div>
      ) : (
        <>
          <div className="listing-container">
            <Link to={`/topic/${conf._id}`}>
            <div className={conf.mood}>{conf.title}</div>
            </Link>
            {conf.flagged.isFlagged && (
              <div className ='flag-div' onClick={(e)=>handleFlagClick(e)}>
                <i className="fa-solid fa-flag" style={{color : 'darkred'}}></i>
              </div>
            )}
            <div
              id="trash-icon"
              className="fa-solid fa-trash"
              onClick={() => setConfModal(true)}
              ></div>
          </div>
              {displayTooltip && <div id="flag-tooltip"><span>{"This post has been flagged for review. No action is needed but your account may be suspended upon admin review. Please review Heard guidelines before chosing a title for a topic thread. If you believe this has been a mistake you can"}<br/><Link to={"/about"} style={{color: 'darkblue'}}>{' contact and admin'}</Link>{"."}</span></div> }
      </>
      )}
      {confModal ? (
        <>
          <div id="delete-modal-background"></div>
          <div id="delete-conf-modal">
            <h1 className="delete-modal">
              Are you sure you want to delete this secret?
            </h1>
            <div className="delete-button-container">
              <div
                id="delete-user"
                className="delete-square-button"
                onClick={handleDelete}
              >
                Delete secret
              </div>
              <div className="delete-square-button" onClick={closeModal}>
                Cancel
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default ConfessionListing;
