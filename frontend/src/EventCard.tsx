import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import type { Event } from "./EventType";

const EMPTY_EVENT: Event = {
  id: 0,
  title: "",
  description: "",
  type: "",
  location: "",
  date: new Date,
}; //check if best practice later
function EventCard() {
    const[event, setEvent] = useState<Event>(EMPTY_EVENT);
    const { id } = useParams();

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await fetch(`http://localhost:3000/events/${id}`);
                if(!response.ok) {
                   throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setEvent(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchEvent();
    },[])

    return (
        <>
        <div>
            <h1>{event.title}</h1>
            <p>{event.description}</p>
            <p>{event.type}</p>
            <p>{event.location}</p>
            <p>{event.date && new Date(event.date).toLocaleDateString()}</p>
            <Link to="/events">Go Back</Link>
        </div>
        </>
    )
}

export default EventCard