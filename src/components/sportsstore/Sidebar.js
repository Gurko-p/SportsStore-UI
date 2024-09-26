import React, { useEffect, useState } from "react";
import { categoriesApi } from "../../api/categoriesApi";
import Button from "@mui/material/Button";

export default function Sidebar({ setSelectedCategory }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    categoriesApi
      .getCategories()
      .then((response) => response.data)
      .then((p) => setCategories(p));
  }, []);

  function handleCategoryClick(category) {
    setSelectedCategory(category);
  }

  return (
    <div
      style={{
        color: "black",
        padding: "10px",
        minWidth: "150px",
        maxWidth: "150px",
        backgroundColor: "inherit",
        marginRight: "10px",
      }}
    >
      {categories.map((category) => (
        <Button
          sx={{ marginBottom: "10px" }}
          key={category.id}
          size="large"
          fullWidth
          color="secondary"
          variant="contained"
          onClick={() => handleCategoryClick(category)}
        >
          {category.categoryName}
        </Button>
      ))}
      <Button
        sx={{ marginBottom: "10px" }}
        size="large"
        fullWidth
        color="secondary"
        variant="contained"
        onClick={() => handleCategoryClick({ id: 0 })}
      >
        Все
      </Button>
    </div>
  );
}
