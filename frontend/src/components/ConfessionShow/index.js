import "./ConfessionShow.css";
import { useEffect, useState } from "react";
import { fetchConfessions, getConfessions } from "../../store/confessions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";


const ConfessionShow = () => {
    const dispatch = useDispatch();
    const confessions = useSelector(getConfessions)
    const [showConfession, setShowConfession] = useState(true)
    const history = useHistory()

    const [isLoading, setIsLoading] = useState(false)
    
    
    useEffect(() => {
        dispatch(fetchConfessions())
        setTimeout(function () {
            setShowConfession(false);
            history.push(`/confession-next`)
        }, 10000)
    },[])
    let posts = confessions[0]
    let total = posts.length
    let random = Math.floor(Math.random()*total)
    let randomConfession = posts[random]

    const hideConfession = () =>{
        document.getElementsByClassName('confession-content').style.display = 'none'
    }

     

    return (
        <>
            <div className="confession-show-container">
                {/* { showConfession  && ( */}
                    <div className="confession-content" style={{display: showConfession ? 'block' : 'none'}}>Confession here
                    <h1>hello   </h1>
                        {/* <p>{randomConfession.mood}</p> */}
                        {/* <p>{randomConfession.body}</p> */}
                    </div>  
                    <div className="confession-content" style={{display: showConfession ? 'none' : 'block'}}>Confession here
                      <Link to={`/confession-show`}> <button value='Another Question'  > Another Question?</button> </Link>
                    </div>  
                    {/* )}                 */}
            </div>
        </>
    )
}

export default ConfessionShow;

