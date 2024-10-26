import React, { useEffect, useState } from "react";
import { productsApi } from "../../api/productsAPI";
import Product from "./Product";
import Pagination from "@mui/material/Pagination";
import { isLoggedIn } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { urls } from "../../api/urls";

export default function ProductList({ selectedCategory }) {
  const isLoggedInState = useSelector(isLoggedIn);
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [filteredCategory, setFilteredCategory] = useState(0);
  const pageSize = 3;
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl(urls.hubs.ratingHubUrl)
      .build();
    connect?.on('ReceiveRating', (productRating) => {
      updateProductRating(productRating);
    });
    setConnection(connect);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        ?.start()
        .then(() => console.log("Connected to SignalR hub"))
        .catch((err) => console.log("Error while starting connection: " + err));
      return () => {
        connection?.stop();
      };
    }
  }, [connection]);

  const updateProductRating = ({ productId, rating, ratingCount }) => {
    const arr = 
    setProducts(prev => prev?.map(product =>
      product?.id === productId ? { ...product, rating: { overallRating: rating, totalRates: ratingCount } } : product
    ));
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  useEffect(() => {
    if (filteredCategory != selectedCategory) {
      setPageNumber(1);
      setFilteredCategory(selectedCategory);
    }
    if (isLoggedInState) {
      productsApi
        .getProductsChunk(pageNumber, pageSize, selectedCategory?.id)
        .then((response) => response?.data)
        .then((p) => {
          setProducts(p?.products);
          setTotalCount(p?.totalCount);
        });
    }
  }, [pageNumber, selectedCategory]);

  return (
    <div>
      {products?.map((product) => (
        <div key={product.id}>
          <Product product={product}  />
        </div>
      ))}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          count={totalPages}
          page={pageNumber}
          onChange={(_, pageNumber) => setPageNumber(pageNumber)}
          shape="rounded"
          color="primary"
        />
      </div>
    </div>
  );
}
