import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import './App.css'
import type { Event } from "./EventType";

function Events() {
  const [events, setEvents] = useState<Event[]>([])
  const [locations, setLocations] = useState<string[]>([])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`http://localhost:3000/events`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setEvents(data);
        const foundLocations = findLocations();
        setLocations(foundLocations);
      } catch (error) {
        console.error(error)
      }
    }
    fetchEvents();
  },[events])

  //helper
  const findLocations = () => {
    const seen = new Set(); 

    const loc = events.map((event) => {
      if(!seen.has(event.location)) {
        seen.add(event.location)
        return event.location
      }
    }) 
    return [...seen] as string[];
  }

  return (
    <>
      {/* Filter */}
      <select>
        {locations.map((location) => (
          <option value={location}>{location}</option>
        ))}
      </select>
        {events.map((event) => (
          <div key={event.id}>
              <Link to={`/events/${event.id}`}><h3>{event.title}</h3></Link>
          </div>
        ))}
    </>
  )
}

export default Events
