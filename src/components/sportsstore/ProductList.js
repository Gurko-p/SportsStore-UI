import React, { useEffect, useState } from "react";
import { productsApi } from "../../api/productsAPI";
import Product from "./Product";
import Pagination from '@mui/material/Pagination';

export default function ProductList({ selectedCategory }) {
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [filteredCategory, setFilteredCategory] = useState(0);
  const pageSize = 3;

  const totalPages = Math.ceil(totalCount / pageSize);

  useEffect(() => {
    if (filteredCategory != selectedCategory) {
      setPageNumber(1);
      setFilteredCategory(selectedCategory);
    }
    productsApi
      .getProductsChunk(pageNumber, pageSize, selectedCategory?.id)
      .then((response) => response.data)
      .then((p) => {
        console.log(p);
        setProducts(p.products);
        setTotalCount(p.totalCount);
      });
  }, [pageNumber, selectedCategory]);

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <Product product={product} />
        </div>
      ))}
      <div style={{ display: "flex", justifyContent: "center"}}>
        <Pagination
          count={totalPages}
          page={pageNumber}
          onChange={(event, value) => setPageNumber(value)}
          shape="rounded"
          color="primary"
        />
      </div>
    </div>
  );
}
