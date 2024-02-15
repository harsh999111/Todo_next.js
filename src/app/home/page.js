"use client";
import React, { Component, createRef } from "react";
import TodoFilter from "@/components/todoFilter/todoFilter";
import TodoForm from "@/components/TodoForm/TodoForm";
import TodoList from "@/components/TodoList/TodoList";

export default class Home extends Component {
  state = {
    todoText: "",
    todoList: [],
    filterType: "all",
  };

  inputRef = createRef();

  addTodo = (event) => {
    const inputText = this.inputRef.current;
    event.preventDefault();
    this.setState(
      ({ todoList }) => ({
        todoList: [
          ...todoList,
          { id: new Date().valueOf(), text: inputText.value },
        ],
      }),
      () => {
        inputText.value = "";
      }
    );
  };

  toggleEvent = (item) => {
    this.setState(({ todoList }) => {
      const index = todoList.findIndex((x) => x.id === item.id);
      return {
        todoList: [
          ...todoList.slice(0, index),
          { ...item, isDone: !item.isDone },
          ...todoList.slice(index + 1),
        ],
      };
    });
  };

  deleteTodo = (item) => {
    this.setState(({ todoList }) => {
      const index = todoList.findIndex((x) => x.id === item.id);
      return {
        todoList: [...todoList.slice(0, index), ...todoList.slice(index + 1)],
      };
    });
  };

  changeFilterType = (filterType) => {
    this.setState({ filterType });
  };

  render() {
    const { todoText, todoList, filterType } = this.state;
    return (
      <div className="flex flex-col gap-4 h-screen">
        <div className="flex items-center flex-col m-8">
          <h1>Todo App</h1>
          <TodoForm addTodo={this.addTodo} ref={this.inputRef} />
        </div>
        <TodoList
          todoList={todoList}
          filterType={filterType}
          toggleEvent={this.toggleEvent}
        />
        <TodoFilter
          filterType={filterType}
          changeFilterType={this.changeFilterType}
        />
      </div>
    );
  }
}
