import React, { useEffect, useState } from "react";
import "./search.css";
import Suggestions from "./Suggestions";

const Search = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [searchParam, setSearchParam] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  async function fetchListOfUsers() {
    try {
      setLoading(true);
      const response = await fetch("https://dummyjson.com/users");
      const data = await response.json();
      if (data && data.users && data.users.length > 0) {
        setUsers(data.users.map((userItem) => userItem.firstName));
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError(error);
    }
    setLoading(false);
  }
  // console.log(users);
  function handleChange(event) {
    const query = event.target.value.toLowerCase();
    setSearchParam(query);
    if (query.length > 1) {
      const filteredData =
        users && users.length
          ? users.filter((name) => name.toLowerCase().includes(query))
          : null;
      setFilteredUsers(filteredData);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }
  console.log(filteredUsers);

  function handleClick(event) {
    console.log(event);
    setShowDropdown(false);
    setSearchParam(event.target.innerText);
    setFilteredUsers([]);
  }

  useEffect(() => {
    fetchListOfUsers();
  }, []);

  return (
    <div className="search-container">
      <div>
        {loading ? (
          <h1>Loading Data ! Please wait</h1>
        ) : (
          <input
            value={searchParam}
            name="search-users"
            placeholder="Search Users here..."
            onChange={handleChange}
          />
        )}
      </div>

      <Suggestions data={filteredUsers} handleClick={handleClick} />
    </div>
  );
};

export default Search;
