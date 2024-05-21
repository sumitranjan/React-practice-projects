import React, { useState } from "react";
import "./passwordGenerator.css";
const checkBoxInitailData = [
  {
    title: "Include uppercase letters",
    state: false,
  },
  {
    title: "Include lowercase letters",
    state: false,
  },
  {
    title: "Include numbers",
    state: false,
  },
  {
    title: "Include symbols",
    state: false,
  },
];
function generatePassword(passwordLength, checkBoxData, setPassword) {
  let selectedCheckedBoxdata = checkBoxData.filter((item) => item.state);

  for (let i = 0; i < passwordLength; i++) {}
  console.log(passwordLength, selectedCheckedBoxdata);
}

const PasswordGenerator = () => {
  const [password, setPassword] = useState("123");
  const [passwordLength, setPasswordLength] = useState(0);
  const [checkBoxData, setCheckBoxData] = useState(checkBoxInitailData);

  function handleCheckBox(i) {
    const updatedCheckedData = [...checkBoxData];
    updatedCheckedData[i].state = !updatedCheckedData[i].state;
    setCheckBoxData(updatedCheckedData);
  }
  // console.log(checkBoxData);

  return (
    <div className="password-generator-component">
      <h3>Password Generator</h3>
      <div className="password-container">
        <p>Password</p>
        <p>{password}</p>
        <div className="copy">COPY</div>
      </div>
      <p className="password-length">Password length : {passwordLength}</p>
      <input
        type="range"
        className="password-range"
        value={passwordLength}
        min={1}
        max={20}
        onChange={(e) => setPasswordLength(e.target.value)}
      />
      <div className="password-checkbox">
        {checkBoxData.map((data, index) => (
          <div key={index}>
            <input
              type="checkbox"
              name={data.title}
              id={data.title}
              onChange={(e) => handleCheckBox(index)}
            />
            <label htmlFor={data.title}>{data.title}</label>
          </div>
        ))}
      </div>
      <div>
        <p>strength {"Medium"}</p>
      </div>
      <button
        className="password-btn"
        onClick={() =>
          generatePassword(passwordLength, checkBoxData, setPassword)
        }
      >
        Generate Password
      </button>
    </div>
  );
};

export default PasswordGenerator;
