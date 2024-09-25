import { Link } from "react-router-dom";

const EVENTS = [
    { id: "e1", title: "event 1" },
    { id: "e2", title: "event 2" },
    { id: "e3", title: "event 3" },
];

export default function EventsPage() {
    return (
        <>
            <h1>Events</h1>
            <ul>
                {EVENTS.map((event) => (
                    <li key={event.id}>
                        <Link to={`/events/${event.id}`}>{event.title}</Link>
                    </li>
                ))}
            </ul>
        </>
    );
}
