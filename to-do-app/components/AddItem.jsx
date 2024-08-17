import { useState } from "react";
import styles from "./addItem.module.css";

export const AddItem = ({ todoItem, setTodoItem }) => {
  const [item, setItem] = useState("");

  function handleInput(e) {
    setItem(e.target.value);
  }

  function handleAdd() {
    if (item == "") {
      alert("Item is empty");
      return;
    }
    let todoItemLength = todoItem.length + 1;
    let inputData = { id: todoItemLength, name: item, isCompleted: false };
    setTodoItem([...todoItem, inputData]);
    setItem("");
  }

  return (
    <div className={styles.AddItemContainer}>
      <input
        type="text"
        placeholder="Enter item to add..."
        className={styles["addItem-Input"]}
        value={item}
        onChange={handleInput}
      />
      <button className={styles["addItem-btn"]} onClick={handleAdd}>
        Add Item
      </button>
    </div>
  );
};
