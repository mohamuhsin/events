import { Link } from "react-router-dom";
import classes from "./EventsNavigation.module.css";

function EventsNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <Link to="/events">All Events</Link>
          </li>
          <li>
            <Link to="/events/new">New Event</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default EventsNavigation;
