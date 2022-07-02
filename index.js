//registering downloaded ............

const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');



//registering routes.................
const homeRouter = require('./routers/homeRouter');
const productRouter = require('./routers/productRouter');
const reviewRouter = require('./routers/reviewRouter');
const userRouter = require('./routers/userRouter');
const config = require('./config');
const logger = require('./utils/appLogger');
const  auth = require('./utils/auth');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyparser.json());

// below code is written if log file is deleted
const dir = path.join(__dirname,'logs');
if (!fs.existsSync(dir)){
      //create a file
  fs.mkdirSync(dir);
}
////////////

const filePath = path.join (__dirname,'logs','request.log');
const stream = fs.createWriteStream(filePath, { flags: 'a'});



app.use(morgan ('combined',{ stream : stream}));
app.use(morgan('combined')); // output search shows on both log folder and console




app.listen(PORT, () =>{
    console.log(`server is running on ${PORT}`);

});

logger.info('App has started running');


// app.use (auth.basicAuth);


mongoose.connect(config.dbConStrPro,(err,result) =>{
 if (!err)     console.log('connected to db');
  else         console.log(err);
});


//public routes..meand anyone can acess and register..........
app.use('/',homeRouter);  //public router
app.use('/api/users', userRouter);  //public router

//Bearer
//middleware actaully makes routes private means secure
// app.use(auth.tokenAuth);


//private routes...........
app.use('/api/product', productRouter);
app.use('/api/reviews',reviewRouter);


//POST http://localhost:3000/api/product body{}