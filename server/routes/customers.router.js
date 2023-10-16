const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// GET ROUTE
router.get("/", (req, res) => {
  console.log("GET /api/customers");
  pool
    .query('SELECT * from "customers";')
    .then((response) => {
      res.send(response.rows);
    })
    .catch((error) => {
      console.log("Error GET /api/customers", error);
      res.sendStatus(500);
    });
});

// POST ROUTE
router.post('/', (req, res) => {
  router.post("/", (req, res) => {
      const customer = req.body;
      console.log(req.body);
      console.log(req.user);
      const queryText = `
      INSERT INTO customers ("first_name", "last_name", "address", "city", "state", "zip", "email", "phone")
      VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8 );`;
      pool
        .query(queryText, [customer.firstName, customer.lastName, customer.address, customer.city, customer.state, customer.zip, customer.email, customer.phone])
        .then((response) => {
          res.sendStatus(201);
        })
        .catch((err) => {
          console.log("error POSTing invoice", err);
          res.sendStatus(500);
        });
    });
});

module.exports = router;
