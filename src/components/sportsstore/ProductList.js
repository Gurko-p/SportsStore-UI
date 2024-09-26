import React, { useEffect, useState } from "react";
import { productsApi } from "../../api/productsAPI";
import Product from "./Product";

export default function ProductList({ selectedCategory }) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    productsApi
      .getProducts()
      .then((response) => response.data)
      .then((p) => setProducts(p));
  }, []);

  const filteredProducts =
    selectedCategory && selectedCategory?.id
      ? products.filter(
          (product) => product?.category.id === selectedCategory.id
        )
      : products;

  return (
    <div>
      {filteredProducts.map((product) => (
        <div key={product.id}>
          <Product product={product} />
        </div>
      ))}
    </div>
  );
}
