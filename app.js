const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Session setup with file store
app.use(session({
    store: new FileStore(),
    secret: 'my_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 } // 1 hour session
}));

// Set view engine to serve static HTML files
app.use(express.static('view'));

// Use authentication routes
app.use('/auth', authRoutes);

// Homepage route
app.get('/', (req, res) => {
    if (req.session.isAuthenticated) {
        res.send(`<h1>Welcome ${req.session.username}!</h1><a href="/auth/logout">Logout</a>`);
    } else {
        res.redirect('/login.html');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// npm init -y
// npm install express express-session session-file-store body-parser
