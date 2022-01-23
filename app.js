// imports
const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const axios = require('axios');
const cors = require('cors');
const jwt = require('jsonwebtoken');
// const { requireAuth } = require('./authMddleware');

const app = express();
app.set('view engine', 'ejs');
port = process.env.PORT || 5000;

// middlewares
app.use(express.static(__dirname + '/public'));
app.use(cors({origin: '*'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const maxAge = 1 * 60 * 60;
const createToken = (usr) => {
    return jwt.sign({ usr }, "process.env.TOKEN_SECRET" , {
        expiresIn: maxAge
    });
};


app.get('/', function (req, res) {
    let loggedin = false;

    if(req.cookies.jwt){
        loggedin = true;
   }

    res.render("Landingpage", {auth : loggedin});
});

app.post('/', function (req, res) {
    res.render("Landingpage");
});

app.get('/signup', function (req, res) {
    if(!req.cookies.jwt){
        res.render("signup");
    }else{
        res.redirect('/')
    }
});

app.get('/login', function (req, res) {
    if(!req.cookies.jwt){
        res.render("login");
    }else{
        res.redirect('/')
    }    
});

app.post('/login', function (req, res) {

    try {
        const token = createToken({user: "data"});
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    } catch (err) {
        res.status(400);
    }
    res.status(200).redirect('/');

});

app.get('/logout', (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
})


app.get("/mynft", (req, res) => {
    axios.get(`https://api.opensea.io/api/v1/assets?owner=0x3c864B2c90BBEc9b0F74a190Ed3C1f1215b6d81C&order_direction=desc&offset=0&limit=20`)
        .then(function (response) {
        console.log(response.data);
        res.render("myNFTs", { data: response.data });
        }).catch(function (error) {
        console.log(error);
        });
});


app.listen(port, () => {
    console.log(`server running at ${port}`)
})
