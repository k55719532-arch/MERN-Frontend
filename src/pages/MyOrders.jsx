import React, { useState, useEffect } from 'react';
import { Box, Card, Typography, Button, Chip } from '@mui/material';

function MyOrders({ onBack, onGoHome }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('gadget_orders') || '[]');
      setOrders(saved.reverse());
    } catch (e) {
      setOrders([]);
    }
  }, []);

  const cancelOrder = (orderId) => {
    if (!window.confirm('Cancel this order?')) return;
    const updated = orders.map((o) => {
      if (o.id === orderId) return { ...o, status: 'Cancelled' };
      return o;
    });
    setOrders(updated);
    // Save back - reverse again to keep original order
    localStorage.setItem('gadget_orders', JSON.stringify([...updated].reverse()));
  };

  if (orders.length === 0) {
    return (
      <Box sx={{ minHeight: '100vh', background: '#f8f7ff', display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
        <Card sx={{ maxWidth: 440, width: '100%', borderRadius: 4, p: 4, textAlign: 'center' }}>
          <Typography fontSize={70}>📦</Typography>
          <Typography variant="h5" fontWeight={900}>No Orders Yet</Typography>
          <Typography sx={{ mt: 1, color: 'text.secondary', fontSize: 14 }}>You have not placed any order yet.</Typography>
          <Button fullWidth onClick={onGoHome} variant="contained" sx={{ mt: 3, py: 1.2, borderRadius: 3, background: 'linear-gradient(90deg,#7c3aed,#ec4899)', textTransform: 'none', fontWeight: 700 }}>
            Shop Now →
          </Button>
          <Button fullWidth onClick={onBack} sx={{ mt: 1 }}>Back</Button>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', background: '#f8f7ff', p: 2 }}>
      <Box sx={{ maxWidth: 650, margin: 'auto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" fontWeight={900}>📦 My Orders - {orders.length}</Typography>
          <Button onClick={onBack}>✕</Button>
        </Box>

        {orders.map((order, index) => (
          <Card key={index} sx={{ borderRadius: 3, p: 2.5, mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography fontWeight={900}>Order ID: {order.id}</Typography>
              <Chip label={order.status} color={order.status === 'Cancelled' ? 'error' : 'success'} size="small" sx={{ fontWeight: 700 }} />
            </Box>
            <Typography fontSize={13} color="text.secondary" sx={{ mt: 0.5 }}>Date: {order.date} | Payment: {order.payment}</Typography>
            <Typography fontSize={13} color="text.secondary">Delivery: {order.name}, {order.address}, {order.city} - {order.pincode}</Typography>

            <Box sx={{ borderTop: '1px solid #eee', mt: 1.5, pt: 1.5 }}>
              {order.items && order.items.map((item, i) => (
                <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', py: 0.3 }}>
                  <Typography fontSize={14}>• {item.name || item.title}</Typography>
                  <Typography fontSize={14} fontWeight={700}>₹{item.price}</Typography>
                </Box>
              ))}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1.5, borderTop: '1px solid #eee', pt: 1.5 }}>
              <Typography fontWeight={900}>Total: ₹{order.total}</Typography>
              {order.status !== 'Cancelled' && (
                <Button size="small" color="error" variant="outlined" onClick={() => cancelOrder(order.id)}>
                  Cancel Order
                </Button>
              )}
            </Box>
          </Card>
        ))}

        <Button fullWidth onClick={onGoHome} variant="contained" sx={{ py: 1.2, borderRadius: 3, background: 'linear-gradient(90deg,#7c3aed,#ec4899)', textTransform: 'none', fontWeight: 700 }}>
          Continue Shopping →
        </Button>
      </Box>
    </Box>
  );
}

export default MyOrders;