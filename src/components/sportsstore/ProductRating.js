import React, { useState, useEffect } from 'react';
import { Rating, Box, Typography } from '@mui/material';
import { HubConnectionBuilder } from '@microsoft/signalr';

const ProductRating = ({ product }) => {
    // const [averageRating, setAverageRating] = useState(0);
    // const [connection, setConnection] = useState(null);

    // useEffect(() => {
    //     try{
    //         const connect = new HubConnectionBuilder()
    //         .withUrl("https://localhost:7046/ratingHub")
    //         .build();
    //     console.log(connect)
    //     setConnection(connect);

    //     connect?.start()
    //     .then(() => console.log('Connected to SignalR hub'))
    //     .catch(err => console.log('Error while starting connection: ' + err));

    //     connect?.on('ReceiveRating', (product) => {
    //     setAverageRating(product.averageRating);
    //     });

    //     return () => {
    //         connect?.stop();
    //     };
    //     }
    //     catch(er){
    //         console.log(er);
    //     }
        
    // }, []);

    const handleRatingChange = async (newValue) => {
        console.log(newValue, "newValue");
        // await fetch('/api/products/rate', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ productId: product.id, rating: newValue }),
        // });
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