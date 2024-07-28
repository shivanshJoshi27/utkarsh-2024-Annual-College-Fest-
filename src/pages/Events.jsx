import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { Link } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

const Events = () => {
  const [selectedTab, setSelectedTab] = useState("All");

  const handleTabChange = (event) => {
    setSelectedTab(event.target.value);
  };

  const filterCardsByDay = (day) => {
    return events.filter((event) => event.day === day);
  };

  const [events, setEvents] = useState([]);
  const firebase = useFirebase();

  useEffect(() => {
    const fetchEvents = async () => {
      const eventsData = await firebase.getEvents();
      if (eventsData) {
        setEvents(eventsData);
      }
    };

    fetchEvents();
  }, []);

  const filteredCards =
    selectedTab === "All" ? events : filterCardsByDay(selectedTab);

  return (
    <>
      <nav className="w-full bg-transparent px-5 py-3 dark:bg-gray-800">
        <ol className="list-reset flex">
          <li>
            <Link
              to="/"
              className="text-[#ead4ad] text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
            >
              Home
            </Link>
          </li>
          <li>
            <span className="mx-2 text-neutral-500 dark:text-neutral-300">
              /
            </span>
          </li>
          <li className="text-neutral-500 dark:text-neutral-300">Events</li>
        </ol>
      </nav>

      <div
        className="w-full h-full p-10 flex flex-col items-center"
        style={{
          backgroundImage: 'url("./background.jpeg")',
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className="text-nowrap sm:hidden flex justify-center items-center">
          <label htmlFor="tabs" className="sr-only">
            Select day
          </label>
          <select
            id="tabs"
            value={selectedTab}
            onChange={handleTabChange}
            className="bg-gray-50 border border-gray-300 text-gray-50 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-2.5 mt-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            style={{ gap: "1px" }}
          >
            <option
              value="All"
              className={`${
                selectedTab === "All"
                  ? "bg-gray-100 dark:bg-gray-700 text-gray-50 dark:text-white"
                  : "bg-white hover:bg-gray-50 text-gray-50 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
              }`}
            >
              All
            </option>
            <option
              value="Day 1"
              className={`${
                selectedTab === "Day 1"
                  ? "bg-gray-100 dark:bg-gray-700 text-gray-50 dark:text-white"
                  : "bg-white hover:bg-gray-50 text-gray-50 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
              }`}
            >
              Day 1
            </option>
            <option
              value="Day 2"
              className={`${
                selectedTab === "Day 2"
                  ? "bg-gray-100 dark:bg-gray-700 text-gray-50 dark:text-white"
                  : "bg-white hover:bg-gray-50 text-gray-50 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
              }`}
            >
              Day 2
            </option>
            <option
              value="Day 3"
              className={`${
                selectedTab === "Day 3"
                  ? "bg-gray-100 dark:bg-gray-700 text-gray-50 dark:text-white"
                  : "bg-white hover:bg-gray-50 text-gray-50 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
              }`}
            >
              Day 3
            </option>
          </select>
        </div>
        <ul className="hidden text-sm font-medium text-center text-gray-50 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-50">
          <li className="w-full focus-within:z-10">
            <button
              onClick={() => handleTabChange({ target: { value: "All" } })}
              className={`inline-block w-full p-4 ${
                selectedTab === "All"
                  ? "text-gray-50 bg-gray-100 border-r border-gray-200 dark:border-gray-700 rounded-s-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white"
                  : "bg-white border-r border-gray-200 dark:border-gray-700 hover:text-gray-50 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
              }`}
            >
              All
            </button>
          </li>
          <li className="w-full focus-within:z-10">
            <button
              onClick={() => handleTabChange({ target: { value: "Day 1" } })}
              className={`inline-block w-full p-4 ${
                selectedTab === "Day 1"
                  ? "text-gray-900 bg-gray-100 border-r border-gray-200 dark:border-gray-700 rounded-s-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white"
                  : "bg-white border-r border-gray-200 dark:border-gray-700 hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
              }`}
            >
              Day 1
            </button>
          </li>
          <li className="w-full focus-within:z-10">
            <button
              onClick={() => handleTabChange({ target: { value: "Day 2" } })}
              className={`inline-block w-full p-4 ${
                selectedTab === "Day 2"
                  ? "text-gray-900 bg-gray-100 border-r border-gray-200 dark:border-gray-700 rounded-s-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white"
                  : "bg-white border-r border-gray-200 dark:border-gray-700 hover:text-gray-50 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
              }`}
            >
              Day 2
            </button>
          </li>
          <li className="w-full focus-within:z-10">
            <button
              onClick={() => handleTabChange({ target: { value: "Day 3" } })}
              className={`inline-block w-full p-4 ${
                selectedTab === "Day 3"
                  ? "text-gray-50 bg-gray-100 border-s-0 border-gray-200 dark:border-gray-700 rounded-e-lg hover:text-gray-50 hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                  : "bg-white border-s-0 border-gray-200 dark:border-gray-700 rounded-e-lg hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
              }`}
            >
              Day 3
            </button>
          </li>
        </ul>

        {events.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10 mb-5">
          {filteredCards.map((event) => (
            <EventCard key={event.eventId} event={event} />
          ))}
        </div> : (
          <p className="h2Colorchota text-gray-50 text-xl mt-8">
          Coming Soon!
        </p>
        )}



      </div>
    </>
  );
};

export default Events;
