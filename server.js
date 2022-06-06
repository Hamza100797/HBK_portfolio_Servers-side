const express = require('express');
const app = express()
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose')
const dotenv = require("dotenv")
const constant = require('./Api/constants/messages')
const bodyParser = require('body-parser');
let cors = require("cors");
const userRouter = require('./Api/routes/userAuth')
dotenv.config()

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//.....BodyParser Middleware....//

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// support parsing of application/json type post data
app.use(bodyParser.json());

//.....BodyParser Middleware....//


//Routes
app.use('/app/v1/health', (req, res) => {
    res.send('API OKAY!');
});
app.use('/app/v1/users', userRouter);


//......... connect MongoDB ......//
const URL = `mongodb://hbk1007:pwEyszvisMv3gybq@ac-tgs72yn-shard-00-00.fpcmyzx.mongodb.net:27017,ac-tgs72yn-shard-00-01.fpcmyzx.mongodb.net:27017,ac-tgs72yn-shard-00-02.fpcmyzx.mongodb.net:27017/test?replicaSet=atlas-hv65yf-shard-0&ssl=true&authSource=admin`;
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('MongoDB Connected…')
    })
    .catch((err) => {
        console.log(err)
        console.log(constant.DataBaseError)
    })
//......... connect MongoDB ......//


//......Error Handling Bad Request .....//
app.use((req, res, next) => {
    res.status(404).send({
        status: false,
        "message": constant.BAD_REQUEST
    })
})

app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`)
})