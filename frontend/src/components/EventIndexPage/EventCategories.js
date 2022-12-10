import { Link } from "react-router-dom";

const EventCategories = () => {
  return (
    <div className="home-category-tiles">
      <h3 className="home-category-tiles-title">
        Check out trending categories
      </h3>
      <div className="tile-group">
        <Link to="#">
          <div className="title">
            <aside className="tile-icon"></aside>
            <div className="tile-name">Music</div>
          </div>
        </Link>
        <Link to="#">
          <div className="title">
            <aside className="tile-icon"></aside>
            <div className="tile-name">Performing & Visual Arts</div>
          </div>
        </Link>
        <Link to="#">
          <div className="title">
            <aside className="tile-icon"></aside>
            <div className="tile-name">Holiday</div>
          </div>
        </Link>
        <Link to="#">
          <div className="title">
            <aside className="tile-icon"></aside>
            <div className="tile-name">Health</div>
          </div>
        </Link>
        <Link to="#">
          <div className="title">
            <aside className="tile-icon"></aside>
            <div className="tile-name">Hobbies</div>
          </div>
        </Link>
        <Link to="#">
          <div className="title">
            <aside className="tile-icon"></aside>
            <div className="tile-name">Food & Drink</div>
          </div>
        </Link>
        <Link to="#">
          <div className="title">
            <aside className="tile-icon"></aside>
            <div className="tile-name">Sports & Fitness</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default EventCategories;
