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

const characterMap = {
  "Include uppercase letters": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "Include lowercase letters": "abcdefghijklmnopqrstuvwxyz",
  "Include numbers": "0123456789",
  "Include symbols": "!@#$%^&*()",
};
// function generateRandomPassword(passwordLength, checkBoxData, setPassword) {
//   let selectedCheckedBoxdata = checkBoxData.filter((item) => item.state);
//   let eachPasswordOccurence = 0;
//   let generatedPassword = "";

//   if (selectedCheckedBoxdata.length > 0) {
//     eachPasswordOccurence = Math.floor(
//       passwordLength / selectedCheckedBoxdata.length
//     );

//     selectedCheckedBoxdata.forEach((option) => {
//       let charset = characterMap[option.title];
//       generatedPassword += generateRandomChanacter(
//         charset,
//         eachPasswordOccurence
//       );
//     });
//     let remainingPasswordCharLength = passwordLength - generatedPassword.length;
//     if (remainingPasswordCharLength > 0) {
//       let charset =
//         characterMap[
//           selectedCheckedBoxdata[selectedCheckedBoxdata.length - 1].title
//         ];

//       generatedPassword += generateRandomChanacter(
//         charset,
//         remainingPasswordCharLength
//       );
//     }
//     setPassword(generatedPassword);
//   }
// }
// function generateRandomPassword(passwordLength, checkBoxData, setPassword) {
//   const selectedCheckedBoxdata = checkBoxData.filter((item) => item.state);
//   let generatedPassword = "";

//   if (selectedCheckedBoxdata.length > 0) {
//     const selectedCharsets = selectedCheckedBoxdata
//       .map((option) => characterMap[option.title])
//       .join("");

//     for (let i = 0; i < passwordLength; i++) {
//       const randomIndex = Math.floor(Math.random() * selectedCharsets.length);
//       generatedPassword += selectedCharsets[randomIndex];
//     }

//     setPassword(generatedPassword);
//   }
// }
function generateRandomPassword(passwordLength, checkBoxData, setPassword) {
  const selectedCheckedBoxdata = checkBoxData.filter((item) => item.state);
  let generatedPassword = "";

  if (selectedCheckedBoxdata.length > 0) {
    // Array to hold the characters from each selected character set
    const selectedCharsets = selectedCheckedBoxdata.map(
      (option) => characterMap[option.title]
    );
    console.log("selectedCharsets:", selectedCharsets);
    let remainingPasswordLength = passwordLength;

    // Add at least one character from each selected character set
    selectedCharsets.forEach((charset) => {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatedPassword += charset[randomIndex];
      remainingPasswordLength--;
    });

    // Generate the rest of the password randomly from all selected character sets
    for (let i = 0; i < remainingPasswordLength; i++) {
      const randomCharsetIndex = Math.floor(
        Math.random() * selectedCharsets.length
      );
      const randomCharset = selectedCharsets[randomCharsetIndex];
      const randomIndex = Math.floor(Math.random() * randomCharset.length);
      generatedPassword += randomCharset[randomIndex];
    }

    // Shuffle the generated password to ensure randomness
    generatedPassword = shuffleString(generatedPassword);

    setPassword(generatedPassword);
  }
}

// Function to shuffle a string (Fisher-Yates shuffle algorithm)
function shuffleString(str) {
  const array = str.split("");
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.join("");
}

function generateRandomChanacter(charset, eachPasswordOccurence) {
  console.log("hello");
  let randomCharacter = "";
  for (let i = 0; i < eachPasswordOccurence; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    randomCharacter += charset[randomIndex];
  }

  return randomCharacter;
}

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(1);
  const [checkBoxData, setCheckBoxData] = useState(checkBoxInitailData);

  function handleCheckBox(i) {
    const updatedCheckedData = [...checkBoxData];
    updatedCheckedData[i].state = !updatedCheckedData[i].state;
    setCheckBoxData(updatedCheckedData);
  }

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
          generateRandomPassword(passwordLength, checkBoxData, setPassword)
        }
      >
        Generate Password
      </button>
    </div>
  );
};

export default PasswordGenerator;
