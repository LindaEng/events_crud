import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import './App.css'
import type { EventType } from "./types/EventType";

function Events() {
  const [events, setEvents] = useState<EventType[]>([])
  const [locations, setLocations] = useState<string[]>([])
  const [filteredLoc, setFilteredLoc] = useState<string>("")
  const [keyword, setKeyword] = useState<string>("")
  const [debouncedKeyword, setDebouncedKeyword] = useState(keyword)

  useEffect(() => {
    const fetchEvents = async () => {
      const locationQuery = filteredLoc ? `?location=${encodeURIComponent(filteredLoc)}` : "";
      const keywordQuery = debouncedKeyword ? `${locationQuery ? "&" : "?"}keyword=${encodeURIComponent(debouncedKeyword)}` : "";
      try {
        const response = await fetch(`http://localhost:3000/events${locationQuery}${keywordQuery}`)
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
    findLocations();
  }, [filteredLoc, debouncedKeyword]) //Why is our console printing infinitely
    //helper

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 500);
    return () => clearTimeout(timer);
  },[keyword])

  const findLocations = async () => {
    try {
       const response = await fetch(`http://localhost:3000/events`)
       if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
        const data = await response.json();
        const seen = new Set(); 
        data.map((event:any) => {
          if(!seen.has(event.location)) {
            seen.add(event.location)
            return event.location
          }
        })
        setLocations([...seen] as string[]) 
    } catch (error) {
      console.error(error)
    }
  }
  const handleLocChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setFilteredLoc(e.target.value)
  }
  console.log("KEYWORD ", keyword)
  return (
    <>
      {/* text based search */}
      <input value={keyword} type="text" placeholder='Search with keyword' onChange={(e) => setKeyword(e.target.value)}/>
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
