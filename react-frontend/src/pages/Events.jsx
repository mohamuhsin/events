/* eslint-disable react-refresh/only-export-components */
import { json, useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";

async function loadEvents() {
    const response = await fetch("http://localhost:8080/events");
    if (!response.ok) {
        // throw new Response(
        //     JSON.stringify({ message: "Could not fetch events" }, { status: 500 })
        // );

        json({ message: "Could not fetch events" }, { status: 500 });
    } else {
        return response;
    }
}

function EventsPage() {
    const data = useLoaderData();
    const events = data.events;
    return (
        <>
            <EventsList events={events} />
        </>
    );
}

export default EventsPage;

export function loader() { }
