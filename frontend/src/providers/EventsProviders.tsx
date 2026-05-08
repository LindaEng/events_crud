import { useState, useEffect, type ReactNode } from 'react';
import { EventsContext } from '../contexts/EventsContext';
import type { EventType, FormData } from "../types/EventType";
import type { EventsContextType } from "../types/EventsContextType";




export default function EventsProvider({ children } : {children:ReactNode}) {
    const [events, setEvents] = useState<EventType []>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string|null>(null);

    async function fetchEvents() {
        try {
            const response = await fetch(`http://localhost:3000/events`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            setEvents(data)
        } catch (error) {
            setError("failed to get events");
            console.error(error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchEvents();
    }, []);


    const updateEvent = async (id: number, form: FormData) => {
        console.log("DIDDDD IT UPDATEEE FRONT END ", form)
        try {
            const response = await fetch(`http://localhost:3000/events/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            })
            const data = await response.json();
            console.log("updated data", data)
        } catch (error) {
            console.error(error);
        }
    }

    
    const value: EventsContextType = {
        events,
        loading,
        error,
        refetch: fetchEvents,
        updateEvent 
    }

    return (
        <EventsContext.Provider value={value}>
            {children}
        </EventsContext.Provider>
    )
}


