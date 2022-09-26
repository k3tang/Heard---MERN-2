import "./ConfessionShow.css";
import { useEffect, useState } from "react";
import { fetchConfessions, getConfessions } from "../../store/confessions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import bottleLogo from "../../assets/bottle pic.png";
import { useLocation } from "react-router-dom";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

const ConfessionShow = () => {
    const dispatch = useDispatch();
    const confessions = useSelector(getConfessions)
    const [showConfession, setShowConfession] = useState(true)
    const history = useHistory()
    const location = useLocation();

    const [isLoading, setIsLoading] = useState(true);
    
    
    useEffect(() => {
        dispatch(fetchConfessions())
        setTimeout(function () {
            setIsLoading(false);
        }, 3000);
       const timer = setTimeout(function () {
            setShowConfession(false);
            history.push(`/confession-next`)
        }, 13000);
        return () => {
            clearTimeout(timer);
        };
    },[]);

    

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
                {isLoading ?
                <div className="loading-container">      
                    <img className="logo-timer" src={bottleLogo}></img>
                    <h1 className="loading-title"> gathering secrets... </h1>
                </div>
                    :           
                    <div className="confession-content" style={{display: showConfession ? 'block' : 'none'}}>
                        
                        {/* <p>{randomConfession.mood}</p> */}
                        <p class='confession-body'>{randomConfession.body}</p>
                        <div className="circle-container">
                        <CountdownCircleTimer
                            isPlaying
                            duration={10}
                            size='100'
                            colors={["#d3e7ee", "#abd1da", "#7097a7", "#7097a7"]}
                            colorsTime={[10, 6, 3, 0]}
                            onComplete={() => ({ shouldRepeat: true, delay: 1 })}
                        >  
                        </CountdownCircleTimer>
                        </div>
                    </div>  
                }
                {/* { showConfession  && ( */}
          
                    {/* <div className="confession-content" style={{display: showConfession ? 'none' : 'block'}}>Confession here
                      <Link to={`/confession-show`}> <button value='Another Question'  > Another Question?</button> </Link>
                    </div>   */}
                    {/* )}                 */}
            </div>
        </>
    )
}

export default ConfessionShow;

