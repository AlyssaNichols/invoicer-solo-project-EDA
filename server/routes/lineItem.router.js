const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/:id", (req, res) => {
  const id = req.params.id;
  console.log("GET /api/lineItems");
  pool
    .query(`SELECT * from "line_item" WHERE "invoice_id" = $1;`, [id])
    .then((response) => {
      res.send(response.rows);
    })
    .catch((error) => {
      console.log("Error GET /api/lineItems", error);
      res.sendStatus(500);
    });
});

router.post("/:id", (req, res) => {
  console.log(req.body);
  const id = req.params.id;
  const queryText = `
  INSERT INTO line_item ("service_id", "date_performed", "service_price", "invoice_id")
  VALUES (
      $1,
      $2,
      $3,
      $4)`;
  pool
    .query(queryText, [req.body.service_id, req.body.date_performed, req.body.service_price, id])
    .then((response) => {
      console.log(response);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log("error POSTing lineItem", err);
      res.sendStatus(500);
    });
});

router.delete("/:id", (req, res) => {
  pool
    .query('DELETE FROM "line_item" WHERE id=$1', [req.params.id])
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("Error DELETE /api/lineItems", error);
      res.sendStatus(500);
    });
});

module.exports = router;
