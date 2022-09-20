import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.css"

const TopicIndex = () => {
    const topics = useSelector(state => state.products);
    const dispatch = useDispatch();


    // useEffect(() => {
    //     dispatch()
    // })

    return (
        <>
            <div className="topic-container">
                <div>List of topics</div>
            </div>
        </>
    )
}

export default TopicIndex;