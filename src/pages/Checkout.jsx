import React, { useState } from 'react';
import { Box, Card, Typography, TextField, Button, Alert, Radio, RadioGroup, FormControlLabel } from '@mui/material';

function Checkout({ cart, onBack, onSuccess }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [payment, setPayment] = useState('Cash on Delivery');
  const [errorMsg, setErrorMsg] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  const total = cart.reduce((sum, item) => sum + (item.price || 0), 0);
  const delivery = total > 0 ? 49 : 0;
  const grandTotal = total + delivery;

  const handlePlaceOrder = () => {
    if (!name) { setErrorMsg('Please enter Full Name!'); return; }
    if (phone.length !== 10) { setErrorMsg('Please enter 10-digit Phone Number!'); return; }
    if (!address) { setErrorMsg('Please enter Full Address!'); return; }
    if (!city) { setErrorMsg('Please enter City!'); return; }
    if (pincode.length !== 6) { setErrorMsg('Please enter 6-digit Pincode!'); return; }
    if (cart.length === 0) { setErrorMsg('Your cart is empty!'); return; }

    const newOrderId = 'GZ' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(newOrderId);

    // SAVE ORDER
    const newOrder = {
      id: newOrderId,
      items: cart,
      total: grandTotal,
      name: name,
      phone: phone,
      address: address,
      city: city,
      pincode: pincode,
      payment: payment,
      date: new Date().toLocaleDateString(),
      status: 'Order Placed'
    };

    try {
      const oldOrders = JSON.parse(localStorage.getItem('gadget_orders') || '[]');
      oldOrders.push(newOrder);
      localStorage.setItem('gadget_orders', JSON.stringify(oldOrders));
    } catch (e) {}

    setErrorMsg('');
    setOrderPlaced(true);

    setTimeout(() => {
      if (onSuccess) onSuccess();
    }, 2500);
  };

  if (orderPlaced) {
    return (
      <Box sx={{ minHeight: '100vh', background: '#f0fdf4', display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
        <Card sx={{ maxWidth: 440, width: '100%', borderRadius: 4, p: 4, textAlign: 'center' }}>
          <Typography fontSize={70}>✅</Typography>
          <Typography variant="h5" fontWeight={900}>Order Placed!</Typography>
          <Typography sx={{ mt: 1 }}>Thank you, {name}!</Typography>
          <Typography fontWeight={700} sx={{ mt: 1 }}>Order ID: {orderId}</Typography>
          <Typography sx={{ mt: 1 }}>Total Paid: ₹{grandTotal}</Typography>
          <Typography sx={{ mt: 1, fontSize: 13, color: 'text.secondary' }}>Payment: {payment}</Typography>
          <Typography sx={{ mt: 1, fontSize: 13, color: 'text.secondary' }}>Delivery to: {address}, {city} - {pincode}</Typography>
          <Typography sx={{ mt: 2, color: 'green', fontWeight: 700 }}>Going to Home...</Typography>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', background: '#f8f7ff', p: 2 }}>
      <Box sx={{ maxWidth: 600, margin: 'auto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" fontWeight={900}>🛍️ GadgetZone - Checkout</Typography>
          <Button onClick={onBack}>✕</Button>
        </Box>

        {errorMsg && <Alert severity="error" sx={{ mb: 2 }}>{errorMsg}</Alert>}

        <Card sx={{ borderRadius: 3, p: 3, mb: 2 }}>
          <Typography variant="h6" fontWeight={800} sx={{ mb: 2 }}>Delivery Address</Typography>
          <TextField fullWidth value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" sx={{ mb: 1.5 }} />
          <TextField fullWidth value={phone} onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))} placeholder="Phone Number - 10 digits" sx={{ mb: 1.5 }} />
          <TextField fullWidth multiline rows={2} value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Full Address - House No, Street" sx={{ mb: 1.5 }} />
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <TextField fullWidth value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
            <TextField fullWidth value={pincode} onChange={(e) => setPincode(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))} placeholder="Pincode - 6 digits" />
          </Box>
        </Card>

        <Card sx={{ borderRadius: 3, p: 3, mb: 2 }}>
          <Typography variant="h6" fontWeight={800} sx={{ mb: 1 }}>Payment Method</Typography>
          <RadioGroup value={payment} onChange={(e) => setPayment(e.target.value)}>
            <FormControlLabel value="Cash on Delivery" control={<Radio color="secondary" />} label="💵 Cash on Delivery" />
            <FormControlLabel value="UPI" control={<Radio color="secondary" />} label="📱 UPI - GPay / PhonePe / Paytm" />
            <FormControlLabel value="Card" control={<Radio color="secondary" />} label="💳 Debit / Credit Card" />
          </RadioGroup>
        </Card>

        <Card sx={{ borderRadius: 3, p: 3, mb: 2 }}>
          <Typography variant="h6" fontWeight={800} sx={{ mb: 1 }}>Order Summary - {cart.length} Items</Typography>
          {cart.map((item, index) => (
            <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5 }}>
              <Typography fontSize={14}>{item.name || item.title}</Typography>
              <Typography fontSize={14} fontWeight={700}>₹{item.price}</Typography>
            </Box>
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography>Delivery Charge</Typography>
            <Typography>₹{delivery}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, borderTop: '1px solid #eee', pt: 1 }}>
            <Typography fontWeight={900}>Total to Pay</Typography>
            <Typography fontWeight={900} color="#7c3aed">₹{grandTotal}</Typography>
          </Box>
        </Card>

        <Button fullWidth onClick={handlePlaceOrder} variant="contained" sx={{ py: 1.5, borderRadius: 3, background: 'linear-gradient(90deg,#7c3aed,#ec4899)', textTransform: 'none', fontSize: 18, fontWeight: 800 }}>
          Place Order - ₹{grandTotal} →
        </Button>
      </Box>
    </Box>
  );
}

export default Checkout;