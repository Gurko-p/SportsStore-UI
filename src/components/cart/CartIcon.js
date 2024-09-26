import React from "react";
import { useSelector } from "react-redux";
import { itemCountInCart } from "../../features/auth/authSlice";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function CartIcon() {
  const { length } = useSelector(itemCountInCart);
  const navigate = useNavigate();
  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        cursor: "pointer",
      }}
      onClick={() => navigate("/cart", { replace: true })}
    >
      <FaShoppingCart size={30} />
      {length > 0 && (
        <span
          style={{
            position: "absolute",
            top: "-5px",
            right: "-10px",
            background: "red",
            color: "white",
            borderRadius: "50%",
            padding: "5px 10px",
            fontSize: "12px",
          }}
        >
          {length}
        </span>
      )}
    </div>
  );
}
