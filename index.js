//registering downloaded ............

const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

//registering routes.................
const homeRouter = require('./routers/homeRouter');
const productRouter = require('./routers/productRouter');
const reviewRouter = require('./routers/reviewRouter');
const config = require('./config');
const logger = require('./utils/appLogger');

const app = express();

app.use(bodyparser.json());

// below code is written if log file is deleted
const dir = path.join(__dirname,'logs');
if (!fs.existsSync(dir)){

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


mongoose.connect(config.dbConStr,(err,result) =>{
 if (!err)     console.log('connected to db');
  else         console.log(err);
});


app.use('/',homeRouter);
app.use('/api/product', productRouter);
app.use('/api/reviews',reviewRouter);
