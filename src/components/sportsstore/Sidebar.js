import React, { useEffect, useState } from "react";
import { categoriesApi } from "../../api/categoriesApi";
import Button from "@mui/material/Button";
import { isLoggedIn } from '../../features/auth/authSlice';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ setSelectedCategory }) {
  const isLoggedInState = useSelector(isLoggedIn);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); // Новое состояние
  const all = { id: 0, categoryName: "Все" };

  useEffect(() => {
    if(isLoggedInState){
      categoriesApi.getCategories()
      .then((response) => response?.data)
      .then((categoriesResponse) => {
        if(categoriesResponse){
          setCategories([all,  ...categoriesResponse]);
        }
      })
      if(!selectedCategoryId){
        setSelectedCategoryId(all.id);
      };
    }
    else{
      navigate("/login");
    }
  }, []);

  function handleCategoryClick(category) {
    setSelectedCategory(category);
    setSelectedCategoryId(category.id);
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
          sx={{ 
            marginBottom: "10px", 
            backgroundColor: selectedCategoryId === category.id ? 'rgba(165, 76, 255,0.81)' : 'primary' // Изменяем цвет кнопки
          }}
          key={category.id}
          size="large"
          fullWidth
          variant="contained"
          onClick={() => handleCategoryClick(category)}
        >
          {category.categoryName}
        </Button>
      ))}
    </div>
  );
}