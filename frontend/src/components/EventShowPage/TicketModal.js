import { React, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const TicketModal = (props) => {
  const { event } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const [ticketCount, setTicketCount] = useState(0);
  const sessionUserId = useSelector((state) => state.session.user.id);

  // useEffect(() => {}, []);
  const handleTicketPurchase = () => {
    for (let i = 0; i < ticketCount; i++) {
      console.log(`Purchased Ticket ${i + 1}`);
    }
    if (ticketCount > 0) history.push(`/users/${sessionUserId}/tickets`);
    // setTicketCount(0);
  };

  const handleDecClick = () => {
    if (ticketCount !== 0) setTicketCount((ticketCount) => ticketCount - 1);
  };
  const handleIncClick = () => {
    setTicketCount((ticketCount) => ticketCount + 1);
  };

  const sumTicketPrice = () => {
    return (ticketCount * event.ticketPrice).toFixed(2);
  };
  const formatTicketPrice = () => {
    return parseFloat(event.ticketPrice).toFixed(2);
  };

  return (
    <div id="microMobilityModal" className="modal">
      <div id="appear" className="modal-content">
        {/* <div className="modal-top">
          <h2>Motivation</h2>
        </div> */}
        <div className="modal-body">
          <div className="right-modal">
            <div className="modal-event-title">{event.title}</div>
            {/* <div>{event.startDatetime}</div> */}
            <div className="ticket-counter-container">
              <div className="dec-button">
                <button className="decrement" onClick={handleDecClick}>
                  -
                </button>
              </div>

              <div className="inc-button">
                <button className="increment" onClick={handleIncClick}>
                  +
                </button>
              </div>
            </div>
            <div className="ticket-count-container">
              <div className="ticket-count">
                <p>Ticket Count:</p>
                <p>{ticketCount}</p>
              </div>
              <div className="ticket-price">
                <p>Ticket Price: </p>
                <p>${formatTicketPrice()}</p>
              </div>
              <div className="ticket-total">
                <p>Total: </p>
                <p>${sumTicketPrice()}</p>
              </div>
            </div>
            <div className="ticket-checkout">
              <button
                className="check-out-button"
                onClick={handleTicketPurchase}
              >
                Check Out
              </button>
            </div>
          </div>
          <div className="left-modal">
            <img src={event.photoUrl}></img>
          </div>
        </div>
        {/* <div className="modal-bottom">
          <h3>
            <strong>Click Anywhere to Enter Page</strong>
          </h3>
        </div> */}
      </div>
    </div>
  );
};

export default TicketModal;
