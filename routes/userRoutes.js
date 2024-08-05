// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db'); // Import the database connection

// Define a route to get all users
router.post('/company', (req, res) => {
    console.log(req.body)
    const company = req.body.company
    db.query(`SELECT * FROM tc_users WHERE company = '${company}'`, (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            res.status(500).send('Error querying the database.');
            return;
        }
        res.json(results);
    });
});
router.post('/image', (req, res) => {

    const image = req.body.imagePath
    const id = req.body.id
    console.log(image, id)
    if (!id || !image) {
        return res.status(400).send('Missing id or imagePath.');
    }
    const selectSql = `SELECT attributes FROM tc_users WHERE id = ${id}`;
    db.query(selectSql, (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            res.status(500).send('Error querying the database.');
            return;
        }

        // Check if the record exists
        if (results.length === 0) {
            console.log("error")
            return res.status(404).send('Record not found.');
        }

        // Retrieve the current image_path JSON object
        const currentAttributes = results[0].attributes;

        // Optionally, merge the new imagePath with the current imagePath
        // For this example, we'll just replace it, but you could merge or update specific fields
        const updatedAttributes = {
            ...currentAttributes, userImage: image
        };
        console.log(updatedAttributes)

        // Step 2: Update the image_path with the new JSON object
        const updateSql = `UPDATE tc_users SET attributes = ${JSON.stringify(updatedAttributes)} WHERE id = ${id}`;
        db.query(updateSql, (err, updateResults) => {
            if (err) {
                console.error('Error executing the update query:', err);
                res.status(500).send('Error updating the record.');
                return;
            }

            // Check if any rows were affected
            if (updateResults.affectedRows === 0) {
                res.status(404).send('Record not found.');
            } else {
                console.log("successfull")
                res.status(200).send('Record updated successfully.');
            }
        });
    });
    // db.query(`SELECT * FROM tc_users WHERE company = '${company}'`, (err, results) => {
    //     if (err) {
    //         console.error('Error querying the database:', err);
    //         res.status(500).send('Error querying the database.');
    //         return;
    //     }
    //     res.json(results);
    // });
});


// Export the router
module.exports = router;
