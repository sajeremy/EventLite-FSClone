import { Link } from "react-router-dom";
import { BiImages } from "react-icons/bi";
import { CiMusicNote1 } from "react-icons/ci";
import { FaTheaterMasks, FaRunning, FaRegHeart } from "react-icons/fa";
import { TbDeviceGamepad } from "react-icons/tb";
import { RiSuitcaseLine } from "react-icons/ri";
import { GiMartini } from "react-icons/gi";
import "./EventIndexPage.css";

const EventCategories = (props) => {
  const { categories } = props;

  return (
    <div className="home-category-tiles">
      <h3 className="home-category-tiles-title">
        Check out trending categories
      </h3>
      <div className="tile-group">
        <button onClick={categories.handleMusic}>
          <div className="title">
            <div className="tile-icon">
              <CiMusicNote1 className="orange-icon" />
            </div>
            <div className="tile-name">Music</div>
          </div>
        </button>
        <button onClick={categories.handleArt}>
          <div className="title">
            <div className="tile-icon">
              <FaTheaterMasks className="orange-icon" />
            </div>
            <div className="tile-name">Performing & Visual Arts</div>
          </div>
        </button>
        <button onClick={categories.handleHoliday}>
          <div className="title">
            <div className="tile-icon">
              <BiImages className="orange-icon" />
            </div>
            <div className="tile-name">Holiday</div>
          </div>
        </button>
        <button onClick={categories.handleHealth}>
          <div className="title">
            <div className="tile-icon">
              <FaRegHeart className="orange-icon" />
            </div>
            <div className="tile-name">Health</div>
          </div>
        </button>
        <button onClick={categories.handleHobby}>
          <div className="title">
            <div className="tile-icon">
              <TbDeviceGamepad className="orange-icon" />
            </div>
            <div className="tile-name">Hobbies</div>
          </div>
        </button>
        <button onClick={categories.handleBusiness}>
          <div className="title">
            <div className="tile-icon">
              <RiSuitcaseLine className="orange-icon" />
            </div>
            <div className="tile-name">Business</div>
          </div>
        </button>
        <button onClick={categories.handleFood}>
          <div className="title">
            <div className="tile-icon">
              <GiMartini className="orange-icon" />
            </div>
            <div className="tile-name">Food & Drink</div>
          </div>
        </button>
        <button onClick={categories.handleSport}>
          <div className="title">
            <div className="tile-icon">
              <FaRunning className="orange-icon" />
            </div>
            <div className="tile-name">Sports & Fitness</div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default EventCategories;
