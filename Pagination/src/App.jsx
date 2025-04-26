import { useEffect, useState } from "react";
import "./App.css";
import ProductCard from "./components/ProductCard";

function App() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const PAGE_SIZE = 10;
  const totalProducts = products.length;
  const pages = Math.ceil(totalProducts / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const fetchData = async () => {
    let data = await fetch("https://dummyjson.com/products?limit=100");
    let json = await data.json();
    setProducts(json.products);
  };
  const handlePrevPage = () =>{
    setCurrentPage(prevState => prevState - 1)
  }
  const handleNextPage = () =>{
    setCurrentPage(prevState => prevState + 1)
  }
  const handlePageChage = (n) => {
    setCurrentPage(n);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return !products.length ? (
    <h1> No Products Found</h1>
  ) : (
    <div>
      <h1> Pagination </h1>
      <div className="pagination-container">
        <span className="page-number" onClick={handlePrevPage}> Prev </span>
        {[...Array(pages).keys()].map((n) => (
          <span
            key={n}
            className="page-number"
            onClick={() => handlePageChage(n)}
          >
            {n}
          </span>
        ))}
        <span className="page-number" onClick={handleNextPage}> Next </span>
      </div>
      <div className="products-container">
        {products.slice(start, end).map((product) => (
          <ProductCard
            key={product.id}
            image={product.thumbnail}
            title={product.title}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
