const express = require('express');
const cors = require('cors');
require('dotenv').config();
const {connectDB} = require('./config/database');
const postRouter = require('./routes/post');

const app = express();
app.use(cors());
app.use(express.json());


app.use(cors({
  origin: 'http://localhost:3000', 
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

    app.listen(4000, () => {
      console.log("Server is Successfully listening on PORT : 4000");
    });
  })
  .catch(() => {
    console.log("Cannot Connect with database!!");
  });

