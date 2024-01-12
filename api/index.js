const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const categoryRoute = require('./routes/category')
const multer = require('multer')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser');
const { protect } = require('./routes/jwt');

app.use(cors())
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
dotenv.config();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use("/images", express.static(path.join(__dirname, "images")))

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err));

const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, "images")
    },
    filename: (req, file, cb)=>{
        cb(null, req.body.name)
    }
})

const upload = multer({storage:storage})
app.post('/api/upload', upload.single('file'), (req, res)=>{
    res.status(200).json("Image has been uploaded")
})

app.use('/api/auth', authRoute);
app.use('/api/users',  userRoute); 
app.use('/api/posts', postRoute)
app.use('/api/categories', categoryRoute)

app.listen(5000, () => {
  console.log('App is running on port 5000');
});
