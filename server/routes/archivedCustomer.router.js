const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// GET ROUTE
router.get("/", (req, res) => {
  console.log("GET /api/archived");
  pool
    .query(
      'SELECT * from "customers" WHERE "isdeleted" = true ORDER BY last_name ASC;'
    )
    .then((response) => {
      res.send(response.rows);
    })
    .catch((error) => {
      console.log("Error GET /api/archived", error);
      res.sendStatus(500);
    });
});


// DELETE
router.delete("/:id", (req, res) => {
  pool
    .query(
      `UPDATE customers SET isdeleted = false WHERE id = $1;`,
      [req.params.id]
    )
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("Error DELETE /api/archived", error);
      res.sendStatus(500);
    });
});

module.exports = router;
