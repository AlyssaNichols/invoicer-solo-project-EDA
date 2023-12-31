const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/:id", (req, res) => {
  const id = req.params.id;
  console.log("GET /api/lineItems");
  console.log("id:", id);
  pool
    .query(`SELECT * from "line_item" WHERE "invoice_id" = $1 AND isDeleted = false;`, [id])
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
    .query(queryText, [
      req.body.service_id,
      req.body.date_performed,
      Number(req.body.service_price),
      id,
    ])
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
    .query(`DELETE FROM "line_item" WHERE "id" = $1;`, [req.params.id])
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("Error DELETE /api/lineItems", error);
      res.sendStatus(500);
    });
});

router.put("/:id", (req, res) => {
  const queryText = `UPDATE "line_item"
  SET "date_performed" = $1,
      "service_price" = $2
  WHERE "id" = $3;`;
  pool
    .query(queryText, [
      req.body.date_performed,
      Number(req.body.service_price),
      req.body.itemId,
    ])
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("error saving to database", err);
      res.sendStatus(500);
    });
});

module.exports = router;
