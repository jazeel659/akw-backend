const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const dbConnection=require('./config/dbConnection')
const dotenv = require("dotenv").config();
const cors=require("cors")
const fileUpload=require("express-fileupload")
const path = require("path");
const container = require('./container');
const userRoutes = container.resolve('userRoutes');

const app = express();
app.use(fileUpload())

const port = process.env.PORT || 7000;
const staticDir = path.join(__dirname, 'public');
app.use('/static', express.static(staticDir));
app.use(express.json())

app.use(cors())
dbConnection()

app.use('/api/v1/user',userRoutes)
app.use('/api/v1/image',require('./routes/imageUploadRoutes'))

app.use(errorHandler);

module.exports = app;
