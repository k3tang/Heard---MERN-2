import './index.css';
import { deleteConfession, fetchUserConfessions } from '../../store/confessions';
import { useDispatch, useSelector } from 'react-redux';


const ConfessionListing = ({conf}) => {
    const dispatch = useDispatch();
    const uConfessions = useSelector(state => state.confessions.user);
    // console.log(conf.body, "body")
//   console.log("conf", conf)

    const handleDelete = () => {
        dispatch(deleteConfession(conf._id))
            .then(dispatch(fetchUserConfessions(conf.userId)))
    }

    return (
        <>
            <div>{conf.body}</div>
            <div className="fa-solid fa-trash" onClick={handleDelete}></div>
        </>
    )
}

export default ConfessionListing;