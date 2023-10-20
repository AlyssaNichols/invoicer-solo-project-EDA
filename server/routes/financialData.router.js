const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// GET ROUTE
router.get("/", (req, res) => {
  console.log("GET /api/finances");
  pool
    .query(
        `SELECT "date_issued", "date_paid", "total_price" FROM "invoice";`
    )
    .then((response) => {
      res.send(response.rows);
    })
    .catch((error) => {
      console.log("Error GET /api/archived", error);
      res.sendStatus(500);
    });
});


module.exports = router;
