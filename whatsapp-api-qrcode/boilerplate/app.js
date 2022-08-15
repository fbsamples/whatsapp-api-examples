/* Copyright (c) Meta Platforms, Inc. and affiliates.
* All rights reserved.
*
* This source code is licensed under the license found in the
* LICENSE file in the root directory of this source tree.
*/
const express = require("express");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');

require('dotenv').config();

//import routes 
const messageTemplateRoutes = require('./routes/qrCode');
//app
const app = express();


//middleware 
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

//routes middleware
app.use('/api',messageTemplateRoutes);
//routes

const port = 8000

app.listen(port,()=> {
    console.log(`Server is running on port ${port}`);
});

