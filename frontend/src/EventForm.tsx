import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEventsContext } from './hooks/EventHooks';
import type { EventType, FormData } from './types/EventType';



function EventForm() {
    const { events, updateEvent } = useEventsContext();
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = Boolean(id);
    
    // State for form data
    const [formData, setFormData] = useState<FormData>({
        title: '',
        description: '',
        type: '',
        location: ''
    });
    
    // Find the event directly from the events array
    const foundEvent = id ? events.find(event => event.id === parseInt(id)) : undefined;
    
    // Load event data when editing
    useEffect(() => {
        if (foundEvent && isEditing) {
            setFormData({
                title: foundEvent.title || '',
                description: foundEvent.description || '',
                type: foundEvent.type || '',
                location: foundEvent.location || ''
            });
        }
    }, [foundEvent, isEditing]);
    
    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    
    // Handle form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (isEditing && id) {
            // API call
            updateEvent(parseInt(id), formData);
            //redirect to events id
            navigate(`/events/${id}`);
        } else {
            // Create new event
            const newEvent: EventType = {
                id: Date.now(),
                ...formData,
                date: new Date()
            };
            // addEvent(newEvent);
            navigate('/events');
        }
    };
    
    // Handle cancel button
    const handleCancel = () => {
        navigate('/events');
    };
    
    return (
        <form onSubmit={handleSubmit} className="event-form">
            <h1>{isEditing ? 'Edit Event' : 'Create New Event'}</h1>
            
            <div className="form-group">
                <label htmlFor="title">Title *</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="Enter event title"
                />
            </div>
            
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe your event..."
                />
            </div>
            
            <div className="form-group">
                <label htmlFor="type">Type</label>
                <input
                    type="text"
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    placeholder="e.g., Conference, Workshop, Meetup"
                />
            </div>
            
            <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Venue name or online link"
                />
            </div>
            
            <div className="form-actions">
                <button type="submit" className="btn-submit">
                    {isEditing ? 'Update Event' : 'Create Event'}
                </button>
                <button type="button" className="btn-cancel" onClick={handleCancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
}

export default EventForm;

function updateEvent(arg0: number, formData: FormData) {
    throw new Error('Function not implemented.');
}
