const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = 'your_secret_key'; // In production, use a secure, environment-specific secret

app.use(cors());
app.use(bodyParser.json());

// Mock user data (replace with database in production)
const users = [
  {
    id: 1,
    email: 'user@example.com',
    password: 'password123', // In production, store hashed passwords
    businessName: 'Example Business',
    businessAddress: '123 Business St, City, Country',
    abnAcn: '12 345 678 901',
    subscriptionTier: 'Solo Practitioner',
    subscriptionLength: 'Yearly'
  }
];

// Login endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        businessName: user.businessName
      }
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }
    req.userId = decoded.userId;
    next();
  });
};

// Protected user data endpoint
app.get('/api/user', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.userId);
  if (user) {
    res.json({
      id: user.id,
      email: user.email,
      businessName: user.businessName,
      businessAddress: user.businessAddress,
      abnAcn: user.abnAcn,
      subscriptionTier: user.subscriptionTier,
      subscriptionLength: user.subscriptionLength
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
