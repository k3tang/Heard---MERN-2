import "./ConfessionShow.css";
import { useEffect } from "react";
import { fetchConfessions, getConfessions } from "../../store/confessions";
import { useDispatch, useSelector } from "react-redux";


const ConfessionShow = () => {
    const dispatch = useDispatch();
    const confessions = useSelector(getConfessions)
    
    useEffect(() => {
        dispatch(fetchConfessions())
        // .then(console.log(confessions))
    },[])
    let posts = confessions[0]
    let total = posts.length
    let random = Math.floor(Math.random()*total)
    let randomConfession = posts[random]
    console.log(random)
    console.log(posts[random])

    useEffect(() => {
        
    })
    // setTimeout(confessionTimer() {
    //     $('#confession-content').fadeOut('fast');
    // }, 1000)
     

    return (
        <>
            <div className="confession-show-container">
                <div className="confession-content">Confession here
                    <p>{randomConfession.mood}</p>
                    <p>{randomConfession.body}</p>
                </div>
            </div>
        </>
    )
}

export default ConfessionShow;