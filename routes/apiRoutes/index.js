// Pulling in requirements: Express.js Router, the notes database...
const router = require('express').Router();
let notes = require('../../db/db');
// ...Node UUID package for generating unique DB IDs, as required. Also Node FS module
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

// Responds to HTTP GET requests to /api/notes with the DB of existing notes
router.get("/notes", (req, res) => {
    res.json(notes);
});

// Handles HTTP POST requests to /api/notes
router.post("/notes", (req, res) => {
    // Store the three parameters that every note needs into a new note object
    let newNote = {};
    newNote.title = req.body.title;
    newNote.text = req.body.text;
    newNote.id = uuidv4();

    // Append the new note object to the notes array
    notes.push(newNote);

    // Write the stringified version of the notes array out to our DB file
    fs.writeFileSync(
        path.join(__dirname, "../../db/db.json"),
        JSON.stringify(notes, null, 2)
    );
    
    // Finally, respond with the updated notes
    res.json(notes);
});

// Handles HTTP DELETE requests to /api/notes/[some identifier]
router.delete("/notes/:id", (req, res) => {
    // If the ID parameter received does not match a note, keep it
    tempArray = [];
    for(let i = 0; i < notes.length; i++) {
        if(req.params.id != notes[i].id) {
            tempArray.push(notes[i]);
        }
    };

    // Now overwrite our notes array with the new array, effectively deleting the entry that matched the ID parameter
    notes = tempArray;

    // Delete that note in the DB by overwriting its contents with the new list of notes
    fs.writeFileSync(
        path.join(__dirname, "../../db/db.json"),
        JSON.stringify(notes, null, 2)
    );

    // And send a copy of the updated notes list to the client
    res.json(notes);
});

// And the necessary exportation of the router
module.exports = router;