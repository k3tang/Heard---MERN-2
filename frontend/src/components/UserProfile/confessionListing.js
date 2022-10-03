import "./index.css";
import {
  deleteConfession,
  fetchUserConfessions,
} from "../../store/confessions";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { deleteTopic, fetchTopicsbyUser } from "../../store/topics";

const ConfessionListing = ({ conf }) => {
  const dispatch = useDispatch();
  const uConfessions = useSelector((state) => state.confessions.user);
  const [confModal, setConfModal] = useState(false);

  

  const handleDelete = () => {
    if (conf.body) {
      dispatch(deleteConfession(conf._id)).then(
        dispatch(fetchUserConfessions(conf.userId))
      );
      closeModal();
    } else {
      dispatch(deleteTopic(conf._id)).then(
        dispatch(fetchTopicsbyUser(conf.userId))
      );
      closeModal();
    }
  };

  const closeModal = () => {
    let ele = document.getElementById("delete-conf-modal");
    ele.style.display = "none";
    let bg = document.getElementById("delete-modal-background");
    bg.style.display = "none";
  };

  window.onclick = function (event) {
    let modal = document.getElementById("delete-conf-modal");
    let modalBackground = document.getElementById("delete-modal-background");
    if (event.target == modalBackground) {
      modal.style.display = "none";
      modalBackground.style.display = "none";
    }
  };

  return (
    <>
      <div className="listing-container">
        <div className={conf.mood}>{conf.body || conf.title}</div>
        <div
          id="trash-icon"
          className="fa-solid fa-trash"
          onClick={() => setConfModal(true)}
        ></div>
      </div>
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
