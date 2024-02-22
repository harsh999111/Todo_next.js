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

  async componentDidMount() {
    try {
      const res = await fetch("http://localhost:4000/todoList");
      const json = await res.json();
      this.setState({ todoList: json });
    } catch (error) {}
  }
  addTodo = async (event) => {
    try {
      const inputText = this.inputRef.current;
      const res = await fetch("http://localhost:4000/todoList", {
        method: "POST",
        body: JSON.stringify({
          text: inputText.value,
          isDone: false,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const newTodo = await res.json();

      this.setState(
        ({ todoList }) => ({
          todoList: [
            ...todoList,
            { id: new Date().valueOf(), text: inputText.value, isDone: false },
            newTodo,
          ],
        }),
        () => {
          inputText.value = "";
        }
      );
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  toggleEvent = async (item) => {
    try {
      const res = await fetch(`http://localhost:4000/todoList/${item.id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...item,
          isDone: !item.isDone,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const updatedTodo = await res.json();

      this.setState(({ todoList }) => {
        const updatedList = todoList.map((todo) => {
          if (todo.id === updatedTodo.id) {
            return updatedTodo;
          } else {
            return todo;
          }
        });

        return {
          todoList: updatedList,
        };
      });
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  deleteTodo = async (item) => {
    try {
      await fetch(`http://localhost:4000/todoList/${item.id}`, {
        method: "DELETE",
      });
      this.setState(({ todoList }) => {
        const index = todoList.findIndex((x) => x.id === item.id);
        return {
          todoList: [...todoList.slice(0, index), ...todoList.slice(index + 1)],
        };
      });
    } catch (error) {}
  };

  changeFilterType = (filterType) => {
    this.setState({ filterType });
  };

  render() {
    const { todoList, filterType } = this.state;
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
          deleteTodo={this.deleteTodo}
        />
        <TodoFilter
          filterType={filterType}
          changeFilterType={this.changeFilterType}
        />
      </div>
    );
  }
}
