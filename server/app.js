//setup
const bodyParser = require("body-parser");
const path = require("path");
const express = require("express");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const xhbs = require('express-handlebars');



const app = express();

//	---------------	VIEW ENGINE SETUP	--------------------
app.engine('handlebars', xhbs.engine({
	extname: 'hbs',
	defaultLayout: 'main',
	layoutsDir: path.join(__dirname, 'views/layouts'),
	partialsDir: path.join(__dirname, 'views/partials'),
}))
app.set('view engine', 'handlebars');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));

// app.use("/user", secureRoutes);
// app.use(passport.initialize());


// ---------	PASSPORT SETUP	----------------
passport.use(
	new LocalStrategy(async (username, password, done) => {

		let myErr = new Error("test error");
		// return done(myErr);

		// return done(null, false, {message: 'User not found'}); //authentication failed

		//sucessful authentication => second object is user
		return done(null, {username: 'bob', id:'123'}, {message: "Login successful"});
	})
)



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
app.post('/login', async (req, res, next) => {
	//second user obj is what is spit out from passport done() function
	passport.authenticate('local', async(error, user, info) => {

		if (error) {
			return next(error.message);
		}

		if (!user) {
			res.redirect(`/failed?message=${info.message}`);
		} else {
			res.redirect(`/success?message=${info.message}`);
		}
	}) (req, res, next)

})

app.get('/signup', async (req, res) => {
	res.render('signup');
})
app.post('/signup', async (req, res) => {
	res.send('signup form submitted');
})

app.get('/failed', async (req, res) => {
	res.send(`failed! ${req.query.message}`);
})

app.get('/success', async(req, res) => {
	res.send(`success! ${req.query.message}`);
})



// -------------------	START SERVER	------------------
app.listen(3000, () => {
	console.log(">Server running. Listening on port 3000.");
})