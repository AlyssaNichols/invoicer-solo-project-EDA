const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get("/", (req, res) => {
    console.log("GET /api/lineItem");
    pool
      .query('SELECT * from "line_item";')
      .then((response) => {
        res.send(response.rows);
      })
      .catch((error) => {
        console.log("Error GET /api/lineItem", error);
        res.sendStatus(500);
      });
  });

    router.post("/", (req, res) => {
        const lineItem = req.body;
        console.log(req.user);
        const queryText = `
        INSERT INTO "line_item" ("service_id", "date_performed", "service_price", "invoice_id")
        VALUES (
            $1, $2, $3, $4 );`;
        pool
          .query(queryText, [lineItem.service_id, lineItem.date_performed, lineItem.service_price, lineItem.invoice_id])
          .then((response) => {
            res.sendStatus(201);
          })
          .catch((err) => {
            console.log("error POSTing line_item", err);
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
            console.log("Error DELETE /api/line_item", error);
            res.sendStatus(500);
          });
      });

module.exports = router;