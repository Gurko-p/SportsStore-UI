import React from 'react';
import { Rating, Box, Typography } from '@mui/material';

const ProductRating = ({ product, handleRatingChange }) => {

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