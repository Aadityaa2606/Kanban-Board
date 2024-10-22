import KanbanColumn from "./KanbanColumn";

const KanbanBoard = ({ tickets, typeOfGrouping, typeOfOrdering, users }) => {
  const groupTickets = (groupingType) => {
    switch (groupingType) {
      case "Status":
        return groupBy(tickets, "status");
      case "User":
        return groupBy(tickets, "userId");
      case "Priority":
      default:
        return groupBy(tickets, "priority");
    }
  };

  // Function to group items by a specific key, with special handling and sorting for "status"
  const groupBy = (items, key) => {
    const statusOrder = ["Backlog", "Todo", "In progress", "Done", "Canceled"];
    const groupedItems = items.reduce((result, item) => {
      const groupValue = item[key];
      if (!result[groupValue]) result[groupValue] = [];
      result[groupValue].push(item);
      return result;
    }, {});

    // If grouping by "status", ensure all statuses are present and ordered correctly
    if (key === "status") {
      statusOrder.forEach((status) => {
        if (!groupedItems[status]) groupedItems[status] = [];
      });
      return statusOrder.reduce((sortedGroups, status) => {
        sortedGroups[status] = groupedItems[status];
        return sortedGroups;
      }, {});
    }
    return groupedItems;
  };

  const groupedTickets = groupTickets(typeOfGrouping);

  return (
    <div className="kanban-board">
      {Object.entries(groupedTickets).map(([groupKey, tickets]) => (
        <KanbanColumn
          key={groupKey}
          groupKey={groupKey}
          tickets={tickets}
          typeOfOrdering={typeOfOrdering}
          typeOfGrouping={typeOfGrouping}
          users={users}
        />
      ))}
    </div>
  );
};

export default KanbanBoard;
