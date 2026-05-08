import { useState, useEffect } from 'react'
import { useEventsContext } from './hooks/EventHooks';
import { Link } from "react-router-dom"
import './App.css'
import type { EventType } from "./types/EventType";

function Events() {
  // const [events, setEvents] = useState<EventType[]>([])
  const {events, refetch} = useEventsContext()
  const [filteredEvents, setFilteredEvents] = useState<EventType[]>([])
  const [locations, setLocations] = useState<string[]>([])
  const [filteredLoc, setFilteredLoc] = useState<string>("")
  const [keyword, setKeyword] = useState<string>("")
  const [debouncedKeyword, setDebouncedKeyword] = useState(keyword)


  // useEffect(() => {
  //   const fetchEvents = async () => {
  //     const locationQuery = filteredLoc ? `?location=${encodeURIComponent(filteredLoc)}` : "";
  //     const keywordQuery = debouncedKeyword ? `${locationQuery ? "&" : "?"}keyword=${encodeURIComponent(debouncedKeyword)}` : "";
  //     try {
  //       const response = await fetch(`http://localhost:3000/events${locationQuery}${keywordQuery}`)
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       const data = await response.json();
  //       setEvents(data);
        
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }
  //   fetchEvents();
  //   findLocations();
  // }, [filteredLoc, debouncedKeyword]) //Why is our console printing infinitely
    //helper

  useEffect(() => {
    findLocations();
  },[debouncedKeyword])

  useEffect(() => {
    refetch();
    setFilteredEvents([...events]);
    findLocations();
  }, [events]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 500);
    return () => clearTimeout(timer);
  },[keyword])

  const findLocations = async () => {
    try {
        const seen = new Set(); 
        filteredEvents.map((event:any) => {
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

  const filteredResults = (keyword: string, location: string) => {
    const filteredEvents = events.filter(event => {
      const matchesLocation = !location || event.location === location;
      const matchesKeyword = !keyword || event.title.toLowerCase().includes(keyword.toLowerCase());
      return matchesLocation && matchesKeyword;
    });

    setFilteredEvents(filteredEvents);
  }


  const handleLocChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setFilteredLoc(e.target.value)
      filteredResults(debouncedKeyword, e.target.value)
  }


  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
      setKeyword(e.target.value)
      filteredResults(e.target.value, filteredLoc)
  }
  
  return (
    <>
      {/* text based search */}
      <input value={keyword} type="text" placeholder='Search with keyword' onChange={(e) => 
        handleKeywordChange(e)
      }/>
      {/* Filter */}
      <select value={filteredLoc} onChange={(e) => handleLocChange(e)}>
        <option value="">All locations</option>
        {locations.map((location) => (
          <option key={location} value={location}>{location}</option>
        ))}
      </select>
      {/* Add a new event */}
        <Link to="/new-event-form">Add new event</Link>
        <div>
          {filteredEvents.map((event) => (
            <div key={event.id}>
                <Link to={`/events/${event.id}`}><h3>{event.title}</h3></Link>
            </div>
          ))}
        </div>
      
    </>
  )
}

export default Events
