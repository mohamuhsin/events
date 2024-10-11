/* eslint-disable react-refresh/only-export-components */
//import { useParams } from "react-router-dom";
import {
    Await,
    defer,
    json,
    redirect,
    useRouteLoaderData,
} from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

export default function EventDetailPage() {
    const { event, events } = useRouteLoaderData("event-detail");
    return (
        <>
            <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
                <Await resolve={event}>
                    {(loadEvent) => <EventItem event={loadEvent} />}
                </Await>
            </Suspense>

            <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
                <Await resolve={events}>
                    {(loadedEvents) => <EventsList events={loadedEvents} />}
                </Await>
            </Suspense>
        </>
    );
}

async function loadEvent(id) {
    const response = await fetch(`http://localhost:8080/events/${id}`);

    if (!response.ok) {
        throw json(
            { message: "could not fetch details for selected events" },
            { status: 500 }
        );
    } else {
        const resData = await response.json();
        return resData.event;
    }
}

async function loadedEvents() {
    const response = await fetch("http://localhost:8080/events");
    if (!response.ok) {
        json({ message: "Could not fetch events" }, { status: 500 });
    } else {
        const resData = await response.json();
        return resData.events;
    }
}
// eslint-disable-next-line no-unused-vars
export async function loader({ request, params }) {
    const id = params.eventId;

    return defer({
        event: await loadEvent(id),
        events: loadedEvents(),
    });
}

export async function action({ params, request }) {
    //code for deleting an event
    const eventId = params.eventId;
    const response = await fetch(`http://localhost:8080/events/${eventId}`, {
        method: request.method,
    });

    if (!response.ok) {
        throw json({ message: "could not delete event" }, { status: 500 });
    }
    return redirect("/events");
}
