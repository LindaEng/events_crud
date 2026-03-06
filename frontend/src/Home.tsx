import { Link } from "react-router-dom"
function Home () {
    return (
        <>
        <div>WELCOME TO OUR EVENTS!</div>
        <Link to="/events">View Events</Link>
        </>
    )
}

export default Home