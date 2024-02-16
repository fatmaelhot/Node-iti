const express = require('express');
const mongoose = require('mongoose');
const todosRoutes =require('./routes/todosRoutes')
const usersRoutes =require('./routes/usersRoutes')
 

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/iti_todo');

 

app.use(express.json());
app.use('/todos', todosRoutes );
app.use('/users', usersRoutes );
 

//general error
app.use((err, req, res, next) => {
  res.status(err.status).json({ error: err.message });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
