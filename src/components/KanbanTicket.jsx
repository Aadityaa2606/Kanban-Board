import React from "react";
import PropTypes from "prop-types";
import TodoIcon from "../assets/To-do.svg";
import InProgressIcon from "../assets/in-progress.svg";
import DoneIcon from "../assets/Done.svg";
import BacklogIcon from "../assets/Backlog.svg";
import CanceledIcon from "../assets/Cancelled.svg";

import NoPriorityIcon from "../assets/No-priority.svg";
import LowPriorityIcon from "../assets/Img - Low Priority.svg";
import MediumPriorityIcon from "../assets/Img - Medium Priority.svg";
import HighPriorityIcon from "../assets/Img - High Priority.svg";
import UrgentPriorityIcon from "../assets/SVG - Urgent Priority colour.svg";
import "./KanbanTicket.css";

const KanbanTicket = ({ ticket, type, user }) => {
  // Function to get priority icon based on ticket priority
  const getPriorityIcon = (priority) => {
    const getIcon = (src, alt) => (
      <div className="priority-icon">
        <img src={src} alt={alt} />
      </div>
    );

    switch (priority) {
      case 4:
        return getIcon(UrgentPriorityIcon, "Urgent");
      case 3:
        return getIcon(HighPriorityIcon, "High");
      case 2:
        return getIcon(MediumPriorityIcon, "Medium");
      case 1:
        return getIcon(LowPriorityIcon, "Low");
      default:
        return getIcon(NoPriorityIcon, "No Priority");
    }
  };

  // Function to get status icon based on ticket status
  const getStatusIcon = (status) => {
    switch (status) {
      case "Todo":
        return <img src={TodoIcon} alt="Todo" className="status-icon" />;
      case "In progress":
        return (
          <img src={InProgressIcon} alt="In Progress" className="status-icon" />
        );
      case "Done":
        return <img src={DoneIcon} alt="Done" className="status-icon" />;
      case "Backlog":
        return <img src={BacklogIcon} alt="Backlog" className="status-icon" />;
      case "Canceled":
        return (
          <img src={CanceledIcon} alt="Canceled" className="status-icon" />
        );
      default:
        return null;
    }
  };

  return (
    <div className="kanban-ticket">
      {type === "Status" && (
        <>
          <div className="top-row">
            <p className="ticket-id">{ticket.id}</p>
            <div className="user-info">
              <img
                src={user.profilePic}
                alt="User Profile"
                className="user-profile-picture"
              />
              <span
                className={`availability-indicator ${
                  user.available ? "available" : "not-available"
                }`}
              ></span>{" "}
            </div>
          </div>
          <p className="ticket-title">{ticket.title}</p>
          <div className="bottom-container">
            <p>{getPriorityIcon(ticket.priority)}</p>
            <div className="aligner">
              <div className="grey-circle" />
              <p className="ticket">{ticket.tag.join(", ")}</p>
            </div>
          </div>
        </>
      )}

      {type === "User" && (
        <>
          <div className="top-row">
            <p className="ticket-id">{ticket.id}</p>
          </div>
          <div className="middle-container">
            {getStatusIcon(ticket.status)}
            <p className="ticket-title">{ticket.title}</p>
          </div>
          <div className="bottom-container">
            <p>{getPriorityIcon(ticket.priority)}</p>
            <div className="aligner">
              <div className="grey-circle" />
              <p className="ticket">{ticket.tag.join(", ")}</p>
            </div>
          </div>
        </>
      )}

      {type === "Priority" && (
        <div className="priority">
          <div className="top-row">
            <p className="ticket-id">{ticket.id}</p>
            <div className="user-info">
              <img
                src={user.profilePic}
                alt="User Profile"
                className="user-profile-picture"
              />
              <span
                className={`availability-indicator ${
                  user.available ? "available" : "not-available"
                }`}
              ></span>
            </div>
          </div>
          <div className="middle-container">
            {getStatusIcon(ticket.status)}
            <p className="ticket-title">{ticket.title}</p>
          </div>
          <div className="bottom-container">
            <div className="aligner">
              <div className="grey-circle" />
              <p className="ticket">{ticket.tag.join(", ")}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KanbanTicket;
