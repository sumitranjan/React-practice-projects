import { useEffect } from "react";
import { useState } from "react";

const useLocalStroage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    let currentValue;
    try {
      currentValue =
        JSON.parse(localStorage.getItem(key)) || String(currentValue);
    } catch (error) {
      console.log(e);
      currentValue = defaultValue;
    }
    return currentValue;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
};

export default useLocalStroage;
