import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import type { EventType } from "./types/EventType";
import { useEventsContext } from './hooks/EventHooks';

const EMPTY_EVENT: EventType = {
  id: 0,
  title: "",
  description: "",
  type: "",
  location: "",
  date: ""
}; //check if best practice later

function EventCard() {
    const[event, setEvent] = useState<EventType>(EMPTY_EVENT);
    const { refetch } = useEventsContext();
    const { id } = useParams();
    const navigate = useNavigate();

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
    },[event])

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3000/events/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);  
            }
            console.log("EVENT DELETED!")
            refetch();
            navigate('/events');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
        <div>
            <h1>{event.title}</h1>
            <p>{event.description}</p>
            <p>{event.type}</p>
            <p>{event.location}</p>
            <p>{event.date && new Date(event.date).toLocaleDateString()}</p>
            <Link to="/events">Go Back</Link><br/>
            <Link to={`/events/edit-form/${id}`}>Edit</Link>
            <button onClick={handleDelete}>DELETE</button>
        </div>
        </>
    )
}

export default EventCard