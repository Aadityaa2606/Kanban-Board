import React, { useState, useEffect } from "react";
import "./App.css";
import DisplayOptions from "./components/DisplayOptionsButton";
import KanbanBoard from "./components/KanbanBoard";

function App() {
  const [tickets, setTickets] = useState([]);
  const [grouping, setGrouping] = useState("Status");
  const [ordering, setOrdering] = useState("Priority");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Retrieve saved grouping and ordering from localStorage
    const savedGrouping = localStorage.getItem("grouping");
    const savedOrdering = localStorage.getItem("ordering");

    if (savedGrouping) {
      setGrouping(savedGrouping);
    }
    if (savedOrdering) {
      setOrdering(savedOrdering);
    }

    fetch("https://api.quicksell.co/v1/internal/frontend-assignment/")
      .then((res) => res.json())
      .then((data) => {
        const usersWithProfilePics = data.users.map((user) => ({
          ...user,
          profilePic: `https://picsum.photos/50?random=${
            Math.floor(Math.random() * 100) + 1
          }`, // Generate a random image for each user
        }));
        setTickets(data.tickets);
        setUsers(usersWithProfilePics);
      });
  }, []);

  const handleGroupingChange = (group) => {
    setGrouping(group);
    // Save the selected grouping to localStorage
    localStorage.setItem("grouping", group);
  };

  const handleOrderingChange = (order) => {
    setOrdering(order);
    // Save the selected ordering to localStorage
    localStorage.setItem("ordering", order);
  };

  return (
    <>
      <div className="container">
        <DisplayOptions
          onGroupingChange={handleGroupingChange}
          onOrderingChange={handleOrderingChange}
        />
      </div>
      <KanbanBoard
        tickets={tickets}
        users={users}
        typeOfGrouping={grouping}
        typeOfOrdering={ordering}
      />
    </>
  );
}

export default App;
