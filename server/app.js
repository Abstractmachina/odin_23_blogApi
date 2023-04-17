//setup
const bodyParser = require("body-parser");
const express = require("express");
const passport = require("passport");



const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended: false}));

// app.use("/user", secureRoutes);
// app.use(passport.initialize());





//-----------	ROUTES	--------------------------
app.get('/', (req, res) => {
	res.send("nothing to see here");
})

app.get('/secureroute', async (req, res) => {
	res.send("secureroute");
})

app.get('/logout', async (req, res) => {
	res.send('logged out');
})

app.get('/login', async (req, res) => {
	res.render('login');
})

app.get('/signup', async (req, res) => {
	res.render('signup');
})

app.get('/failed', async (req, res) => {
	res.send("failed");
})

app.get('/success', async(req, res) => {
	res.send("success");
})




// -------------------	START SERVER	------------------
app.listen(3000, () => {
	console.log(">Server running. Listening on port 3000.");
})