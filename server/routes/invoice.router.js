const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get("/details/:id", (req, res) => {
    const queryText = `SELECT * FROM "invoices" WHERE id=$1`;
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
  router.post("/details/:id", (req, res) => {
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