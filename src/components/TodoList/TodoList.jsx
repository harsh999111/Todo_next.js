"use client";
import React, { memo } from "react";
import PropTypes from "prop-types";
import TodoListitem from "../TodoListitem/TodoListitem";

const TodoList = ({ todoList, filterType, deleteTodo, toggleEvent }) => {
  console.log("todolist");
  return (
    <div className="m-4 flex flex-col gap-6 flex-1">
      {todoList.map((item) => {
        if (
          filterType === "all" ||
          (filterType === "pending" && item.isDone === false) ||
          (filterType === "completed" && item.isDone === true)
        ) {
          return (
            <TodoListitem
              item={item}
              key={item.id}
              deleteTodo={deleteTodo}
              toggleEvent={toggleEvent}
            />
          );
        }
        return null;
      })}
    </div>
  );
};

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      isDone: PropTypes.bool,
    }).isRequired
  ).isRequired,
  filterType: PropTypes.oneOf(["all", "pending", "completed"]).isRequired,
  toggleEvent: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired
};

export default memo(TodoList);
