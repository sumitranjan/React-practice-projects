import { useState } from "react";
import styles from "./display.module.css";
// import styles from "./todo.module.css";

const DisplayItem = ({ todoItem, handleDelete, handleEdit }) => {
  const [editId, setEditId] = useState(null);
  const [newName, setNewName] = useState("");

  const startEditing = (id, name) => {
    setEditId(id);
    setNewName(name);
  };

  const saveEdit = (id) => {
    handleEdit(id, newName);
    setEditId(null);
    setNewName("");
  };

  // console.log(styles);
  return (
    <ul>
      {todoItem.map((item) => (
        <li key={item.id} className={styles.listContainer}>
          {editId === item.id ? (
            <>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <button
                className={styles.saveBtn}
                onClick={() => saveEdit(item.id)}
              >
                Save
              </button>
              <button
                className={styles.cancelBtn}
                onClick={() => setEditId(null)}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <p>{item.name}</p>
              <button
                className={styles.editBtn}
                onClick={() => startEditing(item.id, item.name)}
              >
                Edit
              </button>
              <button
                className={styles.deleteBtn}
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default DisplayItem;
