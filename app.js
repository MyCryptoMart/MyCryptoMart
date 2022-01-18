// imports
const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const axios = require('axios');
const cors = require('cors');


const app = express();
app.set('view engine', 'ejs');
port = process.env.PORT || 5000;

// middlewares
app.use(express.static(__dirname + '/public'));
app.use(cors({origin: '*'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


app.get('/', function (req, res) {
    res.render("login");
});

app.get('/signup', function (req, res) {
    res.render("signup");
})

app.post('/Landingpage', function (req, res) {
    res.render("Landingpage");
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
