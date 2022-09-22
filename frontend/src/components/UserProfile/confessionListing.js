import './index.css'

const ConfessionListing = ({conf}) => {
    console.log(conf.body, "body")
    return (
        <>
        <div className='conf-body'>{conf.body}</div>
        </>
    )
}

export default ConfessionListing;