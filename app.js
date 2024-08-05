const express = require("express");
const morgan = require("morgan");
const fileupload = require("express-fileupload");
const routes = require("./routes/index");
// const errorHandler = require('errorhandler');
require("./database/index");
const dotenv = require('dotenv').config()


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(fileupload());
app.use(morgan('short'));

app.use(routes);


// Creation d'un middleware d'erreur
app.use((err, req, res, next) => {

    console.log(err);

    // Validators error handling
    if (err.errors) {
        const errors = err.errors
        const errorsArray = [];
        for (const [key, value] of Object.entries(errors)) {
            errorsArray.push(value.message);
        }
        return res.status(500).json({ error_messages: errorsArray });
    }

    // Duplicate document error handling
    if (err.errorResponse && err.errorResponse.code === 11000) {
        const keyName = Object.keys(err.errorResponse.keyValue);
        return res.status(500).json(`Duplication error : ${keyName}`);
    }

    // Single error handling
    const code = err.code || 500;
    return res.status(code).json({
        code: code,
        message: code === 500 ? "Unknow error" : err.message
    })

});


console.log(process.env.NODE_ENV, "/", "port :", port);
app.listen(port);

