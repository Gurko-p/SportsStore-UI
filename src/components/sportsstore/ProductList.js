import React, { useEffect, useState } from "react";
import { productsApi } from "../../api/productsAPI";
import Product from "./Product";
import Pagination from "@mui/material/Pagination";
import { Button } from "@mui/material";
import store from "../../app/store";
import { removeLoggedIn, isLoggedIn } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { urls } from "../../api/urls";

export default function ProductList({ selectedCategory }) {
  const navigate = useNavigate();
  const isLoggedInState = useSelector(isLoggedIn);
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [filteredCategory, setFilteredCategory] = useState(0);
  const pageSize = 3;
  const [connection, setConnection] = useState(null);
  const [ recieveData, setRecieveData ] = useState({});

  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl(urls.hubs.ratingHubUrl)
      .build();
    connect?.on('ReceiveRating', (product) => {
      console.log(product, "из SignalR")
      setRecieveData(product);
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

  useEffect(() => {
    updateProductRating(recieveData);
  }, [recieveData]);


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
    } else {
      navigate("/login");
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
        <Button
          onClick={() => {
            console.log("нажата");
            store.dispatch(removeLoggedIn());
          }}
        >
          НАЖМИ
        </Button>
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
