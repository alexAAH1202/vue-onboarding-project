const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// User info endpoint
app.get('/api/user-info', authenticateToken, (req, res) => {
  // In a real application, you would fetch this data from a database
  const userInfo = {
    businessName: 'Acme Corp',
    businessAddress: '123 Business St, Sydney NSW 2000',
    abnAcn: '12 345 678 901',
    subscriptionTier: 'Professional',
    billingFrequency: 'Monthly',
    basePrice: 99.99,
    gst: 10.00,
    totalPrice: 109.99,
    nextPaymentDate: '2023-05-01'
  };

  res.json(userInfo);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
