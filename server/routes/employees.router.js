const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// GET ROUTE
router.get("/", (req, res) => {
  console.log("GET /api/employees");
  pool
    .query('SELECT * from "user" WHERE isdeleted = false ORDER BY "id" ASC;')
    .then((response) => {
      res.send(response.rows);
    })
    .catch((error) => {
      console.log("Error GET /api/user", error);
      res.sendStatus(500);
    });
});

// POST ROUTE
  router.post("/", (req, res) => {
      const employee = req.body;
      console.log(req.body);
      const queryText = `
      INSERT INTO "user" (username, is_admin, password)
    VALUES ($1, $2, $3);`;
      pool
        .query(queryText, [employee.username, employee.is_admin, employee.password])
        .then((response) => {
          res.sendStatus(201);
        })
        .catch((err) => {
          console.log("error POSTing invoice", err);
          res.sendStatus(500);
        });
    });

    router.delete("/:id", (req, res) => {
      pool
        .query(
          `UPDATE "user" SET isdeleted = true WHERE id = $1;`,
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
