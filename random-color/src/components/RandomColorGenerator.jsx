import React, { useState, useEffect } from "react";
import styles from "./randomColorGenerator.module.css";

const HEX_VALUE = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];

const RandomColorGenerator = () => {
  const [typeOfColor, setTypeOfColor] = useState("hex");
  const [color, setColor] = useState("#ff4f33");

  function generateRandomHexValue() {
    let randomHexValue = "#";
    for (let i = 0; i < 6; i++) {
      let randomIndex = Math.floor(Math.random() * HEX_VALUE.length);
      randomHexValue += HEX_VALUE[randomIndex];
    }
    return randomHexValue;
  }

  function generateRandomRGBValue(x) {
    return Math.floor(Math.random() * x + 1);
  }

  function generateColor() {
    if (typeOfColor === "hex") {
      let generatedHexColor = generateRandomHexValue();
      setColor(generatedHexColor);
    } else {
      let r = generateRandomRGBValue(255);
      let g = generateRandomRGBValue(255);
      let b = generateRandomRGBValue(255);
      let generatedRgbColor = `rgb(${r}, ${g}, ${b})`;
      setColor(generatedRgbColor);
    }
  }

  useEffect(() => {
    generateColor();
  }, [typeOfColor]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        textAlign: "center",
        backgroundColor: color,
        paddingTop: "5vh",
      }}
    >
      <button
        onClick={() => setTypeOfColor("hex")}
        // style={{
        //   backgroundColor: typeOfColor === "hex" ? "black" : null,
        //   color: typeOfColor === "hex" ? "white" : null,
        // }}
        className={`${styles.button} ${
          typeOfColor === "hex" ? styles.active : ""
        }`}
      >
        Create HEX Color
      </button>
      <button
        onClick={() => setTypeOfColor("rgb")}
        // style={{
        //   backgroundColor: typeOfColor === "rgb" ? "black" : null,
        //   color: typeOfColor === "rgb" ? "white" : null,
        // }}
        className={`${styles.button} ${
          typeOfColor === "rgb" ? styles.active : ""
        }`}
      >
        Create RGB Color
      </button>
      <button className={styles.button} onClick={generateColor}>
        Generate Random Color
      </button>
      <div
        style={{
          marginTop: "10vh",
        }}
      >
        <p className={styles.text}>
          {typeOfColor === "hex" ? "HEX Color" : "RGB Color"}
        </p>
        <p className={styles.text}>{color}</p>
      </div>
    </div>
  );
};

export default RandomColorGenerator;
