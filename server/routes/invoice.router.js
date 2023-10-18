const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get("/details/:id", (req, res) => {
    const queryText = `SELECT i.id AS id,
    json_agg(json_build_object('id', li.id, 'type', s.service, 'date', li.date_performed, 'price', li.service_price )) AS service_data,
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
WHERE i.id = $1
GROUP BY i.id, i.total_price, i.customer_id, c.first_name, c.last_name, c.address, c.city, c.state, c.zip, c.email, c.phone;`;
    pool
      .query(queryText, [req.params.id])
      .then((result) => {
        res.send(result.rows);
        console.log(result.rows);
      })
      .catch((err) => {
        console.log("Error GETTING invoice details param id query", err);
        res.sendStatus(500);
      });
  });


  //  post route to add an invoice
  router.post("/", (req, res) => {
    console.log(req.body);
    const invoiceId = req.params.id;
    const queryText = `
    INSERT INTO invoice ("user_id", "date_issued", "customer_id")
    VALUES (
        $1,
        $2,
        $3) RETURNING "id";`;
    pool
      .query(queryText, [
        req.user.id,
        req.body.date_issued,
        req.body.customer_id,
      ])
      .then((response) => {
        console.log(response)
        // const generatedId = response.rows[0].id;
        res.send({invoiceId: response.rows[0].id}).status(201);
      })
      .catch((err) => {
        console.log("error POSTing invoice", err);
        res.sendStatus(500);
      });
  });



module.exports = router;