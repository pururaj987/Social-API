const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require("./api/apiroutes");
const helmet = require("helmet");
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(helmet());

app.use('/api', apiRouter);


// catch 404 and forward to error handler
app.use(function (req, res) {
    res.status(404).json({
        message: "No such route exists"
    })
});

// error handler
app.use(function (err, req, res, next) {
    console.log(err);
    res.status(err.status || 500).json({
        message: "Something went wrong"
    });
});

app.listen(1048);
module.exports = app;