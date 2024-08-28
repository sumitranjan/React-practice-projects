import { useState } from "react";
import QRCode from "react-qr-code";

const QRCodeGenerator = () => {
  const [inputValue, setInputValue] = useState("");
  const [qrCode, setQrCode] = useState("");

  function handleGenerateQrCode() {
    setQrCode(inputValue);
  }
  return (
    <div style={{ textAlign: "center" }}>
      <h1>QR Code Generator</h1>
      <input
        type="text"
        value={inputValue}
        placeholder="Enter your value here"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        disabled={inputValue && inputValue.trim() !== "" ? false : true}
        onClick={handleGenerateQrCode}
      >
        Generate
      </button>
      <div style={{ marginTop: "20px" }}>
        <QRCode value={qrCode} />
      </div>
    </div>
  );
};

export default QRCodeGenerator;
