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

    const [isLoading, setIsLoading] = useState(true)
    
    
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
                {isLoading ?
                <div className="loading-container">      
                    <h1 className="loading-title"> gathering secrets... </h1>
                    <img src="https://derailed-seed.s3.us-west-1.amazonaws.com/loading-gif.gif"></img>
                </div>
                    :           
                    <div className="confession-content" style={{display: showConfession ? 'block' : 'none'}}>
                        
                        {/* <p>{randomConfession.mood}</p> */}
                        <p class='confession-body'>{randomConfession.body}</p>
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

