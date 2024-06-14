import React, { useState } from 'react';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="card-product">
      <div className="container-img">
        <img src={product.image} alt={product.name} />
        {product.discount && <span className="discount">-{product.discount}%</span>}
        <div className="button-group">
          <span>
            <i className="fa-regular fa-heart"></i>
          </span>
        </div>
      </div>
      <div className="content-card-product">
        <div className="stars">
          {[...Array(product.rating)].map((_, i) => (
            <i key={i} className="fa-solid fa-star"></i>
          ))}
          {[...Array(5 - product.rating)].map((_, i) => (
            <i key={i} className="fa-regular fa-star"></i>
          ))}
        </div>
        <h3>{product.name}</h3>
        <span className="add-cart" onClick={() => onAddToCart(product)}>
          <i className="fa-solid fa-basket-shopping"></i>
        </span>
        <p className="price">${product.price} {product.originalPrice && <span>${product.originalPrice}</span>}</p>
      </div>
    </div>
  );
};

const Card = () => {
  const [cart, setCart] = useState([]);

  const handleCheckout = () => {
    // Aquí iría la lógica para realizar el pedido
    // Por ejemplo, enviar los productos del carrito al servidor y mostrar un mensaje de confirmación
    console.log('Pedido realizado');
  };

  return (
    <div>
      <h1>Carrito de Compras</h1>
      <div>
        {/* Mostrar los elementos agregados al carrito */}
        {cart.map((product) => (
          <div key={product.id}>
            <p>{product.name} - ${product.price}</p>
          </div>
        ))}
      </div>
      <button onClick={handleCheckout}>Hacer el pedido</button>
    </div>
  );
};

export { ProductCard};

