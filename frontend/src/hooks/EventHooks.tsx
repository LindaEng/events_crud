import {useContext} from 'react';
import { EventsContext } from '../contexts/EventsContext';
import type { EventType, FormData } from '../types/EventType';

export function useEventsContext() {
    const context = useContext(EventsContext);
    if (!context) throw new Error("EventForm must be used within an EventsProvider")
    return context;
}

export function findOneEvent(id: string | number) {
    const {events} = useEventsContext();
    const foundEvent: EventType | undefined = events.find((event) => Number(event.id) === Number(id));
    return foundEvent;
}

export async function updateEvent(id: number, form: FormData) {
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
