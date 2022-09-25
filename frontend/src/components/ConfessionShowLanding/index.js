import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchConfessions, getConfessions } from "../../store/confessions";


const ConfessionShowLanding = () => {
    const confessions = useSelector(getConfessions)
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchConfessions())
    }, [])

    const handleClick = () => {
        history.push(`/confession-show`)
    }

    return(
        <>
        <div className="confession-show-landing-container">
            <div className="confession-landing-instruction-container">
                <p className="instructions-text">
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
                </p>
            </div>
            <div className="confession-landing-button-container">
                <button onClick={handleClick} > I'm ready to listen </button>
            </div>

        </div>
        </>
    )
}

export default ConfessionShowLanding