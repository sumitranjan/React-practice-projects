import { useState } from "react";
import { AddItem } from "./AddItem";
import DisplayItem from "./DisplayItem";
import styles from "./todo.module.css";

const Todo = () => {
  const [todoItem, setTodoItem] = useState([
    { id: 1, name: "Tea", isCompleted: false },
    { id: 2, name: "Coffee", isCompleted: false },
    { id: 3, name: "Samosa", isCompleted: false },
    { id: 4, name: "Biscuit", isCompleted: false },
    { id: 5, name: "Cold Drink", isCompleted: false },
  ]);

  function handleDelete(id) {
    const filterData = todoItem.filter((item) => item.id !== id);
    setTodoItem(filterData);
  }

  function handleEdit(id, newName) {
    const updatedItems = todoItem.map((item) =>
      item.id === id ? { ...item, name: newName } : item
    );
    setTodoItem(updatedItems);
  }

  return (
    <div className={styles.container}>
      <h1>Todo App</h1>
      <AddItem todoItem={todoItem} setTodoItem={setTodoItem} />
      <DisplayItem
        todoItem={todoItem}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </div>
  );
};

export default Todo;
