const express = require('express');
const cors = require('cors');
require('dotenv').config();
const {connectDB} = require('./config/database');
const postRouter = require('./routes/post');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;


app.use(cors({
  origin: process.env.CLIENT_URL || '*', 
  methods: ['GET','POST','PUT','DELETE'],
  credentials: true
}));


app.use('/api/posts',postRouter);


app.get('/', (req, res) => {
  res.send('Blogging API running...');
});


connectDB()
  .then(() => {
    console.log("Database Connection Established Successfully");

    app.listen(PORT, () => {
      console.log(`Server is Successfully listening on PORT : ${PORT}`);
    });
  })
  .catch(() => {
    console.log("Cannot Connect with database!!");
  });

