const router = require('express').Router();
const { notes } = require('../../db/db');

router.get("/api/notes", (req, res) => {
    res.json({"test": "entry"});
});

// router.post("/api/notes", (req, res) => {
//     req.body;
// });

module.exports = router;