import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import './App.css'

type Event = {
  id: number,
  title: string,
  description?: string,
  type?: string,
  location?: string,
  date: Date
}

function Events() {
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`http://localhost:3000/events`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error(error)
      }
    }
    fetchEvents();
  },[])

  //helper

  return (
    <>
        {events.map((event) => (
          <div key={event.id}>
              <Link to={`/events/${event.id}`}><h3>{event.title}</h3></Link>
          </div>
        ))}
    </>
  )
}

export default Events
