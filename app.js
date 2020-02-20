const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const productRouter = require('./api/routes/products');
const orderRouter = require('./api/routes/orders');
const userRouter = require('./api/routes/users');

app.use(logger('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/test',{ useNewUrlParser: true,useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);
app.use( (req, res, next) => {
    res.header('Access-Control-Allow-Origin' , '*');
    res.header('Access-Control-Allow-Headers','*');
    if(req.method == 'OPTION') {
        res.header('Acess-Control-Allow-Origin', 'GET, POST, PATCH, DELLETE');
        return res.status(200).json({});
    }
    next();
});

app.use('/api/products',productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/users',userRouter);

app.use( (req, res, next) => {
    const error = new Error("No Route Found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error : {
            message : error.message,
            errorCode : error.status,
        }
    });
});

module.exports = app ;
