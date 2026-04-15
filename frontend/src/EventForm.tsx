import { useContext, useState } from 'react';
import { useEventsContext } from './hooks/EventHooks';
// import type { EventsContextType } from './types/EventsContextType';

function EventForm() {
    const {events} = useEventsContext()
    console.log("eVENTSSS ", events)
    return(
       <>
        {events.map((event) => (
            <>
                <p>{event.title}</p>
                <p>{event.description}</p>
            </>
        ))}
       </>
    )

}

export default EventForm