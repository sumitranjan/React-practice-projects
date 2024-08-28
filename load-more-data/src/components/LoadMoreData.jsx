import { useEffect } from "react";
import { useState } from "react";

const LoadMoreData = () => {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function fetchProduct() {
    setLoading(true);
    try {
      const res = await fetch(
        `https://dummyjson.com/products?limit=8&skip=${count}&select=title,price,thumbnail`
      );
      const data = await res.json();
      setProducts((prevProducts) => [...prevProducts, ...data.products]);
    } catch (error) {
      setError(true);
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchProduct(count);
  }, [count]);

  function handleLoadMore() {
    setCount(count + 10);
  }

  if (loading && products.length === 0) {
    return (
      <h1
        style={{
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        Loading...
      </h1>
    );
  }

  if (error) {
    return (
      <h1
        style={{
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        Something Went Wrong!
      </h1>
    );
  }

  if (products.length === 0) {
    return (
      <h1
        style={{
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        No Data
      </h1>
    );
  }

  console.log("products :", products);
  console.log("count:", count);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "20px",
          padding: "10px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid red",
              padding: "10px",
              width: "250px",
              textAlign: "center",
            }}
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              style={{ maxWidth: "100%", height: "300px" }}
            />
            <p>{product.title}</p>
          </div>
        ))}
      </div>
      {/* <div
        style={{
          display: "flex",
          justifyContent: "center", // Horizontally centers the button
          marginTop: "20px",
        }}
      >
        <button>Load More</button>
      </div> */}
      {products.length > 0 && (
        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          <button
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              color: "white",
              backgroundColor: count === 90 ? "gray" : "green",
              border: "none",
              borderRadius: "5px",
              cursor: count === 90 ? "not-allowed" : "pointer",
              opacity: count === 90 ? 0.5 : 1,
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "darkgreen")} // Darkens the background on hover
            onMouseOut={(e) => (e.target.style.backgroundColor = "green")} // Reverts the background on mouse out
            disabled={count === 90}
            onClick={handleLoadMore}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default LoadMoreData;
