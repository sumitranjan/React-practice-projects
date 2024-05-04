import React from "react";
import "./search.css";

const Suggestions = ({ data, handleClick }) => {
  console.log("users", data);
  return (
    <ul className="user-list">
      {data && data.length > 0
        ? data.map((item, index) => (
            <li key={index} onClick={handleClick}>
              {item}
            </li>
          ))
        : null}
    </ul>
  );
};

export default Suggestions;
