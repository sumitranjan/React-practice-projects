import React, { useEffect, useState } from "react";
import "./pagination.css";

const Pagination = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(null);

  async function fetchProducts() {
    setLoading(true);
    try {
      const response = await fetch("https://dummyjson.com/product?limit=100");
      const data = await response.json();
      console.log(data.products);
      if (data && data.products) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const selectPageHandler = (selectedPage) => {
    // if (
    //   selectedPage >= 1 &&
    //   selectedPage <= products.length / 10 &&
    //   selectedPage !== page
    // ) {
    setPage(selectedPage);
  };

  if (loading) {
    return <h2 className="pagination-container">Loading Data...</h2>;
  }

  return (
    <div className="pagination-container">
      <h1>Products</h1>
      {products.length > 0 && (
        <div className="products">
          {products.slice(page * 10 - 10, page * 10).map((prod) => (
            <div className="products__single" key={prod.id}>
              <img src={prod.thumbnail} alt={prod.title} /> {/* alt is imp */}
              <p>{prod.title}</p>
            </div>
          ))}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          <button
            onClick={() => selectPageHandler(page - 1)}
            // className={page > 1 ? "" : "pagination-disable"}
            disabled={page == 1}
          >
            Prev
          </button>
          {[...Array(products.length / 10)].map((_, i) => (
            <span
              key={i}
              className={page === i + 1 ? "pagination-selected" : ""}
              onClick={() => selectPageHandler(i + 1)}
            >
              {i + 1}
            </span>
          ))}
          <button
            onClick={() => selectPageHandler(page + 1)}
            // className={page < products.length / 10 ? "" : "pagination-disable"}
            disabled={page >= products.length / 10}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagination;
