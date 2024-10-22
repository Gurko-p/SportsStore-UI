import React, { useState, useEffect } from 'react';
import { Rating, Box, Typography } from '@mui/material';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { urls } from '../../api/urls';
import { productsApi } from '../../api/productsAPI';

const ProductRating = ({ product }) => {
  const [averageRating, setAverageRating] = useState(0);
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl(urls.hubs.ratingHubUrl)
      .build();
    connect?.on('ReceiveRating', (product) => {
      console.log(product, "из SignalR")
    });
    setConnection(connect);
  }, []);

  useEffect(() => {
    if (connection) {
      connection?.start()
        .then(() => console.log('Connected to SignalR hub'))
        .catch(err => console.log('Error while starting connection: ' + err));
      return () => {
        connection?.stop();
      };
    }
  }, [connection]);

  const handleRatingChange = async (newValue) => {
    await productsApi.setProductRate(product.id, newValue);
  };

  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Rating
          name="product-rating"
          precision={0.5}
          value={product?.rating?.overallRating ?? 0}
          onChange={(event, newValue) => handleRatingChange(newValue)}
        />
        <Typography sx={{ color: "text.secondary" }}>
          ({product?.rating?.overallRating ?? 0}) (
          {product?.rating?.totalRates ?? "нет оценок"})
        </Typography>
      </Box>
    </div>
  );
};

export default ProductRating;