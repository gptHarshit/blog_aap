const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectDB } = require('./config/database');
const postRouter = require('./routes/post');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;

// ✅ Allowed origins list banao
const allowedOrigins = [
  "http://localhost:3000",
  "https://blog-aap-psi.vercel.app",
  "https://blog-4k36t2qn3-gptharshits-projects.vercel.app"
];

// ✅ CORS middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ['GET','POST','PUT','DELETE'],
    credentials: true,
  })
);

app.use('/api/posts', postRouter);

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
