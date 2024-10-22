import { useState } from "react";
import PropTypes from "prop-types";
import "./DisplayOptions.css";
import downArrow from "../assets/down.svg";
import filterIcon from "../assets/Display.svg";

const DisplayOptions = ({ onGroupingChange, onOrderingChange }) => {
  const [open, setOpen] = useState(false);
  // Retrieve saved grouping and ordering from localStorage
  const savedGrouping = localStorage.getItem("grouping");
  const savedOrdering = localStorage.getItem("ordering");

  const [grouping, setGrouping] = useState(savedGrouping);
  const [ordering, setOrdering] = useState(savedOrdering);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleGroupingChange = (event) => {
    setGrouping(event.target.value);
    if (onGroupingChange) {
      onGroupingChange(event.target.value);
      handleClose();
    }
  };

  const handleOrderingChange = (event) => {
    setOrdering(event.target.value);
    if (onOrderingChange) {
      onOrderingChange(event.target.value);
      handleClose();
    }
  };

  const handleOutsideClick = (event) => {
    if (event.target.className === "modal-container") {
      handleClose();
    }
  };

  return (
    <>
      <button onClick={handleOpen} className="display-btn">
        <img src={filterIcon} alt="down" />
        Display
        <img src={downArrow} alt="down" />
      </button>

      {open && (
        <div className="modal-container" onClick={handleOutsideClick}>
          <div className="modal-content">
            <div className="option">
              <label htmlFor="grouping">Grouping</label>
              <select
                id="grouping"
                value={grouping}
                onChange={handleGroupingChange}
              >
                <option value="Status">Status</option>
                <option value="User">User</option>
                <option value="Priority">Priority</option>
              </select>
            </div>

            <div className="option">
              <label htmlFor="ordering">Ordering</label>
              <select
                id="ordering"
                value={ordering}
                onChange={handleOrderingChange}
              >
                <option value="Priority">Priority</option>
                <option value="Title">Title</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

DisplayOptions.propTypes = {
  onGroupingChange: PropTypes.func,
  onOrderingChange: PropTypes.func,
};

export default DisplayOptions;
