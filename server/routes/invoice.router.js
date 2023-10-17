const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

  
  //  post route to add an invoice
  router.post("/", (req, res) => {
    console.log(req.body);
    console.log(req.user);
    const queryText = `
    INSERT INTO invoice ("user_id", "date_issued", "customer_id")
    VALUES (
        $1,
        $2,
        $3);`;
    pool
      .query(queryText, [
        req.user.id,
        req.body.date_issued,
        req.body.customer_id,
      ])
      .then((response) => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log("error POSTing invoice", err);
        res.sendStatus(500);
      });
  });



// DELETE- LINE ITEMS MUST BE DELETED FIRST
// router.delete("/:id", (req, res) => {
//     pool
//       .query('DELETE FROM "invoice" WHERE id=$1', [req.params.id])
//       .then((response) => {
//         res.sendStatus(200);
//       })
//       .catch((error) => {
//         console.log("Error DELETE /api/customers", error);
//         res.sendStatus(500);
//       });
//   });

module.exports = router;