export type EventType = {
  id?: number;
  title: string;
  description?: string;
  type?: string;
  location: string;
  date: string;
}

// Interface for the form data
export type FormData = {
    title: string;
    description: string;
    type: string;
    location: string;
    date: string;
}