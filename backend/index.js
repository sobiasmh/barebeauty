const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const {errorHandler} = require('./middleware/errorMiddleware');
const authJwt = require('./middleware/authMiddleware');
require('dotenv/config');

app.use(cors());
app.options('*', cors());
//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandler);
//routers

const productRouter = require('./routers/productRouter');
const usersRouter = require('./routers/usersRouter');
const ordersRouter = require('./routers/ordersRouter');
const categoryRouter = require('./routers/categoryRouter');

const api = process.env.API_URL;


app.use(`${api}/products`, productRouter);
app.use(`${api}/users`, usersRouter);
app.use(`${api}/orders`, ordersRouter);
app.use(`${api}/categories`, categoryRouter);





mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'BareBeauty'
})
.then(()=>{
    console.log("Database Connection is ready")
})
.catch((err)=>{
    console.log(err)
});

app.listen(5000, ()=>{
    console.log(api);
    console.log('server is running http://localhost:5000');
})