
import React, { useState } from 'react';

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Card,
  CardMedia,
  CardContent,
  TextField,
  Dialog,
  DialogContent,
  IconButton,
  Badge,
  Stack,
  InputAdornment,
  Alert
} from '@mui/material';

import {
  ShoppingCart,
  Search,
  Close,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';

import './App.css';

const products = [
  {
    name: 'Samsung Galaxy S25',
    price: 79999,
    oldPrice: 99999,
    rating: '4.6 (2.5k)',
    discount: '20% OFF',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500'
  },
  {
    name: 'ASUS Vivobook',
    price: 49999,
    oldPrice: 59999,
    rating: '4.5 (1.2k)',
    discount: '15% OFF',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500'
  },
  {
    name: 'Sony Headphones',
    price: 14999,
    oldPrice: 19999,
    rating: '4.7 (1k)',
    discount: '25% OFF',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'
  },
  {
    name: 'boAt Smart Watch',
    price: 3499,
    oldPrice: 4999,
    rating: '4.6 (3k)',
    discount: '30% OFF',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'
  }
];

const categories = [
  { name: 'Smartphone', image: products[0].image },
  { name: 'Laptop', image: products[1].image },
  { name: 'Headphones', image: products[2].image },
  { name: 'Smart Watch', image: products[3].image }
];

function App() {
  const [cart, setCart] = useState([]);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signup, setSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [search, setSearch] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [message, setMessage] = useState('');
  const [contactSuccess, setContactSuccess] = useState('');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const addCart = (product) => {
    setCart(previous => [...previous, product]);
    alert(product.name + ' added to cart!');
  };

  const showCart = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
    } else {
      alert(
        'Your Cart:\n' +
        cart.map(item => item.name).join('\n')
      );
    }
  };

  const openLogin = () => {
    setLoginOpen(true);
    setSignup(false);
    setError('');
    setSuccess('');
  };

  const closeLogin = () => {
    setLoginOpen(false);
    setError('');
    setSuccess('');
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!/^[a-zA-Z0-9]+$/.test(username)) {
      setError('Username must contain letters and numbers only.');
      return;
    }

    if (password.length < 8) {
      setError('Password must have minimum 8 characters.');
      return;
    }

    setError('');
    setSuccess('Login validation successful!');
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (!/^[a-zA-Z0-9]+$/.test(username)) {
      setError('Use letters and numbers only for username.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid email address.');
      return;
    }

    if (password.length < 8) {
      setError('Password must have minimum 8 characters.');
      return;
    }

    setError('');
    setSuccess('Sign Up validation successful!');
  };

  const handleContact = (e) => {
    e.preventDefault();
    setContactSuccess('Thank you! Your message has been submitted.');
    setContactName('');
    setContactEmail('');
    setMessage('');
  };

  return (
    <Box>

      {/* NAVBAR */}

      <AppBar position="sticky" className="navbar">
        <Toolbar className="toolbar">

          <Typography className="logo">
            🛍️ Gadget<span>Zone</span>
          </Typography>

          <Stack direction="row" spacing={3} className="nav-links">
            <a href="#home">Home</a>
            <a href="#categories">Categories</a>
            <a href="#offers">Offers</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">

            <IconButton
              color="inherit"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search />
            </IconButton>

            <IconButton color="inherit" onClick={showCart}>
              <Badge badgeContent={cart.length} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>

            <Button className="login-btn" onClick={openLogin}>
              Login
            </Button>

          </Stack>
        </Toolbar>

        {searchOpen && (
          <Box className="search-box">
            <TextField
              fullWidth
              size="small"
              placeholder="Search gadgets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Box>
        )}
      </AppBar>

      {/* HERO */}

      <Box className="hero" id="home">

        <Box className="hero-content">

          <Typography className="tagline">
            SMARTER TECH. BRIGHTER YOU.
          </Typography>

          <Typography variant="h1">
            Welcome to<br />
            Gadget<span>Zone</span>
          </Typography>

          <Typography>
            Discover the latest gadgets and
            <br /> upgrade your lifestyle!
          </Typography>

          <Button href="#products" className="shop-btn">
            Shop Now →
          </Button>

        </Box>

        <Box className="hero-image">
          <img
            src={products[0].image}
            alt="Smartphone"
          />
        </Box>

      </Box>

      {/* CATEGORIES */}

      <Container className="section" id="categories">

        <Box className="heading">
          <Typography variant="h5">
            Shop by Categories
          </Typography>
          <a href="#products">View All →</a>
        </Box>

        <Box className="category-grid">

          {categories.map(category => (
            <Card className="category-card" key={category.name}>

              <CardMedia
                component="img"
                image={category.image}
                alt={category.name}
              />

              <CardContent>
                <Typography align="center" fontWeight="bold">
                  {category.name}
                </Typography>
              </CardContent>

            </Card>
          ))}

        </Box>

      </Container>

      {/* PRODUCTS */}

      <Container className="section" id="products">

        <Box className="heading">
          <Typography variant="h5">
            Featured Products
          </Typography>
          <a href="#products">View All →</a>
        </Box>

        <Box className="product-grid">

          {(searchOpen && search ? filteredProducts : products).map(product => (

            <Card className="product-card" key={product.name}>

              <Typography className="discount">
                {product.discount}
              </Typography>

              <CardMedia
                component="img"
                image={product.image}
                alt={product.name}
              />

              <CardContent>

                <Typography fontWeight="bold">
                  {product.name}
                </Typography>

                <Typography className="price">
                  ₹{product.price.toLocaleString('en-IN')}
                  {' '}
                  <del>
                    ₹{product.oldPrice.toLocaleString('en-IN')}
                  </del>
                </Typography>

                <Typography className="rating">
                  ⭐ {product.rating}
                </Typography>

                <Button
                  fullWidth
                  className="cart-btn"
                  onClick={() => addCart(product)}
                >
                  <ShoppingCart sx={{ mr: 1 }} />
                  Add to Cart
                </Button>

              </CardContent>

            </Card>

          ))}

          {searchOpen && search && filteredProducts.length === 0 && (
            <Alert severity="info">
              No products found.
            </Alert>
          )}

        </Box>

      </Container>

      {/* ABOUT */}

      <Container id="about" className="section">

        <Box className="banner">

          <Box>
            <Typography variant="h5">
              About GadgetZone
            </Typography>

            <Typography>
              GadgetZone is your one-stop destination for the latest
              and best gadgets. We bring innovation, quality and
              great prices together for a smarter tomorrow.
            </Typography>
          </Box>

          <Typography className="banner-icon">
            🎧
          </Typography>

        </Box>

      </Container>

      {/* OFFERS */}

      <Container id="offers" className="section">

        <Box className="offer">

          <Box>
            <Typography variant="h5">
              Special Offers!
            </Typography>

            <Typography>Get up to</Typography>

            <Typography variant="h2">
              50% OFF
            </Typography>

            <Button href="#products">
              Grab Now →
            </Button>
          </Box>

          <Typography className="banner-icon">
            🎁
          </Typography>

        </Box>

      </Container>

      {/* CONTACT */}

      <Container id="contact" className="section">

        <Box className="contact">

          <Typography variant="h5">
            Contact Us
          </Typography>

          <Box
            component="form"
            onSubmit={handleContact}
            className="contact-form"
          >

            <TextField
              label="Your Name"
              required
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
            />

            <TextField
              label="Your Email"
              type="email"
              required
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
            />

            <TextField
              label="Your Message"
              multiline
              rows={3}
              required
              className="message-field"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <Button type="submit" className="send-btn">
              Send Message →
            </Button>

          </Box>

          {contactSuccess && (
            <Alert severity="success" sx={{ mt: 2 }}>
              {contactSuccess}
            </Alert>
          )}

        </Box>

      </Container>

      {/* FOOTER */}

      <Box component="footer" className="footer">

        <Typography variant="h5">
          🛍️ Gadget<span>Zone</span>
        </Typography>

        <Typography>
          Shop Smart. Live Better.
        </Typography>

        <Typography>
          Home | Categories | Offers | About | Contact
        </Typography>

        <Typography>
          © 2026 GadgetZone. All rights reserved.
        </Typography>

      </Box>

      {/* LOGIN / SIGNUP */}

      <Dialog
        open={loginOpen}
        onClose={closeLogin}
        fullWidth
        maxWidth="xs"
        PaperProps={{ className: 'login-card' }}
      >

        <DialogContent>

          <IconButton className="close-btn" onClick={closeLogin}>
            <Close />
          </IconButton>

          <Typography variant="h5" align="center" fontWeight="bold">
            🛍️ Gadget<span className="pink">Zone</span>
          </Typography>

          <Typography className="login-icon">
            🛒
          </Typography>

          <Typography variant="h5" align="center" fontWeight="bold">
            {signup ? 'Create Account' : 'Login to GadgetZone'}
          </Typography>

          <Typography align="center" className="login-description">
            Access your account and continue shopping
          </Typography>

          <Box
            component="form"
            onSubmit={signup ? handleSignup : handleLogin}
          >

            <TextField
              fullWidth
              label="Username"
              placeholder="Enter username"
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            {signup && (
              <TextField
                fullWidth
                label="Email"
                type="email"
                placeholder="Enter email"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            )}

            <TextField
              fullWidth
              label="Password"
              placeholder="Minimum 8 characters"
              type={showPassword ? 'text' : 'password'}
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            {success && (
              <Alert severity="success" sx={{ mt: 2 }}>
                {success}
              </Alert>
            )}

            <Button
              fullWidth
              type="submit"
              className="submit-btn"
            >
              {signup ? 'Sign Up →' : 'Login →'}
            </Button>

          </Box>

          <Typography align="center" className="or">
            ──────── or ────────
          </Typography>

          <Typography align="center">
            {signup
              ? 'Already have an account?'
              : "Don't have an account?"}

            {' '}

            <Button
              onClick={() => {
                setSignup(!signup);
                setError('');
                setSuccess('');
                setPassword('');
              }}
              className="signup-link"
            >
              {signup ? 'Login' : 'Sign Up'}
            </Button>
          </Typography>

          <Box className="validation">

            <Typography fontWeight="bold">
              🛡️ Validation Rules
            </Typography>

            <Typography>🟢 Username: Letters & Numbers only</Typography>
            <Typography>🟢 Password: Minimum 8 characters</Typography>
            <Typography>🟢 Email: Valid email format</Typography>

          </Box>

        </DialogContent>

      </Dialog>

    </Box>
  );
}

export default App;
