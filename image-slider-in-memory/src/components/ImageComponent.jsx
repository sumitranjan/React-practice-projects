import { useState } from "react";

let data = [
  {
    id: 1,
    title: "Mobile",
    imageUrl:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TW9iaWxlfGVufDB8fDB8fHww",
  },
  {
    id: 2,
    title: "Laptop",
    imageUrl:
      "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TGFwdG9wfGVufDB8fDB8fHww",
  },
  {
    id: 3,
    title: "Watch",
    imageUrl:
      "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8V2F0Y2h8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 4,
    title: "Car",
    imageUrl:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fENhcnxlbnwwfHwwfHx8MA%3D%3D",
  },
];
const ImageComponent = () => {
  const [selectedImageId, setSelectedImageId] = useState(0);
  const totalImages = data.length;

  function handleNext() {
    // const lengthOfData = data.length - 1;
    // if (selectedImageId === lengthOfData) {
    //   setSelectedImageId(0);
    // } else {
    //   setSelectedImageId((prev) => prev + 1);
    // }
    setSelectedImageId((prev) => (prev + 1) % totalImages);
  }

  function handlePrevious() {
    // const lengthOfData = data.length - 1;
    // if (selectedImageId === 0) {
    //   setSelectedImageId(lengthOfData);
    // } else {
    //   setSelectedImageId((prev) => prev - 1);
    // }
    setSelectedImageId((prev) => (prev - 1 + totalImages) % totalImages);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <button onClick={handlePrevious} style={{ marginRight: "10px" }}>
          Prev
        </button>
        <img
          src={data[selectedImageId].imageUrl}
          alt={data[selectedImageId].title}
          style={{ height: "300px", width: "400px" }}
        />
        <button onClick={handleNext} style={{ marginLeft: "10px" }}>
          Next
        </button>
      </div>
      <p style={{ marginTop: "10px", textAlign: "center" }}>
        {data[selectedImageId].title}
      </p>
    </div>
  );
};

export default ImageComponent;
