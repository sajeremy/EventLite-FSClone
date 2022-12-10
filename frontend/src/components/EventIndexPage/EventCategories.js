import { Link } from "react-router-dom";
import { BiImages } from "react-icons/bi";
import { CiMusicNote1 } from "react-icons/ci";
import { FaTheaterMasks, FaRunning, FaRegHeart } from "react-icons/fa";
import { TbDeviceGamepad } from "react-icons/tb";
import { RiSuitcaseLine } from "react-icons/ri";
import { GiMartini } from "react-icons/gi";
import "./EventIndexPage.css";

const EventCategories = () => {
  return (
    <div className="home-category-tiles">
      <h3 className="home-category-tiles-title">
        Check out trending categories
      </h3>
      <div className="tile-group">
        <Link to="#">
          <div className="title">
            <aside className="tile-icon">
              <CiMusicNote1 className="orange-icon" />
            </aside>
            <div className="tile-name">Music</div>
          </div>
        </Link>
        <Link to="#">
          <div className="title">
            <aside className="tile-icon">
              <FaTheaterMasks className="orange-icon" />
            </aside>
            <div className="tile-name">Performing & Visual Arts</div>
          </div>
        </Link>
        <Link to="#">
          <div className="title">
            <aside className="tile-icon">
              <BiImages className="orange-icon" />
            </aside>
            <div className="tile-name">Holiday</div>
          </div>
        </Link>
        <Link to="#">
          <div className="title">
            <aside className="tile-icon">
              <FaRegHeart className="orange-icon" />
            </aside>
            <div className="tile-name">Health</div>
          </div>
        </Link>
        <Link to="#">
          <div className="title">
            <aside className="tile-icon">
              <TbDeviceGamepad className="orange-icon" />
            </aside>
            <div className="tile-name">Hobbies</div>
          </div>
        </Link>
        <Link to="#">
          <div className="title">
            <aside className="tile-icon">
              <RiSuitcaseLine className="orange-icon" />
            </aside>
            <div className="tile-name">Business</div>
          </div>
        </Link>
        <Link to="#">
          <div className="title">
            <aside className="tile-icon">
              <GiMartini className="orange-icon" />
            </aside>
            <div className="tile-name">Food & Drink</div>
          </div>
        </Link>
        <Link to="#">
          <div className="title">
            <aside className="tile-icon">
              <FaRunning className="orange-icon" />
            </aside>
            <div className="tile-name">Sports & Fitness</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default EventCategories;
