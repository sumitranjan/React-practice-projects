import { useState } from "react";
import ".././App.css";

const PasswordValidate = () => {
  const [password, setPassword] = useState("");
  const [messages, setMessages] = useState([]);

  const validatePassword = (value) => {
    const specialChar = ["@", "!", "#", "$", "&"];
    const newMessages = [];

    if (value.length < 6) {
      newMessages.push("Password must be at least 6 characters long.");
    }
    if (!/[A-Z]/.test(value)) {
      newMessages.push("Password must contain at least one uppercase letter.");
    }
    if (!/[a-z]/.test(value)) {
      newMessages.push("Password must contain at least one lowercase letter.");
    }
    if (!/\d/.test(value)) {
      newMessages.push("Password must contain at least one number.");
    }
    if (!specialChar.some((char) => value.includes(char))) {
      newMessages.push(
        "Password must contain at least one special character (@, !, #, $, &)."
      );
    }

    return newMessages;
  };

  function handleValidate(value) {
    setPassword(value);
    const newMessages = validatePassword(value);
    if (newMessages.length === 0) {
      setMessages(["Password is strong."]);
    } else {
      setMessages(newMessages);
    }
  }

  // Determine message type
  const isSuccess =
    messages.length === 1 && messages[0] === "Password is strong.";

  return (
    <div>
      <h1>Check Password Strength</h1>
      <label htmlFor="password">Enter Password: </label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => handleValidate(e.target.value)}
        placeholder="Enter your password"
      />

      {messages.length > 0 && (
        <ul>
          {messages.map((message, index) => (
            <p
              key={index}
              className={`message ${isSuccess ? "success" : "error"}`}
            >
              {message}
            </p>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PasswordValidate;
