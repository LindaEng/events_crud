import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEventsContext } from './hooks/EventHooks';
import type { FormData } from './types/EventType';



function EventForm() {
    const { events, updateEvent, refetch } = useEventsContext();
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = Boolean(id);
    
    // State for form data
    const [formData, setFormData] = useState<FormData>({
        title: '',
        description: '',
        type: '',
        location: '',
        date: ''
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
                location: foundEvent.location || '',
                date: foundEvent.date || ''
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

    const addEvent = async (form: FormData) => {
        try {
            const response = await fetch(`http://localhost:3000/events/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });

            if (!response.ok) {
                throw new Error(`Failed to create event. Status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    
    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            if (isEditing && id) {
                await updateEvent(parseInt(id), formData);
                navigate(`/events/${id}`);
            } else {
                await addEvent(formData);
                refetch();
                navigate('/events');
            }
        } catch (error) {
            console.error('Unable to submit event form', error);
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
                <label htmlFor="location">Location *</label>
                <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    placeholder="Venue name or online link"
                />
            </div>
            <div className="form-group">
                <label htmlFor="date">date *</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    placeholder="Choose a date"
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
