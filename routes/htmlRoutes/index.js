// Using Express.js Router to manage the routes
// Also using path for access to the files no matter what server this is running on
const router = require('express').Router();
const path = require('path');

// This route will respond to HTTP GET requests to /notes with the notes.html file
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/notes.html'));
});

// This route will respond to all HTTP GET requests (not specified in other routes) with index.html
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

// And the necessary exportation of the router
module.exports = router;