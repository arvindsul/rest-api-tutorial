const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//const MONGO_URI = require('./config');
const MONGO_URI = "mongodb://localhost:27017/rest-api-test";
const postRoutes = require("./routes/api/posts");
const userRoutes = require("./routes/api/users");
const app =  express();
// mongodb connection here

// body parser middleware
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(MONGO_URI,
    { useNewUrlParser: true,
      useUnifiedTopology:true 
    })
       .then(()=>{console.log('mongo db has conneced')}).catch((e)=>{console.log(e)})
//AA9LFG0D1Scs4jTn
app.get("/", (req, res)=>{
    res.send('hello world');
})
app.use('/api/users', userRoutes);
// used in post Api
app.use('/api/posts',postRoutes);
// Used for user api request

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{console.log(`server running on port ${PORT}`)})
