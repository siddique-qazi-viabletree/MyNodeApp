const express = require('express');
const bodyParser = require('body-parser')
const sequelize = require('./util/database');
 

const app = express();

const userRoutes = require('./routes/user');

app.use(bodyParser.json());

app.use('/users', userRoutes);

sequelize
    .sync()
    .then(result => {
      //  console.log("in then",result);
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });
