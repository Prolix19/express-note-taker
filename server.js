// App uses Express.js backend, as required
const express = require('express');

// Variable port to support Heroku port 80
const PORT = process.env.PORT || 3001;
// Access Express and my route scripts
const app = express();
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// Initialize the server
app.listen(PORT, () => {
    console.log(`Note Taker server now running on port ${PORT}!`);
});