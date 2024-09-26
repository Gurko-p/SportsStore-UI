import React, { useState } from "react";
import { Box, Typography, Container } from "@mui/material";
import Sidebar from "./Sidebar";
import ProductList from "./ProductList";

const SportsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <Box sx={{ display: "flex", margin: "0 0 0 0" }}>
      <Sidebar setSelectedCategory={setSelectedCategory} />
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "inherit",
            p: 1,
          }}
        >
          <Typography variant="h4" gutterBottom>
            Список спортивных товаров
          </Typography>
        </Box>
        <Box
          component="main"
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "inherit",
            p: 1,
          }}
        >
          <ProductList selectedCategory={selectedCategory} />
        </Box>
      </Container>
    </Box>
  );
};

export default SportsPage;
