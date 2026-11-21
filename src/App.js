import { useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from /pages/Signup;
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import MyOrders from './pages/MyOrders';

function App() {
  const [page, setPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [loggedUser, setLoggedUser] = useState('');

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  if (page === 'login') {
    return (
      <Login
        onBack={() => setPage('home')}
        onGoSignup={() => setPage('signup')}
        onLoginSuccess={(username) => {
          setLoggedUser(username);
          setPage('home');
        }}
      />
    );
  }

  if (page === 'signup') {
    return (
      <Signup
        onBack={() => setPage('home')}
        onGoLogin={() => setPage('login')}
      />
    );
  }

  if (page === 'cart') {
    return (
      <Cart
        cart={cart}
        onBack={() => setPage('home')}
        onRemove={removeFromCart}
        onGoCheckout={() => setPage('checkout')}
      />
    );
  }

  if (page === 'checkout') {
    return (
      <Checkout
        cart={cart}
        onBack={() => setPage('cart')}
        onSuccess={() => {
          setCart([]);
          setPage('home');
        }}
      />
    );
  }

  if (page === 'orders') {
    return (
      <MyOrders
        onBack={() => setPage('home')}
        onGoHome={() => setPage('home')}
      />
    );
  }

  return (
    <Home
      onGoLogin={() => setPage('login')}
      onGoCart={() => setPage('cart')}
      onGoOrders={() => setPage('orders')}
      cartCount={cart.length}
      onAddToCart={addToCart}
      loggedUser={loggedUser}
    />
  );
}

export default App;