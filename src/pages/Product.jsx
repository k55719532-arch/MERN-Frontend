import React, { useState } from 'react';
import { Box, Card, Typography, Button, Chip, Divider, IconButton } from '@mui/material';
import { ArrowBack, Star, ShoppingCart, Favorite, FavoriteBorder, LocalShipping, Shield, Replay } from '@mui/icons-material';

function ProductDetails({ product, onBack, onAddToCart, onGoCart }) {
  const [qty, setQty] = useState(1);
  const [liked, setLiked] = useState(false);
  const [selectedImg, setSelectedImg] = useState(0);

  if (!product) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography>Product not found. <Button onClick={onBack}>Go Back</Button></Typography>
      </Box>
    );
  }

  const images = [product.img, product.img, product.img];
  const total = product.price * qty;

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) {
      onAddToCart(product);
    }
    if (onGoCart) onGoCart();
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg,#ede9fe,#ddd6fe,#fbcfe8)', p: 2 }}>
      <Box sx={{ maxWidth: 1000, margin: '0 auto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" fontWeight={900}>🛍️ Gadget<span style={{ color: '#ec4899' }}>Zone</span></Typography>
          <Button onClick={onBack} size="small">✕ Close</Button>
        </Box>

        <Button startIcon={<ArrowBack />} onClick={onBack} sx={{ color: '#666', textTransform: 'none', mb: 1 }}>Back to Home</Button>

        <Card sx={{ borderRadius: 4, p: 3, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, boxShadow: '0 10px 40px rgba(0,0,0,0.12)' }}>
          {/* LEFT - IMAGES */}
          <Box sx={{ flex: 1 }}>
            <Box sx={{ position: 'relative' }}>
              <img src={images[selectedImg]} alt={product.name} style={{ width: '100%', height: 320, objectFit: 'cover', borderRadius: 16 }} />
              <Chip label={product.off} color="secondary" sx={{ position: 'absolute', top: 12, left: 12, fontWeight: 800 }} />
              <IconButton onClick={() => setLiked(!liked)} sx={{ position: 'absolute', top: 10, right: 10, bgcolor: 'white' }}>
                {liked ? <Favorite sx={{ color: '#ec4899' }} /> : <FavoriteBorder />}
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, mt: 1.5 }}>
              {images.map((img, i) => (
                <img key={i} src={img} onClick={() => setSelectedImg(i)} alt="" style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 10, cursor: 'pointer', border: selectedImg === i ? '3px solid #ec4899' : '2px solid #e5e7eb' }} />
              ))}
            </Box>
          </Box>

          {/* RIGHT - DETAILS */}
          <Box sx={{ flex: 1.1 }}>
            <Typography variant="h5" fontWeight={900}>{product.name}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
              <Chip label="4.6 ★" size="small" sx={{ bgcolor: '#16a34a', color: 'white', fontWeight: 800 }} />
              <Typography fontSize={13} color="text.secondary">{product.rating} Ratings | 500+ Bought</Typography>
            </Box>

            <Typography sx={{ mt: 1.5 }}>
              <span style={{ fontSize: 28, fontWeight: 900, color: '#7c3aed' }}>₹{product.price.toLocaleString('en-IN')}</span>
              <span style={{ color: '#999', textDecoration: 'line-through', marginLeft: 8 }}>₹{product.old.toLocaleString('en-IN')}</span>
              <span style={{ color: '#16a34a', fontWeight: 800, marginLeft: 8 }}>{product.off}</span>
            </Typography>
            <Typography fontSize={12} sx={{ color: '#16a34a', fontWeight: 700 }}>Inclusive of all taxes | Free Delivery</Typography>

            <Divider sx={{ my: 2 }} />

            <Typography fontWeight={800} sx={{ mb: 1 }}>About this product</Typography>
            <Typography fontSize={13} color="text.secondary" sx={{ lineHeight: 1.7 }}>
              • 100% Original Product with 1 Year Warranty<br />
              • Best quality, tested and verified by GadgetZone<br />
              • Fast delivery in 2-3 days across India<br />
              • 7-Day Easy Return and Replacement
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Typography fontWeight={800} fontSize={14}>Quantity:</Typography>
              <Button variant="outlined" onClick={() => setQty(Math.max(1, qty - 1))} sx={{ minWidth: 35, borderRadius: 2 }}>-</Button>
              <Typography fontWeight={900}>{qty}</Typography>
              <Button variant="outlined" onClick={() => setQty(qty + 1)} sx={{ minWidth: 35, borderRadius: 2 }}>+</Button>
              <Typography fontSize={13} sx={{ color: '#666' }}>Total: <b>₹{total.toLocaleString('en-IN')}</b></Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <Button fullWidth variant="contained" startIcon={<ShoppingCart />} onClick={handleAdd} sx={{ borderRadius: 3, background: 'linear-gradient(90deg,#7c3aed,#ec4899)', textTransform: 'none', fontWeight: 800, py: 1.2 }}>Add to Cart</Button>
              <Button fullWidth variant="outlined" onClick={handleAdd} sx={{ borderRadius: 3, textTransform: 'none', fontWeight: 800, borderColor: '#7c3aed', color: '#7c3aed', py: 1.2 }}>Buy Now →</Button>
            </Box>

            <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap' }}>
              <Chip icon={<LocalShipping />} label="Free Delivery" size="small" sx={{ bgcolor: '#eff6ff' }} />
              <Chip icon={<Shield />} label="1 Year Warranty" size="small" sx={{ bgcolor: '#f0fdf4' }} />
              <Chip icon={<Replay />} label="7-Day Return" size="small" sx={{ bgcolor: '#fdf2f8' }} />
            </Box>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}
export default ProductDetails;