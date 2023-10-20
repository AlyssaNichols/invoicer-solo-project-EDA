const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// GET ROUTE
router.get("/", (req, res) => {
  console.log("USER:", req.user)
  console.log("GET /api/companies");
  pool
    .query(`SELECT * FROM "companies";`)
    .then((response) => {
      res.send(response.rows);
    })
    .catch((error) => {
      console.log("Error GET /api/archived", error);
      res.sendStatus(500);
    });
});

module.exports = router;
