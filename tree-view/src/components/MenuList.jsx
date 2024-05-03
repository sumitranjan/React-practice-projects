import MenuItem from "./MenuItem";
import PropTypes from "prop-types"; // Import PropTypes
import "./menu.css";

const MenuList = ({ list = [] }) => {
  return (
    <ul className="menu-list-container">
      {list && list.length
        ? list.map((listItem, index) => <MenuItem item={listItem} />)
        : null}
    </ul>
  );
};

// Define prop types for MenuList
MenuList.propTypes = {
  list: PropTypes.array, // Specify that list should be an array
};

export default MenuList;
