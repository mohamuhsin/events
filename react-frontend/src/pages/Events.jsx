/* eslint-disable react-refresh/only-export-components */
import { Await, defer, json, useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

async function loadedEvents() {
    const response = await fetch("http://localhost:8080/events");
    if (!response.ok) {
        json({ message: "Could not fetch events" }, { status: 500 });
    } else {
        const resData = await response.json();
        return resData.events;
    }
}

function EventsPage() {
    const { events } = useLoaderData();
    return (
        <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
            <Await resolve={events}>
                {(loadedEvents) => <EventsList events={loadedEvents} />}
            </Await>
        </Suspense>
    );
}

export default EventsPage;

export function loader() {
    return defer({
        events: loadedEvents(),
    });
}
