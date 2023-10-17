const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET
router.get("/", (req, res) => {
    console.log("GET /api/invoice");
    pool
      .query(`SELECT i.id AS id,
      json_agg(json_build_object('type', s.service, 'date', li.date_performed, 'price', li.service_price )) AS service_data,
      i.total_price,
      date_paid,
      i.customer_id,
      c.first_name,
      c.last_name,
      c.address,
      c.city,
      c.state,
      c.zip,
      c.email,
      c.phone
FROM invoice i
LEFT JOIN line_item li ON i.id = li.invoice_id
LEFT JOIN services AS s ON li.service_id = s.id
LEFT JOIN customers AS c ON i.customer_id = c.id
GROUP BY i.id, i.total_price, i.customer_id, c.first_name, c.last_name, c.address, c.city, c.state, c.zip, c.email, c.phone;`)
      .then((response) => {
        res.send(response.rows);
      })
      .catch((error) => {
        console.log("Error GET /api/invoice", error);
        res.sendStatus(500);
      });
  });

    // for invoice table to update date paid
    router.put("/", (req, res) => {
      const queryText = `UPDATE "invoice"
                                SET "date_paid" = $1 WHERE "id" = $2;`;
      pool
        .query(queryText, [req.body.date_paid, req.body.id])
        .then((response) => {
          res.sendStatus(200);
        })
        .catch((err) => {
          console.log("error saving to database", err);
          res.sendStatus(500);
        });
    });


router.delete("/", (req, res) => {
    pool
      .query('DELETE FROM "invoice" WHERE id=$1', [req.body])
      .then((response) => {
        res.sendStatus(200);
      })
      .catch((error) => {
        console.log("Error DELETE /api/customers", error);
        res.sendStatus(500);
      });
  });
  module.exports = router;