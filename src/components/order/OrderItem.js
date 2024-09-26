import React from "react";

export default function OrderItem({ order }) {
  let dateOrder = new Date(order.orderDate);
  return (
    <>
      <div>
        <h4>Номер заказа: {order.orderId}</h4>
        <h4>Дата заказа: {dateOrder.toLocaleDateString()}</h4>
        <h4>Адрес заказа: {order.address}</h4>
        <h4>Состав заказа:</h4>
        <div style={{ marginLeft: "50px" }}>
          {order.products.map((product, index) => (
            <div key={index}>
              <h4>
                {product.name}
                <span style={{ color: "green" }}>{"   (Количество: "}</span>
                <span>{product.quantity}</span>

                <span style={{ color: "green" }}>{"   Цена: "}</span>
                <span>{product.price + "BYN за шт.)"}</span>
              </h4>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
