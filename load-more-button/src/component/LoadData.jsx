import { useEffect, useState } from "react";
import "./load-data.css";

const LoadData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [disableButton, setDisableButton] = useState(false);

  async function fetchData() {
    try {
      setLoading(true);
      let response = await fetch(
        `https://dummyjson.com/products?limit=10&skip=${
          count === 0 ? 0 : count * 20
        }`
      );
      let result = await response.json();
      if (result && result.products && result.products.length) {
        setData((prevData) => [...prevData, ...result.products]);
      }
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [count]);

  useEffect(() => {
    if (data && data.length >= 50) {
      setDisableButton(true);
    }
  }, [data]);

  console.log("disableButton ", disableButton, data.length);

  return (
    <div className="load-more-container">
      <div className="product-conatiner">
        {data?.map((item) => (
          <div key={item.id} className="card">
            <img src={item.thumbnail} alt={item.title} className="card-image" />
            <p>{item.title}</p>
          </div>
        ))}
      </div>
      <div className="button-container">
        {data.length > 0 && (
          <button
            disabled={disableButton}
            onClick={() => setCount(count + 1)}
            className="loading-btn"
          >
            {loading ? "Loading...." : "Load More Products"}
          </button>
        )}
        {disableButton ? <p>{"You have reached to products >= 50"}</p> : null}
      </div>
    </div>
  );
};

export default LoadData;
