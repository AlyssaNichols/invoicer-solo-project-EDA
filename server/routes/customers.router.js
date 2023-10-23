const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// GET ROUTE
router.get("/", (req, res) => {
  console.log("GET /api/customers");
  pool
    .query(
      'SELECT * from "customers" WHERE "isdeleted" = false ORDER BY last_name ASC;'
    )
    .then((response) => {
      res.send(response.rows);
    })
    .catch((error) => {
      console.log("Error GET /api/customers", error);
      res.sendStatus(500);
    });
});

// GET ROUTE - array of customer objects
// router.get("/", (req, res) => {
//   console.log("GET /api/customers");
//   pool
//     .query(`SELECT
//     id,
//     json_build_object(
//         'first_name', first_name,
//         'last_name', last_name,
//         'address', address,
//         'city', city,
//         'state', state,
//         'zip', zip,
//         'email', email,
//         'phone', phone
//     ) AS customer_data
// FROM customers;`)
//     .then((response) => {
//       res.send(response.rows);
//     })
//     .catch((error) => {
//       console.log("Error GET /api/customers", error);
//       res.sendStatus(500);
//     });
// });

// POST ROUTE
router.post("/", (req, res) => {
  const customer = req.body;
  console.log(req.body);
  console.log(req.user);
  const queryText = `
      INSERT INTO "customers" ("first_name", "last_name", "address", "city", "state", "zip", "email", "phone")
      VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8 );`;
  pool
    .query(queryText, [
      customer.firstName,
      customer.lastName,
      customer.address,
      customer.city,
      customer.state,
      customer.zip,
      customer.email,
      customer.phone,
    ])
    .then((response) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log("error POSTing invoice", err);
      res.sendStatus(500);
    });
});

// DELETE
router.delete("/:id", (req, res) => {
  pool
    .query(
      `UPDATE customers SET isdeleted = true WHERE id = $1;`,
      [req.params.id]
    )
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("Error DELETE /api/customers", error);
      res.sendStatus(500);
    });
});

router.put("/:id", (req, res) => {
  const queryText = `UPDATE "customers"
  SET "address" = $1,
      "city" = $2,
      "state" = $3,
      "zip" = $4,
      "phone" = $5,
      "email" = $6
  WHERE "id" = $7;`;
  pool
    .query(queryText, [
      req.body.address, req.body.city, req.body.state, 
      Number(req.body.zip), Number(req.body.phone),
      req.body.email, req.params.id
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
