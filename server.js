const express = require('express');
const app = express()
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose')
const dotenv = require("dotenv")
const constant = require('./Api/constants/messages')
const bodyParser = require('body-parser');
let cors = require("cors");
const userRouter = require('./Api/routes/userAuth');
const profileUser = require('./Api/routes/profile');
const Blog = require('./Api/routes/blog');
const CareerOBJ = require('./Api/routes/careerObjective');
const degree = require('./Api/routes/degree')
const Experience = require('./Api/routes/experince')
const Portfolio = require('./Api/routes/portfilo')
const Skills = require('./Api/routes/skills')
const Service = require('./Api/routes/service')
dotenv.config()
const path = require('path');


///... Upload Folder for Multer 
app.use(express.static(path.join(__dirname + "/uploads")))


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

//cors 
app.use(cors());
app.use(cors({ origin: true, credentials: true }));


//Routes
app.use('/app/v1/health', (req, res) => {
    res.send('API OKAY!');
});
app.use('/app/v1/users', userRouter);
app.use('/app/v1/profileUsers', profileUser);
app.use('/app/v1/blog', Blog);
app.use('/app/v1/careerobjective', CareerOBJ);
app.use('/app/v1/degree', degree);
app.use('/app/v1/experience', Experience);
app.use('/app/v1/portfolio', Portfolio);
app.use('/app/v1/service', Service);
app.use('/app/v1/skills', Skills);
//......... connect MongoDB ......//

const URL = `mongodb+srv://hbk1007:ifO8AdIR4si0RjnH@hbkportfolio.fpcmyzx.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

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