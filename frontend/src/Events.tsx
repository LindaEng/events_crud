import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import './App.css'
import type { Event } from "./EventType";

function Events() {
  const [events, setEvents] = useState<Event[]>([])
  const [locations, setLocations] = useState<string[]>([])
  const [filteredLoc, setFilteredLoc] = useState<string>("")

  useEffect(() => {
      const findLocations = (data) => {
        const seen = new Set(); 

        data.map((event:any) => {
          if(!seen.has(event.location)) {
            seen.add(event.location)
            return event.location
          }
        }) 
        return [...seen] as string[];
      }
    const fetchEvents = async () => {
      const locationQuery = filteredLoc ? `?location=${encodeURIComponent(filteredLoc)}` : "";
      try {
        const response = await fetch(`http://localhost:3000/events${locationQuery}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setEvents(data);
        const foundLocations = findLocations(data);
        setLocations(foundLocations);
      } catch (error) {
        console.error(error)
      }
    }
    fetchEvents();
  }, [filteredLoc]) //Why is our console printing infinitely
    //helper


  const handleLocChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setFilteredLoc(e.target.value)
  }

  return (
    <>
      {/* Filter */}
      <select value={filteredLoc} onChange={(e) => handleLocChange(e)}>
        <option value="">All locations</option>
        {locations.map((location) => (
          <option key={location} value={location}>{location}</option>
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
