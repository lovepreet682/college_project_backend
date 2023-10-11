const express = require("express");
const connection = require("../DB/DBConnection");
const router = express.Router();
router.use(express.json());
const cors = require("cors");

router.use(
  cors({
    origin: "http://192.168.29.249:3000",
  })
);

//Search API Query
// Search API Query
router.get("/search", (req, res) => {
  const { name, city, course, rollno } = req.query;
  // Create a dynamic query
  let SearchQuery = "SELECT * FROM college WHERE 1=1";
  let queryParams = [];

  if (name) {
    SearchQuery += " AND name LIKE ?";
    queryParams.push(`%${name}%`);
  }
  if (course) {
    SearchQuery += " AND course LIKE ?";
    queryParams.push(`%${course}%`)
  }
  if (rollno) {
    SearchQuery += " AND rollno LIKE ?";
    queryParams.push(`%${rollno}%`)
  }
  if (city) {
    SearchQuery += " AND city LIKE ?";
    queryParams.push(`%${city}%`);
  }

  connection.query(SearchQuery, queryParams, (err, results) => {
    if (err) {
      console.log('Error querying the database', err);
      res.status(500).send('Error querying the database');
    } else {
      res.json(results);
    }
  });
});



//post request
router.post("/add", (req, res) => {
  const newData = req.body;
  const insertValue = "INSERT INTO college SET ?";

  newData.date = new Date().toISOString().slice(0, 10);
  connection.query(insertValue, [newData], (errorInsert, resultInsert) => {
    if (errorInsert) {
      console.log("Error inserting data:", errorInsert);
      res.status(500).json({ error: "Error inserting data" });
    } else {
      // Send an HTTP response
      res.json({ message: "Data successfully inserted" });
    }
  });
});

//retrieve the data
router.get("/data", (req, res) => {
  connection.query("SELECT * FROM college  ", (err, results) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Error retrieving data from database" });
    }
    res.json(results);
  });
});

module.exports = router;
