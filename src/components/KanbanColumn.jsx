import React from "react";
import KanbanTicket from "./KanbanTicket";
import AddIcon from "../assets/add.svg";
import MoreDots from "../assets/3 dot menu.svg";
import TodoIcon from "../assets/To-do.svg";
import InProgressIcon from "../assets/in-progress.svg";
import DoneIcon from "../assets/Done.svg";
import BacklogIcon from "../assets/Backlog.svg";
import CancelledIcon from "../assets/Cancelled.svg";
import NoPriorityIcon from "../assets/No-priority.svg";
import LowPriorityIcon from "../assets/Img - Low Priority.svg";
import MediumPriorityIcon from "../assets/Img - Medium Priority.svg";
import HighPriorityIcon from "../assets/Img - High Priority.svg";
import UrgentPriorityIcon from "../assets/SVG - Urgent Priority colour.svg";
import "./KanbanColumn.css";

const KanbanColumn = ({
  tickets,
  typeOfOrdering,
  typeOfGrouping,
  users,
  groupKey,
}) => {
  const sortedTickets = [...tickets].sort((a, b) => {
    if (typeOfGrouping === "Priority") return b.priority - a.priority;
    if (typeOfOrdering === "Title") return a.title.localeCompare(b.title);
    return 0;
  });

  const getUserByTicket = (userId) => {
    return users.find((user) => user.id === userId) || { name: "Unknown User" };
  };

  const getStatusImage = (status) => {
    switch (status) {
      case "Todo":
        return TodoIcon;
      case "In progress":
        return InProgressIcon;
      case "Done":
        return DoneIcon;
      case "Backlog":
        return BacklogIcon;
      case "Canceled":
        return CancelledIcon;
      default:
        return null;
    }
  };

  const getPriorityImage = (priority) => {
    switch (priority) {
      case "4":
        return UrgentPriorityIcon;
      case "3":
        return HighPriorityIcon;
      case "2":
        return MediumPriorityIcon;
      case "1":
        return LowPriorityIcon;
      case "0":
      default:
        return NoPriorityIcon;
    }
  };

  function RenderHeader() {
    if (typeOfGrouping === "Status") {
      const statusImage = getStatusImage(groupKey);

      return (
        <div className="col-header">
          <div className="left-section">
            {statusImage && (
              <img src={statusImage} alt={groupKey} className="cta-icons" />
            )}
            <p>{groupKey}</p>
            <p className="ticket-count">{tickets.length}</p>
          </div>
          <div className="right-section">
            <img src={AddIcon} alt="Add Icon" className="cta-icons" />
            <img src={MoreDots} alt="Triple Dots" className="cta-icons" />
          </div>
        </div>
      );
    }

    if (typeOfGrouping === "Priority") {
      const priorityImage = getPriorityImage(groupKey);

      const priorityLabels = {
        4: "Urgent",
        3: "High",
        2: "Medium",
        1: "Low",
        0: "No Priority",
      };

      return (
        <div className="col-header">
          <div className="left-section">
            {priorityImage && (
              <img
                src={priorityImage}
                alt={priorityLabels[groupKey]}
                className="cta-icons"
              />
            )}
            <p>{priorityLabels[groupKey]}</p>
            <p className="ticket-count">{tickets.length}</p>
          </div>
          <div className="right-section">
            <img src={AddIcon} alt="Add Icon" className="cta-icons"/>
            <img src={MoreDots} alt="Triple Dots" className="cta-icons"/>
          </div>
        </div>
      );
    }

    if (typeOfGrouping === "User") {
      const user = users.find((user) => user.id === groupKey);

      return (
        <div className="col-header">
          <div className="left-section">
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
            <p>{user?.name}</p>
            <p className="ticket-count">{tickets.length}</p>
          </div>
          <div className="right-section">
            <img src={AddIcon} alt="Add Icon" className="cta-icons" />
            <img src={MoreDots} alt="Triple Dots" className="cta-icons" />
          </div>
        </div>
      );
    }

    return null;
  }

  return (
    <div className="kanban-column">
      <RenderHeader />
      {sortedTickets.map((ticket) => {
        const associatedUser = getUserByTicket(ticket.userId);

        return (
          <KanbanTicket
            key={ticket.id}
            ticket={ticket}
            type={typeOfGrouping}
            user={associatedUser}
          />
        );
      })}
    </div>
  );
};

export default KanbanColumn;
