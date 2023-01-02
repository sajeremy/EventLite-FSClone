import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEvents, fetchEvents, getMusicEvents } from "../../store/event.js";
import EventListItem from "./EventListItem.js";
import EventCategories from "./EventCategories";
import "./EventIndexPage.css";

const EventIndexPage = () => {
  const dispatch = useDispatch();
  let events = useSelector(getEvents);
  const [music, setMusic] = useState(false);
  const [art, setArt] = useState(false);
  const [holiday, setHoliday] = useState(false);
  const [health, setHealth] = useState(false);
  const [hobby, setHobby] = useState(false);
  const [business, setBusiness] = useState(false);
  const [food, setFood] = useState(false);
  const [sport, setSport] = useState(false);
  const categoryArr = [
    setMusic,
    setArt,
    setHoliday,
    setHealth,
    setHobby,
    setBusiness,
    setFood,
    setSport,
  ];

  useEffect(() => {
    dispatch(fetchEvents());
  }, []);

  const handleMusic = () => {
    window.scroll(0, 480);
    setMusic(music ? false : true);
    const otherCategories = categoryArr.filter((el) => el !== setMusic);
    otherCategories.forEach((el) => el(false));
  };
  const handleArt = () => {
    window.scroll(0, 480);
    setArt(art ? false : true);
    const otherCategories = categoryArr.filter((el) => el !== setArt);
    otherCategories.forEach((el) => el(false));
  };
  const handleHoliday = () => {
    window.scroll(0, 480);
    setHoliday(holiday ? false : true);
    const otherCategories = categoryArr.filter((el) => el !== setHoliday);
    otherCategories.forEach((el) => el(false));
  };
  const handleHealth = () => {
    window.scroll(0, 480);
    setHealth(health ? false : true);
    const otherCategories = categoryArr.filter((el) => el !== setHealth);
    otherCategories.forEach((el) => el(false));
  };
  const handleHobby = () => {
    window.scroll(0, 480);
    setHobby(hobby ? false : true);
    const otherCategories = categoryArr.filter((el) => el !== setHobby);
    otherCategories.forEach((el) => el(false));
  };
  const handleBusiness = () => {
    window.scroll(0, 480);
    setBusiness(business ? false : true);
    const otherCategories = categoryArr.filter((el) => el !== setBusiness);
    otherCategories.forEach((el) => el(false));
  };
  const handleFood = () => {
    window.scroll(0, 480);
    setFood(food ? false : true);
    const otherCategories = categoryArr.filter((el) => el !== setFood);
    otherCategories.forEach((el) => el(false));
  };
  const handleSport = () => {
    window.scroll(0, 480);
    setSport(sport ? false : true);
    const otherCategories = categoryArr.filter((el) => el !== setSport);
    otherCategories.forEach((el) => el(false));
  };

  const categories = {
    handleMusic,
    handleArt,
    handleHoliday,
    handleHealth,
    handleHobby,
    handleBusiness,
    handleFood,
    handleSport,
  };

  const eventsList = (events) => {
    if (music === true) {
      events = events.filter((event) => event.category === "Music");
    } else if (art === true) {
      events = events.filter(
        (event) => event.category === "Performing & Visual Arts"
      );
    } else if (holiday === true) {
      events = events.filter((event) => event.category === "Holiday");
    } else if (health === true) {
      events = events.filter((event) => event.category === "Health");
    } else if (hobby === true) {
      events = events.filter((event) => event.category === "Hobbies");
    } else if (business === true) {
      events = events.filter((event) => event.category === "Business");
    } else if (food === true) {
      events = events.filter((event) => event.category === "Food & Drink");
    } else if (sport === true) {
      events = events.filter((event) => event.category === "Sports & Fitness");
    }
    return events.map((event) => {
      return <EventListItem key={event.id} event={event} />;
    });
  };

  return (
    <>
      <section className="event-index-layout">
        <div className="index-layout-border">
          <EventCategories categories={categories} />
          <div className="index-section-container">
            <div className="index-card-header">
              <h3 className="events-index-title">Events Nearby</h3>
            </div>
            <div className="index-feed-container">{eventsList(events)}</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EventIndexPage;
