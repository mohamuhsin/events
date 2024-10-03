/* eslint-disable react-refresh/only-export-components */
//import { useParams } from "react-router-dom";
import { json, useLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem";

export default function EventDetailPage() {
    const data = useLoaderData();
    return <EventItem event={data.event} />;
}

// eslint-disable-next-line no-unused-vars
export async function loader({ request, params }) {
    const id = params.eventId;
    const response = await fetch("http://localhost:8080/events/" + id);
    if (!response.ok) {
        throw json(
            { message: "could not fetch details for selected events" },
            { status: 500 }
        );
    } else {
        return response;
    }
}
