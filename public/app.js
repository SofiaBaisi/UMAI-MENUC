import React, { useState } from 'react';
import ProductList from './components/ProductList';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import HomePage from './HomePage';
import CartPage from './CartPage';
import AdminPanel from './AdminPanel';

const menuRoutes = require('./routes/menuRoutes');
cartCount = cartCount || document.querySelector('.content-shopping-cart .number');


const App = () => {
  const [cart, setCart] = useState([]);
  const products = [
    { id: 1, name: 'Fried chicken', price: 4.60, originalPrice: 5.30, image: 'img/FRITA.jpg', discount: 13, rating: 4 },
    { id: 2, name: 'Squid', price: 5.70, originalPrice: 7.30, image: 'img/pulpo.jpg', discount: 22, rating: 3 },
    { id: 3, name: 'Udon', price: 3.20,  image: 'img/udon.jpg',  rating: 5 },
    { id: 4, name: 'Ramen', price: 5.60,  image: 'img/ramen-category.jpg', rating: 4 },
    { id: 5, name: 'Flan', price: 4.60, originalPrice: 5.30, image: 'img/flan.jpg', discount: 13, rating: 4 },
    { id: 6, name: 'Cream bread', price: 5.70, originalPrice: 7.30, image: 'img/pandecrema.jpg', discount: 22, rating: 3 },
    { id: 7, name: 'Mochi', price: 3.85, originalPrice: 5.50, image: 'img/mochi.jpg', discount: 30, rating: 5 },
    { id: 8, name: 'Cake', price: 5.60,  image: 'img/pastel.jpg', rating: 4 },
  ];

  const addToCart = (product) => {
    setCart([...cart, product]), updateCartCount();
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(product => product.id !== productId)); updateCartCount();
  };

  const updateCartCount = () => {  
    cartCount.textContent = `${cart.length}`; 
  };


  return (
    <Router>
      <div>
        <header>
          <div className="container-hero">
            <div className="container hero">
              <div className="customer-support">
                <i className="fa-solid fa-headset"></i>
                <div className="content-customer-support">
                  <span className="text">Customer Support</span>
                  <span className="number">123-456-7890</span>
                </div>
              </div>
              <div className="container-logo">
                <i className="fa-solid fa-mug-hot"></i>
                <h1 className="logo"><Link to="/">Welcome</Link></h1>
              </div>
              <div className="container-user">
                <i className="fa-solid fa-user"></i>
                <i className="fa-solid fa-basket-shopping"></i>
                <div className="content-shopping-cart">
                  <span className="text">Trolley</span>
                  <span className="number">({cart.length})</span>
                </div>
              </div>
            </div>
          </div>
          <div className="container-navbar">
            <nav className="navbar container">
              <i className="fa-solid fa-bars"></i>
              <ul className="menu">
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
              </ul>
            </nav>
          </div>
        </header>
        <Switch>
          <Route path="/" exact>
            <Home />
            <ProductList products={products} onAddToCart={addToCart} />
          </Route>
          <Route path="/about" component={About} />
          <Route path="/login" component={Login} />
          <Route path="/admin" component={AdminPanel} />
          <Route path="/" exact component={HomePage} />
          <Route path="/cart" component={CartPage} />
        </Switch>
      </div>
    </Router>
  );
};


export default App;
