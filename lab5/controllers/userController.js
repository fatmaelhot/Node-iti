// routes/auth.js
 
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User registration
const register= async (req, res) => {
try {
const {  username, firstname, lastname, password } = req.body;
const hashedPassword = await bcrypt.hash(password, 10);
const user = await User.create({ username,firstname, lastname, password: hashedPassword });
await user.save();
res.status(201).json({ message: 'you registered successfully' });
} catch (error) {
    console.log(error.message);
res.status(500).json({ error: 'your registration failed' });
}
};

// User login
const login=async (req, res) => {
try {
const { username, password } = req.body;
const user = await User.findOne({ username });
if (!user) {
return res.status(401).json({ error: 'Authentication failed' });
}
const passwordMatch = await bcrypt.compare(password, user.password);
if (!passwordMatch) {
return res.status(401).json({ error: 'Authentication failed' });
}
const token = jwt.sign({ userId: user._id },'hjhkjkjlklsdklskdojsd87d8ydskj', {
expiresIn: '1h',
});
res.status(200).json({ token });
} catch (error) {
    console.log(error.message);
res.status(500).json({ error: 'Login failed' });
}
};

module.exports = {register,login};