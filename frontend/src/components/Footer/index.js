import { Link } from "react-router-dom";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import "./Footer.css";

const footer = () => {
  return (
    <footer className="event-index-footer">
      <div className="footer-title">
        <h4>Use Eventlite</h4>
        <h4>Technologies</h4>
        <h4>Contact</h4>
      </div>
      <div className="footer-content">
        <div className="use-eventlite">
          <p>&copy; Jeremy Santiago 2023</p>
        </div>
        <div className="footer-technologies">
          Ruby on Rails
          <span className="symbol">&#9679;</span>
          React-Redux
          <span className="symbol">&#9679;</span>
          PostgreSQL
          <span className="symbol">&#9679;</span>
          AWS
          <span className="symbol">&#9679;</span>
          HTML/CSS
        </div>
        <div className="footer-contact">
          <Link
            to={{
              pathname: "https://www.linkedin.com/in/jeremy-santiago-11b05367",
            }}
            target="_blank"
            className="footer-linkedin-link"
          >
            <BsLinkedin style={{ fontSize: "25px" }} />
          </Link>
          <Link
            to={{ pathname: "https://github.com/sajeremy" }}
            target="_blank"
            className="footer-github-link"
          >
            <BsGithub style={{ fontSize: "25px" }} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default footer;
