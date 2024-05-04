import React, { useEffect, useState } from "react";
import "./GitHubUserFinder.css";
import User from "./User";

const GitHubUserFinder = () => {
  const [userName, setUserName] = useState("sumitranjan");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchGithubUserData() {
    try {
      setLoading(true);
      const response = await fetch(`https://api.github.com/users/${userName}`);
      const data = await response.json();
      if (data) {
        setUserData(data);
        setUserName("");
      }
    } catch (error) {
      console.log(e);
      setLoading(false);
    }
    setLoading(false);
  }

  function handleSubmit() {
    fetchGithubUserData();
  }
  useEffect(() => {
    fetchGithubUserData();
  }, []);

  if (loading) {
    return <h1 style={{ textAlign: "center" }}>Loading data ! Please wait</h1>;
  }
  return (
    <div className="github-container">
      <div className="github-input-wrapper">
        <input
          name="search-by-username"
          type="text"
          value={userName}
          placeholder="Search Github Username..."
          onChange={(event) => setUserName(event.target.value)}
        />
        <button onClick={handleSubmit}>Search</button>
      </div>
      <div> {userData !== null ? <User user={userData} /> : null}</div>
    </div>
  );
};

export default GitHubUserFinder;
