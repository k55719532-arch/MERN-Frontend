import React, { useState } from 'react';
import { Box, AppBar, Toolbar, Typography, Button, TextField, Card, CardContent, Chip, IconButton, Badge, Container } from '@mui/material';
import { Search, ShoppingCart, ArrowForward, Star, Send } from '@mui/icons-material';

function Home({ onGoLogin, onGoCart, onGoOrders, cartCount, onAddToCart, loggedUser }) {
  const [search, setSearch] = useState('');
  const [active, setActive] = useState('home');

  // CLICK PANNA LINE MAARUM + SCROLL AAGUM
  const goTo = (id) => {
    setActive(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // ACTIVE LINK KU PINK LINE, OTHERS KU LINE ILLA
  const linkStyle = (id) => ({
    cursor: 'pointer',
    fontWeight: active === id ? 700 : 400,
    borderBottom: active === id ? '2px solid #ec4899' : '2px solid transparent',
    pb: 0.3,
  });

  const categories = [
    { name: 'Smartphone', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80', color: '#eef2ff' },
    { name: 'Laptop', img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80', color: '#ffe4e6' },
    { name: 'Headphones', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80', color: '#f3e8ff' },
    { name: 'Smart Watch', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80', color: '#e0e7ff' },
  ];

  const products = [
    { id: 1, name: 'Samsung Galaxy S25', price: 79999, old: 99999, off: '20% OFF', rating: '4.6 (2.5k)', img: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80' },
    { id: 2, name: 'ASUS Vivobook', price: 49999, old: 59999, off: '15% OFF', rating: '4.5 (1.2k)', img: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=600&q=80' },
    { id: 3, name: 'Sony Headphones', price: 14999, old: 19999, off: '25% OFF', rating: '4.7 (1k)', img: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80' },
    { id: 4, name: 'boAt Smart Watch', price: 3499, old: 4999, off: '30% OFF', rating: '4.6 (3k)', img: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80' },
  ];

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <Box sx={{ bgcolor: '#ede9fe', minHeight: '100vh' }}>
      {/* NAVBAR - PINK LINE IPPO MAARUM + PRODUCT ADD PANNITEN */}
      <Box sx={{ bgcolor: '#0f0a2e', color: 'white', px: 2, py: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
        <Typography variant="h6" fontWeight={800} sx={{ fontSize: 20, cursor: 'pointer' }} onClick={() => goTo('home')}>
          🛍️ Gadget<span style={{ color: '#ec4899' }}>Zone</span>
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, fontSize: 14, alignItems: 'center' }}>
          <Typography onClick={() => goTo('home')} sx={linkStyle('home')}>Home</Typography>
          <Typography onClick={() => goTo('categories')} sx={linkStyle('categories')}>Categories</Typography>
          <Typography onClick={() => goTo('products')} sx={linkStyle('products')}>Products</Typography>
          <Typography onClick={() => goTo('offers')} sx={linkStyle('offers')}>Offers</Typography>
          <Typography onClick={() => goTo('about')} sx={linkStyle('about')}>About</Typography>
          <Typography onClick={() => goTo('contact')} sx={linkStyle('contact')}>Contact</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          {loggedUser ? (
            <Chip label={`Hi, ${loggedUser}`} sx={{ bgcolor: 'white', color: '#0f0a2e', fontWeight: 700 }} />
          ) : null}
          <Button onClick={onGoOrders} variant="outlined" size="small" sx={{ borderRadius: 20, textTransform: 'none', px: 2, color: 'white', borderColor: 'white' }}>📦 My Orders</Button>
          <IconButton sx={{ color: 'white' }} onClick={onGoCart}>
            <Badge badgeContent={cartCount} color="secondary"><ShoppingCart /></Badge>
          </IconButton>
          <Button onClick={onGoLogin} variant="contained" color="secondary" size="small" sx={{ borderRadius: 20, textTransform: 'none', px: 2 }}>Login</Button>
        </Box>
      </Box>

      <Container maxWidth="lg" sx={{ pt: 2, pb: 2 }}>
        <Card id="home" sx={{ borderRadius: 3, p: 3, background: '#fff', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 2, scrollMarginTop: 70 }}>
          <Box flex={1}>
            <Typography color="primary" fontWeight={700} fontSize={13}>SMARTER TECH. BRIGHTER YOU.</Typography>
            <Typography variant="h3" fontWeight={900}>Welcome to Gadget<span style={{ color: '#ec4899' }}>Zone</span></Typography>
            <Typography sx={{ my: 1.5 }}>Discover the latest gadgets and upgrade your lifestyle!</Typography>
            <Button variant="contained" color="secondary" sx={{ borderRadius: 20 }} endIcon={<ArrowForward />} onClick={() => goTo('categories')}>Shop Now</Button>
          </Box>
          <Box flex={1} sx={{ width: '100%' }}>
            <img src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80" alt="gadgets" style={{ width: '100%', height: 260, objectFit: 'cover', borderRadius: 20 }} />
          </Box>
        </Card>

        <TextField fullWidth value={search} onChange={e => setSearch(e.target.value)} placeholder="Search gadgets..." sx={{ mt: 2, bgcolor: 'white', borderRadius: 2 }} />

        <Typography id="categories" variant="h6" fontWeight={800} sx={{ mt: 3, mb: 1, scrollMarginTop: 70 }}>Shop by Categories</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {categories.map(c => (
            <Card key={c.name} sx={{ bgcolor: c.color, borderRadius: 3, width: { xs: '48%', md: '23%' }, overflow: 'hidden' }}>
              <img src={c.img} alt={c.name} style={{ width: '100%', height: 125, objectFit: 'cover' }} />
              <CardContent sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                <Typography fontWeight={700}>{c.name}</Typography><span>➜</span>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* PRODUCTS SECTION - ID ADD PANNITEN */}
        <Typography id="products" variant="h6" fontWeight={800} sx={{ mt: 3, mb: 1, scrollMarginTop: 70 }}>Featured Products</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {filtered.map(p => (
            <Card key={p.id} sx={{ borderRadius: 3, position: 'relative', width: { xs: '100%', sm: '48%', md: '23%' } }}>
              <Chip label={p.off} color="secondary" size="small" sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }} />
              <img src={p.img} alt={p.name} style={{ width: '100%', height: 150, objectFit: 'cover', padding: 0, background: 'white' }} />
              <CardContent>
                <Typography fontWeight={700}>{p.name}</Typography>
                <Typography fontWeight={800} color="secondary">₹{p.price.toLocaleString('en-IN')} <span style={{ color: '#999', textDecoration: 'line-through', fontWeight: 400, fontSize: 12 }}>₹{p.old.toLocaleString('en-IN')}</span></Typography>
                <Typography fontSize={12}><Star sx={{ fontSize: 13, color: '#f59e0b' }} /> {p.rating}</Typography>
                <Button fullWidth variant="contained" sx={{ mt: 1, bgcolor: '#0f0a2e', borderRadius: 20 }} onClick={() => onAddToCart(p)}>Add to Cart</Button>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
          <Card id="about" sx={{ borderRadius: 4, p: 0, width: { xs: '100%', md: '48%' }, overflow: 'hidden', display: 'flex', flexDirection: 'column', scrollMarginTop: 70 }}>
            <Box sx={{ background: 'linear-gradient(135deg,#0f0a2e 0%,#4c1d95 100%)', color: 'white', p: 2.5, position: 'relative', overflow: 'hidden' }}>
              <Box sx={{ position: 'absolute', right: -20, top: -20, width: 120, height: 120, bgcolor: 'rgba(236,72,153,0.3)', borderRadius: '50%' }} />
              <Box sx={{ position: 'absolute', right: 40, bottom: -30, width: 80, height: 80, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: '50%' }} />
              <Chip label="✨ TRUSTED SINCE 2020" size="small" sx={{ bgcolor: '#ec4899', color: 'white', fontWeight: 700, fontSize: 10 }} />
              <Typography variant="h5" fontWeight={900} sx={{ mt: 1 }}>Why GadgetZone? 🤔</Typography>
              <Typography fontSize={13} sx={{ opacity: 0.9, mt: 0.5, lineHeight: 1.6 }}>India's most loved gadget store! 100% Original products, Best Price Guarantee & Super-fast delivery</Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                <Box sx={{ bgcolor: 'rgba(255,255,255,0.15)', borderRadius: 2, p: 1, textAlign: 'center', flex: 1 }}>
                  <Typography fontWeight={900} fontSize={16}>10K+</Typography>
                  <Typography fontSize={10}>Happy Customers</Typography>
                </Box>
                <Box sx={{ bgcolor: 'rgba(255,255,255,0.15)', borderRadius: 2, p: 1, textAlign: 'center', flex: 1 }}>
                  <Typography fontWeight={900} fontSize={16}>500+</Typography>
                  <Typography fontSize={10}>Products</Typography>
                </Box>
                <Box sx={{ bgcolor: 'rgba(255,255,255,0.15)', borderRadius: 2, p: 1, textAlign: 'center', flex: 1 }}>
                  <Typography fontWeight={900} fontSize={16}>4.8 ★</Typography>
                  <Typography fontSize={10}>Avg Rating</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 1, mt: 1.5, flexWrap: 'wrap' }}>
                <Chip label="✓ Free Delivery" size="small" sx={{ bgcolor: 'white', fontSize: 11, fontWeight: 600 }} />
                <Chip label="✓ 7-Day Return" size="small" sx={{ bgcolor: 'white', fontSize: 11, fontWeight: 600 }} />
                <Chip label="✓ 1-Year Warranty" size="small" sx={{ bgcolor: 'white', fontSize: 11, fontWeight: 600 }} />
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 1.5, bgcolor: 'white' }}>
              <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=200&q=80" alt="" style={{ width: 55, height: 55, borderRadius: 12, objectFit: 'cover' }} />
              <Box sx={{ flex: 1 }}>
                <Typography fontWeight={800} fontSize={13}>Join 10,000+ Tech Lovers!</Typography>
                <Typography fontSize={11} sx={{ color: '#666' }}>Best gadgets, best price - That's GadgetZone!</Typography>
              </Box>
              <Button size="small" variant="contained" sx={{ bgcolor: '#0f0a2e', borderRadius: 20, textTransform: 'none', whiteSpace: 'nowrap' }}>Learn More →</Button>
            </Box>
          </Card>

          <Card id="offers" sx={{ borderRadius: 4, p: 0, width: { xs: '100%', md: '48%' }, overflow: 'hidden', position: 'relative', background: 'linear-gradient(135deg,#ff0055 0%,#ff6a00 50%,#ffb800 100%)', color: 'white', scrollMarginTop: 70 }}>
            <Box sx={{ position: 'absolute', right: -30, top: -30, width: 140, height: 140, bgcolor: 'rgba(255,255,255,0.2)', borderRadius: '50%' }} />
            <Box sx={{ position: 'absolute', left: -20, bottom: -20, width: 90, height: 90, bgcolor: 'rgba(0,0,0,0.1)', borderRadius: '50%' }} />
            <Box sx={{ p: 2.5, position: 'relative' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Chip label="🔥 LIMITED TIME ONLY" size="small" sx={{ bgcolor: 'white', color: '#ff0055', fontWeight: 800, fontSize: 10 }} />
                  <Typography variant="h5" fontWeight={900} sx={{ mt: 1, lineHeight: 1.1 }}>DIWALI DHAMAKA<br />SALE! 🪔</Typography>
                  <Typography fontSize={13} sx={{ mt: 0.5 }}>Get up to <b>50% OFF</b> + Extra ₹500 Off</Typography>
                </Box>
                <Typography sx={{ fontSize: 55, lineHeight: 1 }}>🎁</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1, mt: 1.5, alignItems: 'center' }}>
                <Box sx={{ bgcolor: 'black', borderRadius: 1.5, px: 1.2, py: 0.7, textAlign: 'center' }}><Typography fontWeight={900} fontSize={15}>02</Typography><Typography fontSize={9}>DAYS</Typography></Box>
                <Typography fontWeight={900}>:</Typography>
                <Box sx={{ bgcolor: 'black', borderRadius: 1.5, px: 1.2, py: 0.7, textAlign: 'center' }}><Typography fontWeight={900} fontSize={15}>14</Typography><Typography fontSize={9}>HRS</Typography></Box>
                <Typography fontWeight={900}>:</Typography>
                <Box sx={{ bgcolor: 'black', borderRadius: 1.5, px: 1.2, py: 0.7, textAlign: 'center' }}><Typography fontWeight={900} fontSize={15}>30</Typography><Typography fontSize={9}>MINS</Typography></Box>
                <Typography fontSize={11} sx={{ ml: 0.5, fontWeight: 600 }}>Hurry! Offer ends soon!</Typography>
              </Box>
              <Box sx={{ bgcolor: 'rgba(255,255,255,0.95)', borderRadius: 2, p: 1.2, mt: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'black' }}>
                <Box>
                  <Typography fontSize={10} sx={{ color: '#666' }}>USE COUPON CODE</Typography>
                  <Typography fontWeight={900} fontSize={16} sx={{ letterSpacing: 1, color: '#ff0055' }}>GADGET50</Typography>
                </Box>
                <Button size="small" variant="contained" sx={{ bgcolor: '#0f0a2e', borderRadius: 20, textTransform: 'none', fontSize: 12, px: 2 }}>Grab Now →</Button>
              </Box>
            </Box>
          </Card>
        </Box>

        <Card id="contact" sx={{ p: 2, borderRadius: 3, mt: 2, scrollMarginTop: 70 }}>
          <Typography fontWeight={800} sx={{ mb: 1 }}>Contact Us 📩</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            <TextField size="small" placeholder="Your Name" sx={{ flex: 1 }} />
            <TextField size="small" placeholder="Your Email" sx={{ flex: 1 }} />
            <TextField size="small" placeholder="Your Message" sx={{ flex: 1 }} />
          </Box>
          <Box textAlign="right" sx={{ mt: 1 }}><Button variant="contained" color="secondary" size="small" endIcon={<Send />} sx={{ borderRadius: 20 }}>Send Message</Button></Box>
        </Card>
      </Container>

      <Box sx={{ bgcolor: '#0f0a2e', color: 'white', p: 3 }}>
        <Container maxWidth="lg" sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 2 }}>
          <Box><Typography fontWeight={800}>Gadget<span style={{ color: '#ec4899' }}>Zone</span></Typography><Typography fontSize={12}>Shop Smart. Live Better.</Typography></Box>
          <Box><Typography fontWeight={700} fontSize={13}>Quick Links</Typography><Typography fontSize={12} onClick={() => goTo('home')} sx={{ cursor: 'pointer' }}>Home<br /></Typography><Typography fontSize={12} onClick={() => goTo('categories')} sx={{ cursor: 'pointer' }}>Categories<br /></Typography><Typography fontSize={12} onClick={() => goTo('products')} sx={{ cursor: 'pointer' }}>Products<br /></Typography><Typography fontSize={12} onClick={() => goTo('offers')} sx={{ cursor: 'pointer' }}>Offers</Typography></Box>
          <Box><Typography fontWeight={700} fontSize={13}>Support</Typography><Typography fontSize={12} onClick={() => goTo('about')} sx={{ cursor: 'pointer' }}>About<br /></Typography><Typography fontSize={12} onClick={() => goTo('contact')} sx={{ cursor: 'pointer' }}>Contact<br /></Typography><Typography fontSize={12}>FAQ</Typography></Box>
          <Box><Typography fontWeight={700} fontSize={13}>Follow Us</Typography><Typography fontSize={12}>Instagram | Facebook | Twitter</Typography></Box>
        </Container>
        <Typography fontSize={11} sx={{ textAlign: 'right', mt: 2 }}>© 2026 GadgetZone. All rights reserved.</Typography>
      </Box>
    </Box>
  );
}
export default Home;