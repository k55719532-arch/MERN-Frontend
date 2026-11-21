import React from 'react';
import { Box, Card, Typography, Button, IconButton, Divider } from '@mui/material';
import { ArrowBack, Delete, ShoppingCart, ArrowForward } from '@mui/icons-material';

function Cart({ cart, onBack, onRemove, onGoCheckout }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const delivery = cart.length > 0 ? 0 : 0;
  const grandTotal = total + delivery;

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg,#ede9fe,#ddd6fe,#fbcfe8)', p: 2 }}>
      <Box sx={{ maxWidth: 800, margin: '0 auto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" fontWeight={900}>🛍️ Gadget<span style={{ color: '#ec4899' }}>Zone</span></Typography>
          <Button onClick={onBack} size="small">✕ Close</Button>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Button startIcon={<ArrowBack />} onClick={onBack} sx={{ color: '#666', textTransform: 'none' }}>Continue Shopping</Button>
        </Box>

        <Typography variant="h5" fontWeight={900} sx={{ mb: 0.5 }}>🛒 My Cart ({cart.length})</Typography>
        <Typography fontSize={13} color="text.secondary" sx={{ mb: 2 }}>Review your items before checkout</Typography>

        {cart.length === 0 ? (
          <Card sx={{ borderRadius: 4, p: 4, textAlign: 'center', boxShadow: '0 10px 40px rgba(0,0,0,0.12)' }}>
            <Typography fontSize={70}>🛒</Typography>
            <Typography variant="h6" fontWeight={800}>Your Cart is Empty</Typography>
            <Typography fontSize={13} color="text.secondary" sx={{ mb: 2 }}>Looks like you have not added anything yet.</Typography>
            <Button variant="contained" onClick={onBack} sx={{ borderRadius: 3, background: 'linear-gradient(90deg,#7c3aed,#ec4899)', textTransform: 'none', fontWeight: 700 }}>Shop Now →</Button>
          </Card>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, alignItems: 'flex-start' }}>
            {/* LEFT - ITEMS */}
            <Box sx={{ flex: 1.5, display: 'flex', flexDirection: 'column', gap: 1.5, width: '100%' }}>
              {cart.map((item, index) => (
                <Card key={index} sx={{ borderRadius: 3, p: 1.5, display: 'flex', gap: 1.5, alignItems: 'center', boxShadow: '0 5px 20px rgba(0,0,0,0.08)' }}>
                  <img src={item.img} alt={item.name} style={{ width: 90, height: 90, objectFit: 'cover', borderRadius: 12 }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography fontWeight={800} fontSize={14}>{item.name}</Typography>
                    <Typography fontSize={12} color="text.secondary">⭐ {item.rating}</Typography>
                    <Typography fontSize={11} sx={{ bgcolor: '#dcfce7', color: '#166534', display: 'inline-block', px: 1, borderRadius: 1, fontWeight: 700, mt: 0.5 }}>{item.off}</Typography>
                    <Typography fontWeight={900} sx={{ mt: 0.5 }}>₹{item.price.toLocaleString('en-IN')} <span style={{ color: '#999', textDecoration: 'line-through', fontWeight: 400, fontSize: 12 }}>₹{item.old.toLocaleString('en-IN')}</span></Typography>
                  </Box>
                  <IconButton onClick={() => onRemove(index)} sx={{ color: '#ef4444' }}><Delete /></IconButton>
                </Card>
              ))}
            </Box>

            {/* RIGHT - PRICE SUMMARY */}
            <Card sx={{ borderRadius: 3, p: 2.5, width: { xs: '100%', md: 280 }, position: 'sticky', top: 10, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
              <Typography fontWeight={900} fontSize={16} sx={{ mb: 1.5 }}>Price Details</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography fontSize={13}>Price ({cart.length} items)</Typography>
                <Typography fontSize={13}>₹{total.toLocaleString('en-IN')}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography fontSize={13}>Delivery</Typography>
                <Typography fontSize={13} sx={{ color: '#16a34a', fontWeight: 700 }}>FREE</Typography>
              </Box>
              <Divider sx={{ my: 1.5 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography fontWeight={900}>Total Amount</Typography>
                <Typography fontWeight={900}>₹{grandTotal.toLocaleString('en-IN')}</Typography>
              </Box>
              <Typography fontSize={12} sx={{ color: '#16a34a', fontWeight: 700, mb: 2 }}>You save ₹{(cart.reduce((s, i) => s + (i.old - i.price), 0)).toLocaleString('en-IN')} on this order!</Typography>
              <Button fullWidth onClick={onGoCheckout} variant="contained" endIcon={<ArrowForward />} sx={{ borderRadius: 3, background: 'linear-gradient(90deg,#7c3aed,#ec4899)', textTransform: 'none', fontWeight: 700, py: 1.2 }}>Proceed to Checkout</Button>
              <Typography fontSize={11} color="text.secondary" sx={{ textAlign: 'center', mt: 1 }}>🔒 Safe and Secure Payments</Typography>
            </Card>
          </Box>
        )}
      </Box>
    </Box>
  );
}
export default Cart;